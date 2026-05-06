import { ExitButton } from "../../../../controls/buttons/ExitButton";
import Logo from "../logo/Logo";

export default function ProtectedMenu(params) {

    return (
        <div className="content flex--space">
            <div className="header__start">
                <Logo />
            </div>
            <div className="header__end">
                <ExitButton />
            </div>
                

        </div>
    )
}