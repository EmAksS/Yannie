import { useNavigate } from "react-router-dom"
import HomeView from "../../views/homeView/HomeView"

export const HomePage = () => {

    const navigate = useNavigate();

    const handdleHint = async () => {
        navigate("/auth");
    }

    return (
        <HomeView hintNavigate={handdleHint}/>
    )
}