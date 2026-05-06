import { useAuth } from "../../../../../scripts/hooks/useAuth";
import "./Header.scss";
import ProtectedMenu from "./menu/ProtectedMenu";
import PublicMenu from "./menu/PublicMenu";

export default function Header() {

    const { isAuth } = useAuth();

    return (
        <header className="header">
            { isAuth ? 
                (<ProtectedMenu />): 
                (<PublicMenu />)
            }
        </header>
    )
}