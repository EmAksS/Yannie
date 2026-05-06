import { jsx as _jsx } from "react/jsx-runtime";
import Header from './react/components/ui/header/Header';
import './styles/global.scss';
function App() {
    return (_jsx("div", { className: "App", children: _jsx(Header, {}) }));
}
export default App;
