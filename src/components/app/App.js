import { useSelector } from "react-redux";

import Register from "../register/Register";
import AppHeader from "../appHeader/AppHeader";
import Sidebar from "../Sidebar/Sidebar";
import Board from "../board/Board";
import Modal from "../modal/Modal";
import TaskModal from "../taskModal/TaskModal";

import "./app.scss"

const App = () => {

    const {activeTask, activeUser} = useSelector(state => state)

    return (
        <>
            {/* {activeUser ?
            <>
                <AppHeader/>
                <div className="app">
                    <div className="app__wrapper">
                        <Sidebar/>
                        <div className="workspace">
                            <Board/>
                        </div>
                    </div>
                </div>
                <Modal>
                    {activeTask ? <TaskModal /> : null}
                </Modal>
            </> : <Register/>} */}
            <Register/>
            <AppHeader/>
            <div className="app">
                <div className="app__wrapper">
                    <Sidebar/>
                    <div className="workspace">
                        <Board/>
                    </div>
                </div>
            </div>
            <Modal>
                {activeTask ? <TaskModal /> : null}
            </Modal>
        </>

    );
}

export default App;