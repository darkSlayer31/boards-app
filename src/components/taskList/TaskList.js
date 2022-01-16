import { useDispatch, useSelector } from 'react-redux';

import { taskDeleted, setModalActive } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

import './taskList.scss';
import nextIcon from './arrow-next-icon.svg';
import removeIcon from './delete-icon.svg';

const TaskList = ({columnId, columnName}) => {

    const {tasks} = useSelector(state => state);

    const dispatch = useDispatch();
    const {request} = useHttp()

    const filteredTasks = tasks.filter(item => item.parent === columnId)

    const onDelete = (id) => {
        request(`http://localhost:3001/tasks/${id}`, 'DELETE')
            .then(data => console.log(data))
            .then(dispatch(taskDeleted(id)))
            .catch(err => console.log(err))
    }

    const renderTaskList = (arr) => {
        if (arr.length === 0) {
            return (
                <ul className="task__list">
                    <li className="task__item task__item--empty">
                        <div href="1" className="task__link" target="_blank">
                            <h5 className="task__title">Задач нет</h5>
                        </div>
                    </li>
                </ul>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <li className="task__item" key={id}>
                    <div className="task__link" onClick={() => dispatch(setModalActive(true, {id, ...props, columnName}))}>
                        <h5 className="task__title">{props.name}</h5>
                    </div>
                    <div className="task__btns">
                        <button className="btn--task"
                            onClick={() => onDelete(id)} >
                            <img src={removeIcon} alt="" className="task__icon"></img>
                        </button>
                        <button className="btn--task">
                            <img src={nextIcon} alt="" className="task__icon"></img>
                        </button>
                    </div>
                </li>
            )
        })
    }

    const elements = renderTaskList(filteredTasks);

    return (
        <ul className="task__list">
            {elements}
        </ul>
    )
}

export default TaskList