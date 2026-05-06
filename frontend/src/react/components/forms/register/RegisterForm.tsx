import { useState } from "react";
import { AuthButton } from "../../controls/buttons/AuthButton";
import AuthInput from "../../controls/inputs/authInput/AuthInput";
import EmailIcon from "../../illustrations/icons/EmailIcon";
import PasswordIcon from "../../illustrations/icons/PasswordIcon";
import { UserIcon } from "../../illustrations/icons/UserIcon";
import { useAuth } from "../../../../scripts/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../../../scripts/helpers/validation";
import TooltipWarning from "../../ui/overlay/tooltip/warning";

export const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state)?.from?.pathname || "/";

    const isFormValid = isValidEmail(email) && isValidPassword(password);

    const handleRegister = async () => {

        if (isFormValid){

            const data = {
                username: name,
                email: email,
                password: password,
            };

            const res = await register(data);

            if (res.success){
                navigate(from, { replace: true });
            }
            else{
                console.log("Ошибка авторизации");
            }
        }
        
    }

    return (
        <div className="form__container">
            <div className="form__inputs">
                <AuthInput 
                Icon={<UserIcon />} 
                value={name} 
                setValue={setName} 
                type="text"
                placeholder="Имя пользователя"
                />
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
            <AuthButton text="Авторизоваться" onClick={handleRegister} />
        </div>
);}