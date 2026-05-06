import { motion } from "framer-motion";

interface AuthChangeButtonProps {
    children: React.ReactNode; 
}

export const AuthChangeButton : React.FC<AuthChangeButtonProps> = ({children}) => {

    return (
        <motion.div
        className="dialog__change button">
            {children}
        </motion.div>
    )
}

export default AuthChangeButton;