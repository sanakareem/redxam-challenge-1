import { Button } from "@nextui-org/react";
import PropTypes from 'prop-types';

const MainButton = ({
    type,
    content,
    className = '',
    wrapperClassName = '',
    onClick = null,
    disabled = false 
}) => {
    const gradientClasses = "h-[54px] p-[2px] bg-gradient-to-b from-[#25e94d] to-[#54e2b1] button-glow group";
    const borderedClasses = "flex items-center justify-center h-[52px] border-[#222222] bg-[#111111] text-white button-inner-shadow";

    return type === "gradient" ? (
        <Button
            variant="solid"
            radius="full"
            className={`${gradientClasses} ${className}`}
            onClick={onClick}
            disabled={disabled} 
        >
            <div
                className={`flex w-full h-full bg-[#111111] text-white rounded-full items-center justify-center font-intern text-sm font-medium button-inner-shadow group-hover:bg-transparent group-hover:text-[#090909] transition-colors ${wrapperClassName}`}
            >
                {content}
            </div>
        </Button>
    ) : (
        <Button
            variant="bordered"
            radius="full"
            className={`${borderedClasses} ${className}`}
            onClick={onClick}
            disabled={disabled} 
        >
            {content}
        </Button>
    );
};

MainButton.propTypes = {
    type: PropTypes.oneOf(['gradient', 'bordered']).isRequired,
    content: PropTypes.node.isRequired,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool 
};

export default MainButton;
