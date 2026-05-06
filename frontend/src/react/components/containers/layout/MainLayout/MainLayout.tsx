import { Outlet } from "react-router-dom";
import Header from "../../../ui/layout/header/Header";

import './MainLayout.scss';

export default function MainLayout (){
     return (
     <div className="main">
        <Header />

        <div className="mainLayout">
            <main className="content">
                <Outlet />
            </main>
        </div>
    </div>
)}