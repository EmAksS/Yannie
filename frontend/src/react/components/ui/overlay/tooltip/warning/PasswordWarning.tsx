import WarningTemplate from "./_tooltipWarningTemplate"

const PasswordLabel = () => {
    return (
        <p className="tooltip--warning__text">
            слишком короткий пароль <br />
            (не менее 6 символов)
        </p>
    )
}

export const PasswordWarning = ({ children }) => {
    return (
        <WarningTemplate label={<PasswordLabel />}>
            { children }
        </ WarningTemplate>
    )
}