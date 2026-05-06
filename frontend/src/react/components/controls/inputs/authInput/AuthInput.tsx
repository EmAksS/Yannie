import { useState } from "react";
import "./AuthInput.scss";
import { EyeIcon } from "../../../illustrations/icons/EyeIcon";
import { AlertIcon } from "../../../illustrations/icons/AlertIcon";

type AuthInputProps = {
    Icon?: React.ReactNode;
    value: string;
    setValue: (value: string) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    isError?: boolean;
    Tooltip?: React.ComponentType<{ children: React.ReactNode }>;
};

export const AuthInput: React.FC<AuthInputProps> = ( { Icon, value, setValue, type, placeholder, isError = false, Tooltip } ) => {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const changePassword = () =>{
        return showPassword ? "text" : "password";
    }

    return (
        <div 
        className={isError ? "auth-input error" : "auth-input"}
        >
            <div className="auth-input__icon">
                {Icon}
            </div>
            <input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={isPassword ? changePassword() : type} 
            placeholder={placeholder} />

            {isPassword && (
                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={showPassword ? "password--eye active" : "password--eye"}
                >
                    <EyeIcon />
                </button>
            )}

            {isError && (
                <div className="auth-input__alert">
                    <Tooltip>
                        <AlertIcon />
                    </Tooltip>
                </div>                
            )}

        </div>
    )
}

export default AuthInput;