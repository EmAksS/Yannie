import { useState } from "react";
import { AuthButton } from "../../controls/buttons/AuthButton";
import AuthInput from "../../controls/inputs/authInput/AuthInput";
import EmailIcon from "../../illustrations/icons/EmailIcon";
import PasswordIcon from "../../illustrations/icons/PasswordIcon";
import { useAuth } from "../../../../scripts/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../../../scripts/helpers/validation";
import TooltipWarning from "../../ui/overlay/tooltip/warning";

export const LoginForm = () => {

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state)?.from?.pathname || "/";

    const isFormValid = isValidEmail(email) && isValidPassword(password);

    const handleLogin = async () => {
        if (isFormValid){
            const res = await login("example");

            if (res.success){
                navigate(from, { replace: true });
            }
            else {
                console.log("Ошибка входа в систему!");
            }
        } else {
            console.log("Не валидная форма!");
        }
        
    }

    return (
        <div className="form__container">
            <div className="form__inputs">
                <AuthInput 
                Icon={<EmailIcon />} 
                value={email} 
                setValue={setEmail} 
                type="email"
                placeholder="Email"
                isError={email !== "" && !isValidEmail(email)}
                Tooltip={TooltipWarning.EmailWarning}
                />
                <AuthInput 
                Icon={<PasswordIcon />} 
                value={password} 
                setValue={setPassword} 
                type="password"
                placeholder="Пароль"
                isError={password !== "" && !isValidPassword(password)}
                Tooltip={TooltipWarning.PasswordWarning}
                />
            </div>
            <AuthButton text="Войти" onClick={handleLogin} />
        </div>
);}