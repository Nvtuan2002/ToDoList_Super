import Header from "./Header";
import BoardInfoBar from "./BoardInfoBar";
import { Outlet } from "react-router-dom";

function BaseLayout() {
    return (
        <div className="base-layout">
            <Header />
            <BoardInfoBar />
            <main><Outlet></Outlet></main>
        </div>
    );
}

export default BaseLayout;