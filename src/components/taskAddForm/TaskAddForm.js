import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch} from "react-redux";
import { useHttp } from "../../hooks/http.hook";

import { taskCreated } from "../../actions";


const TaskAddForm = ({columnId}) => {

    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            name: taskName,
            author: 'author',
            descr: '',
            parent: columnId
        }

        request(`http://localhost:3001/tasks`, 'POST', JSON.stringify(newTask))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(taskCreated(newTask)))
            .catch(err => console.log(err));

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