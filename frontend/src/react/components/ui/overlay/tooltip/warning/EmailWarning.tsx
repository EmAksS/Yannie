import WarningTemplate from "./_tooltipWarningTemplate"

const EmailLabel = () => {
    return (
        <p className="tooltip--warning__text">
            не правильный формат введенной почты
        </p>
    )
}

export const EmailWarning = ({ children }) => {
    return (
        <WarningTemplate label={<EmailLabel />}>
            { children }
        </ WarningTemplate>
    )
}