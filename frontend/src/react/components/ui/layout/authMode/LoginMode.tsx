import { Link } from "react-router-dom";
import AuthChangeButton from "../../../controls/buttons/AuthChangeButton";
import { LoginForm } from "../../../forms/login/LoginForm";

export default function LoginMode() {

    return (
        <div className="form login">
            <div className="form__header">
                <h1>Вход</h1>
                <Link to={"/auth?mode=register"}>
                    <AuthChangeButton >
                        <p>В первый раз? Создай аккаунт</p>
                    </AuthChangeButton>
                </Link>
            </div>
            
            <LoginForm />
        </div>
    )
}