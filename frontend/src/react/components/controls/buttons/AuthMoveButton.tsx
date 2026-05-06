export const AuthMoveButton = ({text, isSignIn = true}) => {

    return (
        <div
        className={ isSignIn ? "sign-in sign button button--to-ocean" : "sign-up sign button button--from-ocean"}>
            <p>{text}</p>
        </div>
    );
}