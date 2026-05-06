import { Link } from "react-router-dom";
import URLS from "../../../../../../constants/urls";

export default function Logo() {
    return (
        <Link className="header__logo" to={URLS.HOME}>
            <p>ЯнИИ</p>
        </Link>
    )
}