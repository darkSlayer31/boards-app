import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";

import CommentsList from "../CommentsList";
import CommentsAddForm from "../CommentsAddForm";
import { taskUpdated, activeTaskChanged } from "../../actions";
import { errorNotify } from "../Toaster";

const TaskModal = () => {
    const {activeTask, activeBoardId, boards, activeUser} = useSelector(state => state);
    const activeBoard = boards.find(item => item.id === activeBoardId);
    const [descr, setDescr] = useState(activeTask.descr);
    const [editDescr, setEditDescr] = useState(false);

    const dispatch = useDispatch();
    const {request} = useHttp();

    const onChangeDescr = (id) => {
        const newTask = {
            ...activeTask,
            descr
        }

        request(`http://localhost:3001/tasks/${id}`, "PUT", JSON.stringify(newTask))
            .then(() => dispatch(taskUpdated(id, newTask)))
            .then(() => dispatch(activeTaskChanged(newTask)))
            .catch(() => errorNotify())
        setEditDescr(false)
    }

    return (
        <>
            <div className="modal__header">
                <div className="task__name">{activeTask.name}</div>
                <div className="task__info">
                    <div className="task__author">Автор задачи: {activeTask.author}</div>
                    <div className="task__from">Находиться на доске {activeBoard.name} в колонке {activeTask.columnName}</div>
                </div>
            </div>
            <div className="task__descr">
                <h3 className="task__subtitle">Описание</h3>

                {((activeTask.descr !== '') && !editDescr) && (
                    <>
                        <p className="task__descr-text">{activeTask.descr}</p>
                        {activeUser.username === activeTask.author && (
                            <button className="comments__reply" type="button" onClick={() => setEditDescr(true)}>изменить</button>
                        )}
                    </>
                )}

                {((activeTask.descr === '') || editDescr) && (
                    <>
                        <textarea
                            className="form__control form__control--textarea"
                            name="commentText"
                            placeholder="Опишите вашу задачу"
                            value={descr}
                            onChange={(e) => setDescr(e.target.value)}
                            ></textarea>
                        <button className="btn" type="submit" onClick={() => onChangeDescr(activeTask.id)}>{editDescr ? 'Изменить' : 'Добавить'}</button>
                    </>
                )}
            </div>

            <h3 className="task__subtitle">Комментарии:</h3>
            <CommentsAddForm taskId={activeTask.id} taskParent={activeTask.parent}/>
            <CommentsList taskId={activeTask.id}/>
        </>
    )
}

export default TaskModal;