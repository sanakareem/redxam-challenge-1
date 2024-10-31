import Image from "next/image"

const Header = () => {
    return (
        <div className="w-full pt-[40px]">
            <Image src="/svg/logo.svg" alt="logo" width={116} height={35}></Image>
        </div>
    )
}

export default Header
