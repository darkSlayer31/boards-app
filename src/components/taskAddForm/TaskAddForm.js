import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { taskCreated } from "../../actions";


const TaskAddForm = ({columnId}) => {

    const activeBoardId = useSelector(state => state.activeBoard.id)
    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            name: taskName,
            author: 'author',
            descr: '',
            comments: []
        }

        dispatch(taskCreated(activeBoardId, columnId, newTask))

        setTaskName("");
    }


    return (
        <form className="task__add-form" onSubmit={onSubmitHandler}>
            <input
                type="text"
                name="task"
                placeholder="Добавить задачу"
                className="task__add-input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)} ></input>
            <button className="btn" type="submit">Добавить</button>
        </form>
    )
}

export default TaskAddForm;