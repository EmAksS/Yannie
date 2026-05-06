import { Link } from "react-router-dom";
import { useAuth } from "../../../scripts/hooks/useAuth";
import "./HomeView.scss";

export const HomeView = ({hintNavigate}) => {

    const { isAuth } = useAuth();

    return (
        <div className="home">
            <h1>Добро пожаловать в ЯнИИ!</h1>
            <div className="home__description">
                {isAuth ? 
                    (<p>Выберите файл для создания подписи или <br/>
                         для проверки наличия подписи</p>) :
                    (<p>Выберите изображение и проверьте на наличие сертификата</p>) 
                }
                
            </div>
            <div className="home__buttons">
                <button>
                    <p>Начать проверку</p>
                </button>
                {isAuth  && (
                    <button>
                        <p>Получить сертификат</p>
                    </button>
                )}
            </div>
            {!isAuth && (
                <Link to={"/auth"} className="">
                    <p>Для того, чтобы создать цифровую подпись необходимо авторизоваться</p>
                </Link>
            )}
        </div>
    );
};

export default HomeView;