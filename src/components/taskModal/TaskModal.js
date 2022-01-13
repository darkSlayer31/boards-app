import { useSelector } from "react-redux";

const TaskModal = () => {
    const {activeTask, activeBoard} = useSelector(state => state)

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

            <form className="form" action="/" method="post">
                <div className="form__group">
                    <textarea className="form__control form__control--textarea" name="comment-text" placeholder="Текст комментария" data-autoresize></textarea>
                </div>
                <button className="btn" type="submit">Отправить</button>
            </form>
            <ul className="comments">
                <li className="comments__item">
                    <div className="comments__header">
                        <div className="comments__author">
                            <div className="comments__name">Виктор Копань</div>
                        </div>
                    </div>
                    <div className="comments__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est temporibus aliquam alias deleniti hic, ratione nihil. Recusandae ipsam repudiandae, aut quae hic. Doloribus consectetur ducimus cumque eum, voluptatibus provident nam.</div>
                    <button className="comments__reply" type="button">изменить</button>
                </li>
            </ul>
        </>
    )
}

export default TaskModal;