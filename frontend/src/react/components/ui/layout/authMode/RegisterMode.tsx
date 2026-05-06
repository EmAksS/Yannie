import { Link } from "react-router-dom";
import AuthChangeButton from "../../../controls/buttons/AuthChangeButton";
import { RegisterForm } from "../../../forms/register/RegisterForm";

export default function RegisterMode() {

    return (
        <div className="form register">
            <div className="form__header">
                <h1>Регистрация</h1>
                <Link to={"/auth"}>
                    <AuthChangeButton>
                        <p>Уже есть аккаунт? Войди</p>
                    </AuthChangeButton>
                </Link>
                
            </div>
            
            <RegisterForm />
        </div>
    )
}