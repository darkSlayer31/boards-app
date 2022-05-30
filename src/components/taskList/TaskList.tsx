import axios from 'axios';
import {batch} from 'react-redux';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {
  taskDeleted,
  setModalActive,
  taskUpdated,
  activeTaskChanged,
} from '../../store/reducers/boardsSlice/boardsSlice';
import {errorNotify, warningNotify} from '../Toaster';
import {Task} from '../../types/types';

import './taskList.scss';
import nextIcon from '../../assets/images/icons/arrow-next-icon.svg';
import removeIcon from '../../assets/images/icons/delete-icon.svg';

type TaskListProps = {
  columnId: string;
  columnName: string;
};

const TaskList = ({columnId, columnName}: TaskListProps) => {
  const {tasks, columns, activeBoardId} = useAppSelector((state) => state.boards);

  const dispatch = useAppDispatch();

  const filteredTasks = tasks.filter((item) => item.parent === columnId);

  const onDelete = (id: string) => {
    axios
      .delete(`http://localhost:3001/tasks/${id}`)
      .then(() => dispatch(taskDeleted(id)))
      .catch(() => errorNotify());
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>, task: Task, columnName: string) => {
    batch(() => {
      dispatch(setModalActive(true));
      dispatch(activeTaskChanged({...task, columnName}));
    });
  };

  const changeColumnParent = (id: string) => {
    const task = filteredTasks.find((item) => item.id === id);
    const filteredColumns = columns.filter((item) => item.parent === activeBoardId);
    const columnIndex = filteredColumns.findIndex((item) => item.id === task?.parent);

    if (filteredColumns.length <= columnIndex + 1) {
      warningNotify('Больше колонок нет');
    } else if (task) {
      const newTask: Task = {
        ...task,
        parent: filteredColumns[columnIndex + 1].id,
      };
      dispatch(() => taskUpdated(newTask));
    }
  };

  return (
    <ul className="task__list">
      {filteredTasks.length === 0 ? (
        <ul className="task__list">
          <li className="task__item task__item--empty">
            <div className="task__link">
              <h5 className="task__title">Задач нет</h5>
            </div>
          </li>
        </ul>
      ) : (
        filteredTasks.map((task) => {
          return (
            <li className="task__item" key={task.id}>
              <div role="button" className="task__link" onClick={(e) => onClickHandler(e, task, columnName)}>
                <h5 className="task__title">{task.name}</h5>
              </div>
              <div className="task__btns">
                <button type="button" className="btn--task" onClick={() => onDelete(task.id)}>
                  <img src={removeIcon} alt="" className="task__icon" />
                </button>
                <button type="button" className="btn--task" onClick={() => changeColumnParent(task.id)}>
                  <img src={nextIcon} alt="" className="task__icon" />
                </button>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default TaskList;
