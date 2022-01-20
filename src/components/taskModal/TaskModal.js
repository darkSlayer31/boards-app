import { useSelector } from "react-redux";

import CommentsList from "../commentsList/CommentsList";
import CommentsAddForm from "../commentsAddForm/CommentsAddForm";

const TaskModal = () => {
    const {activeTask, activeBoardId, boards} = useSelector(state => state);
    const activeBoard = boards.find(item => item.id === activeBoardId);

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
                <h4 className="task__subtitle">Описание</h4>
                <div className="task__descr-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
            </div>

            <h3 className="task__subtitle">Комментарии:</h3>

            <CommentsAddForm taskId={activeTask.id} taskParent={activeTask.parent}/>
            <CommentsList taskId={activeTask.id}/>
        </>
    )
}

export default TaskModal;