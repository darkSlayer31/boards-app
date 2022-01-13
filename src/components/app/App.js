import { useSelector } from "react-redux";

import AppHeader from "../appHeader/AppHeader";
import Sidebar from "../Sidebar/Sidebar";
import Board from "../board/Board";
import Modal from "../modal/Modal";
import TaskModal from "../taskModal/TaskModal";

import "./app.scss"

const App = () => {

    const activeTask = useSelector(state => state.activeTask)

    return (
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
        </>

    );
}

export default App;