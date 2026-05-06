import './AuthView.scss';

import RegisterMode from '../../components/ui/layout/authMode/RegisterMode';
import LoginMode from '../../components/ui/layout/authMode/LoginMode';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

export const AuthView = () => {
  const [searchParams] = useSearchParams();
  
  const mode = searchParams.get("mode") === "register" ? "register" : "login";
  const isLogin = mode === "login" ;


  return (
    <main className="auth">
      <div className="auth__box">
        <AnimatePresence mode='wait'>
          {isLogin ? (
            <motion.div
            key="login"
            initial={{opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            >
              <LoginMode />
            </motion.div>
          ) : (
            <motion.div
            key="register"
            initial={{opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            >
              <RegisterMode />
            </motion.div>
          )}
        </AnimatePresence>
          

      </div>
    </main>
  );
};

export default AuthView;