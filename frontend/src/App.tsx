import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
import { AppRoutes } from './react/router/AppRoutes';
import { AuthProvider } from './react/context/AuthContext';
import { FloatingTree } from '@floating-ui/react';

function App() {
  return (
    <div className="App">
      <FloatingTree>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes /> 
          </BrowserRouter>
        </AuthProvider>
      </FloatingTree>
      
    </div>
  );
}

export default App;
