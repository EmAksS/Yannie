import { Link } from "react-router-dom";
import { AuthMoveButton } from "../../../../controls/buttons/AuthMoveButton";
import Logo from "../logo/Logo";

export default function PublicMenu( ) {

    return (
        <div className="content flex--space">
            <div className="header__start">
                <Logo />
            </div>
            <div className="header__end">
                <Link to={"/auth"}>
                    <AuthMoveButton text={"Вход"}  isSignIn={true} />
                </Link>
                <Link to={"/auth?mode=register"}>
                    <AuthMoveButton text={"Регистрация"} isSignIn={false} />
                </Link>
            </div>
                

        </div>
    )
}