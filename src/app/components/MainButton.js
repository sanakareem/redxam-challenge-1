import { Button } from "@nextui-org/react"

const MainButton = ({ type, content, className, wrapperClassName = null, onClick = null }) => {
    return type == "gradient" ? (
        <Button
            variant="solid"
            radius="full"
            className={`h-[54px] p-[2px] bg-gradient-to-b from-[#25e94d] to-[#54e2b1] button-glow group ${className}`}
            onClick={onClick}
        >
            <div className={`flex w-full h-full bg-[#111111] text-white rounded-full items-center justify-center font-intern text-sm font-medium button-inner-shadow group-hover:bg-transparent group-hover:text-[#090909] transition-colors ${wrapperClassName}`}>
                {content}
            </div>
        </Button>
    ) : (
        <Button
            variant="bordered"
            radius="full"
            className={`flex items-center justify-center h-[52px] border-[#222222] bg-[#111111] text-white button-inner-shadow ${className}`}
            onClick={onClick}
        >
            {content}
        </Button>
    )
}

export default MainButton
