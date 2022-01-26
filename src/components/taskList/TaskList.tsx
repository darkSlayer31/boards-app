import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { taskDeleted, setModalActive, taskUpdated } from '../../actions';
import { errorNotify, warningNotify } from '../Toaster';
import { Task } from '../../types/types'

import './taskList.scss';
import nextIcon from '../../assets/images/icons/arrow-next-icon.svg';
import removeIcon from '../../assets/images/icons/delete-icon.svg';

interface TaskListProps {
  columnId: string,
  columnName: string
}

const TaskList = ({ columnId, columnName }: TaskListProps) => {

  const { tasks, columns, activeBoardId } = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  const filteredTasks = tasks.filter(item => item.parent === columnId)

  const onDelete = (id: string) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => dispatch(taskDeleted(id)))
      .catch(() => errorNotify())
  }

  const changeColumnParent = (id: string) => {
    const task = filteredTasks.find(item => item.id === id);
    const filteredColumns = columns.filter(item => item.parent === activeBoardId);
    const columnIndex = filteredColumns.findIndex(item => item.id === task?.parent)

    if (filteredColumns.length <= columnIndex + 1) {
      warningNotify('Больше колонок нет')
    } else if (task) {
      const newTask: Task = {
        ...task,
        parent: filteredColumns[columnIndex + 1].id
      }
      dispatch(() => taskUpdated(id, newTask));
    }
  }

  return (
    <ul className="task__list">
      {
        filteredTasks.length === 0 ? (
          <ul className="task__list">
            <li className="task__item task__item--empty">
              <div className="task__link">
                <h5 className="task__title">Задач нет</h5>
              </div>
            </li>
          </ul>
        )
          :
          filteredTasks.map(({ id, ...props }) => {
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
    </ul>
  )
}

export default TaskList