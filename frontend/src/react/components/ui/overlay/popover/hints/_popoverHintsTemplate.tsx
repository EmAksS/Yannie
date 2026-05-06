import { ReactNode } from "react";
import Popover from "../Popover";
import "./_popoverHintsTemplate.scss";

interface PopoverHintProps {
    children: string;
    title: string;
    text: ReactNode;
}

interface LabelHintProps {
    title: string;
    text: ReactNode; 
}

const LabelTemplate: React.FC<LabelHintProps> = ({title, text}) => {
    return (
        <>
            <p className="popover--hint__title">
                {title}
            </p>
            <div className="popover--hint__text">
                {text}
            </div>
        </>
        
    )
}

export const HintsTemplate: React.FC<PopoverHintProps> = ({children, title, text}) => {

    return (
        <Popover label={<LabelTemplate title={title} text={text} />}>
            {children}
        </Popover>
    )
}

export default HintsTemplate;