import { useAppSelector, useAppDispatch, useHttp } from '../../hooks';
import { taskDeleted, setModalActive, taskUpdated } from '../../actions';
import { errorNotify } from '../Toaster';
import { Task } from '../../types/types'

import './taskList.scss';
import nextIcon from './arrow-next-icon.svg';
import removeIcon from './delete-icon.svg';

interface TaskListProps {
    columnId: string,
    columnName: string
}

const TaskList = ({ columnId, columnName }: TaskListProps) => {

    const { tasks, columns, activeBoardId } = useAppSelector(state => state);

    const dispatch = useAppDispatch();
    const { request } = useHttp()

    const filteredTasks = tasks.filter(item => item.parent === columnId)

    const onDelete = (id: string) => {
        request(`http://localhost:3001/tasks/${id}`, 'DELETE')
            .then(() => dispatch(taskDeleted(id)))
            .catch(() => errorNotify())
    }

    const changeColumnParent = (id: string) => {
        const task = filteredTasks.find(item => item.id === id);
        const filteredColumns = columns.filter(item => item.parent === activeBoardId);
        const columnIndex = filteredColumns.findIndex(item => item.id === task?.parent)

        if (filteredColumns.length <= columnIndex + 1) {
            alert('Больше колонок нет')
        } else if (task) {
            const newTask: Task = {
                ...task,
                parent: filteredColumns[columnIndex + 1].id
            }
            dispatch(() => taskUpdated(id, newTask));
        }
    }

    const renderTaskList = (arr: Task[]) => {
        if (arr.length === 0) {
            return (
                <ul className="task__list">
                    <li className="task__item task__item--empty">
                        <div className="task__link">
                            <h5 className="task__title">Задач нет</h5>
                        </div>
                    </li>
                </ul>
            )
        }

        return arr.map(({ id, ...props }) => {
            return (
                <li className="task__item" key={id}>
                    <div className="task__link" onClick={() => dispatch(setModalActive(true, { id, ...props, columnName }))}>
                        <h5 className="task__title">{props.name}</h5>
                    </div>
                    <div className="task__btns">
                        <button className="btn--task"
                            onClick={() => onDelete(id)} >
                            <img src={removeIcon} alt="" className="task__icon"></img>
                        </button>
                        <button className="btn--task"
                            onClick={() => changeColumnParent(id)} >
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