export const AuthButton = ({text, onClick}) => {

    return (
        <button 
        className="button button--to-ocean"
        onClick={onClick}>
            <p>{text}</p>
        </button>
    );
}