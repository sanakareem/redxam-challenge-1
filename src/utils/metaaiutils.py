import time
import uuid
import json
import random
import urllib
import logging
import logging
import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession
from typing import Dict, List, Generator, Iterator


MAX_RETRIES = 3


class FacebookInvalidCredentialsException(Exception):
    pass


class FacebookRegionBlocked(Exception):
    pass


__version__ = "1.2.1"


def generate_offline_threading_id() -> str:
    """
    Generates an offline threading ID.

    Returns:
        str: The generated offline threading ID.
    """
    # Maximum value for a 64-bit integer in Python
    max_int = (1 << 64) - 1
    mask22_bits = (1 << 22) - 1

    # Function to get the current timestamp in milliseconds
    def get_current_timestamp():
        return int(time.time() * 1000)

    # Function to generate a random 64-bit integer
    def get_random_64bit_int():
        return random.getrandbits(64)

    # Combine timestamp and random value
    def combine_and_mask(timestamp, random_value):
        shifted_timestamp = timestamp << 22
        masked_random = random_value & mask22_bits
        return (shifted_timestamp | masked_random) & max_int

    timestamp = get_current_timestamp()
    random_value = get_random_64bit_int()
    threading_id = combine_and_mask(timestamp, random_value)

    return str(threading_id)


def extract_value(text: str, start_str: str, end_str: str) -> str:
    """
    Helper function to extract a specific value from the given text using a key.

    Args:
        text (str): The text from which to extract the value.
        start_str (str): The starting key.
        end_str (str): The ending key.

    Returns:
        str: The extracted value.
    """
    start = text.find(start_str) + len(start_str)
    end = text.find(end_str, start)
    return text[start:end]


def format_response(response: dict) -> str:
    """
    Formats the response from Meta AI to remove unnecessary characters.

    Args:
        response (dict): The dictionnary containing the response to format.

    Returns:
        str: The formatted response.
    """
    text = ""
    for content in (
        response.get("data", {})
        .get("node", {})
        .get("bot_response_message", {})
        .get("composed_text", {})
        .get("content", [])
    ):
        text += content["text"] + "\n"
    return text


# Function to perform the login
def get_fb_session(email, password, proxies=None):
    login_url = "https://mbasic.facebook.com/login/"
    headers = {
        "authority": "mbasic.facebook.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }
    # Send the GET request
    response = requests.get(login_url, headers=headers, proxies=proxies)
    soup = BeautifulSoup(response.text, "html.parser")

    # Parse necessary parameters from the login form
    lsd = soup.find("input", {"name": "lsd"})["value"]
    jazoest = soup.find("input", {"name": "jazoest"})["value"]
    li = soup.find("input", {"name": "li"})["value"]
    m_ts = soup.find("input", {"name": "m_ts"})["value"]

    # Define the URL and body for the POST request to submit the login form
    post_url = "https://mbasic.facebook.com/login/device-based/regular/login/?refsrc=deprecated&lwv=100"
    data = {
        "lsd": lsd,
        "jazoest": jazoest,
        "m_ts": m_ts,
        "li": li,
        "try_number": "0",
        "unrecognized_tries": "0",
        "email": email,
        "pass": password,
        "login": "Log In",
        "bi_xrwh": "0",
    }

    headers = {
        "authority": "mbasic.facebook.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "cookie": f"datr={response.cookies.get('datr')}; sb={response.cookies.get('sb')}; ps_n=1; ps_l=1",
        "dpr": "2",
        "origin": "https://mbasic.facebook.com",
        "pragma": "no-cache",
        "referer": "https://mbasic.facebook.com/login/",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "viewport-width": "1728",
    }

    # Send the POST request
    session = requests.session()
    session.proxies = proxies

    result = session.post(post_url, headers=headers, data=data)
    if "sb" not in session.cookies:
        raise FacebookInvalidCredentialsException(
            "Was not able to login to Facebook. Please check your credentials. "
            "You may also have been rate limited. Try to connect to Facebook manually."
        )

    cookies = {
        **result.cookies.get_dict(),
        "sb": session.cookies["sb"],
        "xs": session.cookies["xs"],
        "fr": session.cookies["fr"],
        "c_user": session.cookies["c_user"],
    }

    response_login = {
        "cookies": cookies,
        "headers": result.headers,
        "response": response.text,
    }
    meta_ai_cookies = get_cookies()

    url = "https://www.meta.ai/state/"

    payload = f'__a=1&lsd={meta_ai_cookies["lsd"]}'
    headers = {
        "authority": "www.meta.ai",
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "cookie": f'ps_n=1; ps_l=1; dpr=2; _js_datr={meta_ai_cookies["_js_datr"]}; abra_csrf={meta_ai_cookies["abra_csrf"]}; datr={meta_ai_cookies["datr"]};; ps_l=1; ps_n=1',
        "origin": "https://www.meta.ai",
        "pragma": "no-cache",
        "referer": "https://www.meta.ai/",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }

    response = requests.request(
        "POST", url, headers=headers, data=payload, proxies=proxies
    )

    state = extract_value(response.text, start_str='"state":"', end_str='"')

    url = f"https://www.facebook.com/oidc/?app_id=1358015658191005&scope=openid%20linking&response_type=code&redirect_uri=https%3A%2F%2Fwww.meta.ai%2Fauth%2F&no_universal_links=1&deoia=1&state={state}"
    payload = {}
    headers = {
        "authority": "www.facebook.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "cookie": f"datr={response_login['cookies']['datr']}; sb={response_login['cookies']['sb']}; c_user={response_login['cookies']['c_user']}; xs={response_login['cookies']['xs']}; fr={response_login['cookies']['fr']}; m_page_voice={response_login['cookies']['m_page_voice']}; abra_csrf={meta_ai_cookies['abra_csrf']};",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "cross-site",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }
    session = requests.session()
    session.proxies = proxies
    response = session.get(url, headers=headers, data=payload, allow_redirects=False)

    next_url = response.headers["Location"]

    url = next_url

    payload = {}
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://www.meta.ai/",
        "Connection": "keep-alive",
        "Cookie": f'dpr=2; abra_csrf={meta_ai_cookies["abra_csrf"]}; datr={meta_ai_cookies["_js_datr"]}',
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "TE": "trailers",
    }
    session.get(url, headers=headers, data=payload)
    cookies = session.cookies.get_dict()
    if "abra_sess" not in cookies:
        raise FacebookInvalidCredentialsException(
            "Was not able to login to Facebook. Please check your credentials. "
            "You may also have been rate limited. Try to connect to Facebook manually."
        )
    logging.info("Successfully logged in to Facebook.")
    return cookies


def get_cookies() -> dict:
    """
    Extracts necessary cookies from the Meta AI main page.

    Returns:
        dict: A dictionary containing essential cookies.
    """
    session = HTMLSession()
    response = session.get("https://www.meta.ai/")
    return {
        "_js_datr": extract_value(
            response.text, start_str='_js_datr":{"value":"', end_str='",'
        ),
        "abra_csrf": extract_value(
            response.text, start_str='abra_csrf":{"value":"', end_str='",'
        ),
        "datr": extract_value(
            response.text, start_str='datr":{"value":"', end_str='",'
        ),
        "lsd": extract_value(
            response.text, start_str='"LSD",[],{"token":"', end_str='"}'
        ),
    }


class MetaAI:
    """
    A class to interact with the Meta AI API to obtain and use access tokens for sending
    and receiving messages from the Meta AI Chat API.
    """

    def __init__(
        self, fb_email: str = None, fb_password: str = None, proxy: dict = None
    ):
        self.session = requests.Session()
        self.session.headers.update(
            {
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            }
        )
        self.access_token = None
        self.fb_email = fb_email
        self.fb_password = fb_password
        self.proxy = proxy
        if self.proxy and not self.check_proxy():
            raise ConnectionError(
                "Unable to connect to proxy. Please check your proxy settings."
            )

        self.is_authed = fb_password is not None and fb_email is not None
        self.cookies = self.get_cookies()
        self.external_conversation_id = None
        self.offline_threading_id = None

    def check_proxy(self, test_url: str = "https://api.ipify.org/?format=json") -> bool:
        """
        Checks the proxy connection by making a request to a test URL.

        Args:
            test_url (str): A test site from which we check that the proxy is installed correctly.

        Returns:
            bool: True if the proxy is working, False otherwise.
        """
        try:
            response = self.session.get(test_url, proxies=self.proxy, timeout=10)
            if response.status_code == 200:
                self.session.proxies = self.proxy
                return True
            return False
        except requests.RequestException:
            return False

    def get_access_token(self) -> str:
        """
        Retrieves an access token using Meta's authentication API.

        Returns:
            str: A valid access token.
        """

        if self.access_token:
            return self.access_token

        url = "https://www.meta.ai/api/graphql/"
        payload = {
            "lsd": self.cookies["lsd"],
            "fb_api_caller_class": "RelayModern",
            "fb_api_req_friendly_name": "useAbraAcceptTOSForTempUserMutation",
            "variables": {
                "dob": "1999-01-01",
                "icebreaker_type": "TEXT",
                "__relay_internal__pv__WebPixelRatiorelayprovider": 1,
            },
            "doc_id": "7604648749596940",
        }
        payload = urllib.parse.urlencode(payload)  # noqa
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": f'_js_datr={self.cookies["_js_datr"]}; '
            f'abra_csrf={self.cookies["abra_csrf"]}; datr={self.cookies["datr"]};',
            "sec-fetch-site": "same-origin",
            "x-fb-friendly-name": "useAbraAcceptTOSForTempUserMutation",
        }

        response = self.session.post(url, headers=headers, data=payload)

        try:
            auth_json = response.json()
        except json.JSONDecodeError:
            raise FacebookRegionBlocked(
                "Unable to receive a valid response from Meta AI. This is likely due to your region being blocked. "
                "Try manually accessing https://www.meta.ai/ to confirm."
            )

        access_token = auth_json["data"]["xab_abra_accept_terms_of_service"][
            "new_temp_user_auth"
        ]["access_token"]

        # Need to sleep for a bit, for some reason the API doesn't like it when we send request too quickly
        # (maybe Meta needs to register Cookies on their side?)
        time.sleep(1)

        return access_token

    def prompt(
        self,
        message: str,
        stream: bool = False,
        attempts: int = 0,
        new_conversation: bool = False,
    ) -> Dict or Generator[Dict, None, None]:
        """
        Sends a message to the Meta AI and returns the response.

        Args:
            message (str): The message to send.
            stream (bool): Whether to stream the response or not. Defaults to False.
            attempts (int): The number of attempts to retry if an error occurs. Defaults to 0.
            new_conversation (bool): Whether to start a new conversation or not. Defaults to False.

        Returns:
            dict: A dictionary containing the response message and sources.

        Raises:
            Exception: If unable to obtain a valid response after several attempts.
        """
        if not self.is_authed:
            self.access_token = self.get_access_token()
            auth_payload = {"access_token": self.access_token}
            url = "https://graph.meta.ai/graphql?locale=user"

        else:
            auth_payload = {"fb_dtsg": self.cookies["fb_dtsg"]}
            url = "https://www.meta.ai/api/graphql/"

        if not self.external_conversation_id or new_conversation:
            external_id = str(uuid.uuid4())
            self.external_conversation_id = external_id
        payload = {
            **auth_payload,
            "fb_api_caller_class": "RelayModern",
            "fb_api_req_friendly_name": "useAbraSendMessageMutation",
            "variables": json.dumps(
                {
                    "message": {"sensitive_string_value": message},
                    "externalConversationId": self.external_conversation_id,
                    "offlineThreadingId": generate_offline_threading_id(),
                    "suggestedPromptIndex": None,
                    "flashVideoRecapInput": {"images": []},
                    "flashPreviewInput": None,
                    "promptPrefix": None,
                    "entrypoint": "ABRA__CHAT__TEXT",
                    "icebreaker_type": "TEXT",
                    "__relay_internal__pv__AbraDebugDevOnlyrelayprovider": False,
                    "__relay_internal__pv__WebPixelRatiorelayprovider": 1,
                }
            ),
            "server_timestamps": "true",
            "doc_id": "7783822248314888",
        }
        payload = urllib.parse.urlencode(payload)  # noqa
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "x-fb-friendly-name": "useAbraSendMessageMutation",
        }
        if self.is_authed:
            headers["cookie"] = f'abra_sess={self.cookies["abra_sess"]}'
            # Recreate the session to avoid cookie leakage when user is authenticated
            self.session = requests.Session()
            self.session.proxies = self.proxy

        response = self.session.post(url, headers=headers, data=payload, stream=stream)
        if not stream:
            raw_response = response.text

            last_streamed_response = self.extract_last_response(raw_response)
            if not last_streamed_response:
                return self.retry(message, stream=stream, attempts=attempts)

            extracted_data = self.extract_data(last_streamed_response)
            return extracted_data

        else:
            lines = response.iter_lines()
            is_error = json.loads(next(lines))
            if len(is_error.get("errors", [])) > 0:
                return self.retry(message, stream=stream, attempts=attempts)
            return self.stream_response(lines)

    def retry(self, message: str, stream: bool = False, attempts: int = 0):
        """
        Retries the prompt function if an error occurs.
        """
        if attempts <= MAX_RETRIES:
            logging.warning(
                f"Was unable to obtain a valid response from Meta AI. Retrying... Attempt {attempts + 1}/{MAX_RETRIES}."
            )
            time.sleep(3)
            return self.prompt(message, stream=stream, attempts=attempts + 1)
        else:
            raise Exception(
                "Unable to obtain a valid response from Meta AI. Try again later."
            )

    def extract_last_response(self, response: str) -> Dict:
        """
        Extracts the last response from the Meta AI API.

        Args:
            response (str): The response to extract the last response from.

        Returns:
            dict: A dictionary containing the last response.
        """
        last_streamed_response = None
        response_lines = response.split("\n")
        for i, line in enumerate(response_lines):
            try:
                json_line = json.loads(line)
            except json.JSONDecodeError:
                continue

            bot_response_message = (
                json_line.get("data", {})
                .get("node", {})
                .get("bot_response_message", {})
            )
            if i == len(response_lines) - 1:
                reels = bot_response_message.get("reels", {}).get("reels", [])
                reel_list = [
                    {"url": reel.get("url"), "title": reel.get("title")}
                    for reel in reels
                ]

            chat_id = bot_response_message.get("id")
            if chat_id:
                external_conversation_id, offline_threading_id, _ = chat_id.split("_")
                self.external_conversation_id = external_conversation_id
                self.offline_threading_id = offline_threading_id

            streaming_state = bot_response_message.get("streaming_state")
            if streaming_state == "OVERALL_DONE":
                json_line["reel_list"] = reel_list
                last_streamed_response = json_line

        return last_streamed_response

    def stream_response(self, lines: Iterator[str]):
        """
        Streams the response from the Meta AI API.

        Args:
            lines (Iterator[str]): The lines to stream.

        Yields:
            dict: A dictionary containing the response message and sources.
        """
        for line in lines:
            if line:
                json_line = json.loads(line)
                extracted_data = self.extract_data(json_line)
                if not extracted_data.get("message"):
                    continue
                yield extracted_data

    def extract_data(self, json_line: dict):
        """
        Extract data and sources from a parsed JSON line.

        Args:
            json_line (dict): Parsed JSON line.

        Returns:
            Tuple (str, list): Response message and list of sources.
        """
        bot_response_message = (
            json_line.get("data", {}).get("node", {}).get("bot_response_message", {})
        )
        response = format_response(response=json_line)
        fetch_id = bot_response_message.get("fetch_id")
        sources = self.fetch_sources(fetch_id) if fetch_id else []
        medias = self.extract_media(bot_response_message)
        reels = json_line.get("reel_list", {})
        return {
            "message": response,
            "sources": sources,
            "media": medias,
            "reels": reels,
        }

    def extract_media(self, json_line: dict) -> List[Dict]:
        """
        Extract media from a parsed JSON line.

        Args:
            json_line (dict): Parsed JSON line.

        Returns:
            list: A list of dictionaries containing the extracted media.
        """
        medias = []
        imagine_card = json_line.get("imagine_card", {})
        session = imagine_card.get("session", {}) if imagine_card else {}
        media_sets = (
            (json_line.get("imagine_card", {}).get("session", {}).get("media_sets", []))
            if imagine_card and session
            else []
        )
        for media_set in media_sets:
            imagine_media = media_set.get("imagine_media", [])
            for media in imagine_media:
                medias.append(
                    {
                        "url": media.get("uri"),
                        "type": media.get("media_type"),
                        "prompt": media.get("prompt"),
                    }
                )
        return medias

    def get_cookies(self) -> dict:
        """
        Extracts necessary cookies from the Meta AI main page.

        Returns:
            dict: A dictionary containing essential cookies.
        """
        session = HTMLSession()
        headers = {}
        if self.fb_email is not None and self.fb_password is not None:
            fb_session = get_fb_session(self.fb_email, self.fb_password)
            headers = {"cookie": f"abra_sess={fb_session['abra_sess']}"}
        response = session.get(
            "https://www.meta.ai/",
            headers=headers,
        )
        cookies = {
            "_js_datr": extract_value(
                response.text, start_str='_js_datr":{"value":"', end_str='",'
            ),
            "datr": extract_value(
                response.text, start_str='datr":{"value":"', end_str='",'
            ),
            "lsd": extract_value(
                response.text, start_str='"LSD",[],{"token":"', end_str='"}'
            ),
            "fb_dtsg": extract_value(
                response.text, start_str='DTSGInitData",[],{"token":"', end_str='"'
            ),
        }

        if len(headers) > 0:
            cookies["abra_sess"] = fb_session["abra_sess"]
        else:
            cookies["abra_csrf"] = extract_value(
                response.text, start_str='abra_csrf":{"value":"', end_str='",'
            )
        return cookies

    def fetch_sources(self, fetch_id: str) -> List[Dict]:
        """
        Fetches sources from the Meta AI API based on the given query.

        Args:
            fetch_id (str): The fetch ID to use for the query.

        Returns:
            list: A list of dictionaries containing the fetched sources.
        """

        url = "https://graph.meta.ai/graphql?locale=user"
        payload = {
            "access_token": self.access_token,
            "fb_api_caller_class": "RelayModern",
            "fb_api_req_friendly_name": "AbraSearchPluginDialogQuery",
            "variables": json.dumps({"abraMessageFetchID": fetch_id}),
            "server_timestamps": "true",
            "doc_id": "6946734308765963",
        }

        payload = urllib.parse.urlencode(payload)  # noqa

        headers = {
            "authority": "graph.meta.ai",
            "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "cookie": f'dpr=2; abra_csrf={self.cookies.get("abra_csrf")}; datr={self.cookies.get("datr")}; ps_n=1; ps_l=1',
            "x-fb-friendly-name": "AbraSearchPluginDialogQuery",
        }

        response = self.session.post(url, headers=headers, data=payload)
        response_json = response.json()
        message = response_json.get("data", {}).get("message", {})
        search_results = (
            (response_json.get("data", {}).get("message", {}).get("searchResults"))
            if message
            else None
        )
        if search_results is None:
            return []

        references = search_results["references"]
        return references


# if __name__ == "__main__":
#     meta = MetaAI()
#     resp = meta.prompt("Show me reels of ferraris", stream=False)
