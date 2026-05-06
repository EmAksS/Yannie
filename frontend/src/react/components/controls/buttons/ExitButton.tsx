import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../scripts/hooks/useAuth";
import URLS from "../../../../constants/urls";

export const ExitButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const exitHandle = () => {
        logout();
        navigate(URLS.HOME, { replace: true });
    }

    return (
        <button onClick={exitHandle}>
            <p>Выйти из аккаунта</p>
        </button>
    );
}