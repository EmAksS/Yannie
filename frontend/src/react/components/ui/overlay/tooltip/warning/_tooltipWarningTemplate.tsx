import Tooltip from "../Tooltip";
import "./_tooltipWarningTemplate.scss"

export const WarningTemplate = ({children, label}) => {

    return (
        <Tooltip label={ label } className={"tooltip--warning"}>
            {children}
        </Tooltip>
    )
}

export default WarningTemplate;