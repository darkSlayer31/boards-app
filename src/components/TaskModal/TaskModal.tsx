import {useState} from 'react';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../hooks';

import CommentsList from '../CommentsList';
import CommentsAddForm from '../CommentsAddForm';
import {taskUpdated, activeTaskChanged} from '../../slices/boardsSlice/boardsSlice';
import {errorNotify} from '../Toaster';
import {Task} from '../../types/types';

const TaskModal = () => {
  const {activeTask, activeBoardId, boards} = useAppSelector((state) => state.boards);
  const {activeUser} = useAppSelector((state) => state.users);
  const activeBoard = boards.find((item) => item.id === activeBoardId);
  const [description, setDescription] = useState(activeTask?.description);
  const [editDescription, setEditDescription] = useState(false);

  const dispatch = useAppDispatch();

  const onChangeDescr = (id: string) => {
    if (description && activeTask) {
      const newTask: Task = {
        ...activeTask,
        description,
      };

      axios
        .put(`http://localhost:3001/tasks/${id}`, newTask)
        .then(() => dispatch(taskUpdated(newTask)))
        .then(() => dispatch(activeTaskChanged(newTask)))
        .catch(() => errorNotify());
      setEditDescription(false);
    }
  };

  return activeTask && activeBoard && activeUser ? (
    <>
      <div className="modal__header">
        <h2 className="task__name">{activeTask.name}</h2>
        <div className="task__info">
          <p className="task__author">Автор задачи: {activeTask.author}</p>
          <p className="task__from">
            Находиться на доске {activeBoard.name} в колонке {activeTask.columnName}
          </p>
        </div>
      </div>
      <div className="task__descr">
        <h3 className="task__subtitle">Описание</h3>

        {activeTask.description !== '' && !editDescription && (
          <>
            <p className="task__descr-text">{activeTask.description}</p>
            {activeUser.username === activeTask.author && (
              <button className="comments__change" type="button" onClick={() => setEditDescription(true)}>
                изменить
              </button>
            )}
          </>
        )}

        {(activeTask.description === '' || editDescription) && (
          <>
            <textarea
              className="form__control form__control--textarea"
              name="commentText"
              placeholder="Опишите вашу задачу"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn" type="submit" onClick={() => onChangeDescr(activeTask.id)}>
              {editDescription ? 'Изменить' : 'Добавить'}
            </button>
          </>
        )}
      </div>

      <h3 className="task__subtitle">Комментарии:</h3>
      <CommentsAddForm taskId={activeTask.id} taskParent={activeTask.parent} />
      <CommentsList taskId={activeTask.id} />
    </>
  ) : null;
};

export default TaskModal;
