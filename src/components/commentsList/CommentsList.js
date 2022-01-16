import { useSelector } from 'react-redux'

import './commentsList.scss'

const CommentsList = ({taskId}) => {

    const comments = useSelector(state => state.comments);
    const filteredComments = comments.filter(item => item.parent === taskId);
    console.log(filteredComments);


    const renderComments = (arr) => {
        if (arr.length === 0) {
            return <h3 className="task__subtitle">Нет комментариев</h3>
        }

        return arr.map(({id, author, text}) => {
            return (
                <li key={id} className="comments__item">
                    <div className="comments__header">
                        <div className="comments__author">
                            <div className="comments__name">{author}</div>
                        </div>
                    </div>
                    <div className="comments__text">{text}</div>
                    <button className="comments__reply" type="button">изменить</button>
                </li>
            )
        })
    }

    const elements = renderComments(filteredComments)
    console.log(elements)


    return (
        <ul className="comments">
            {elements}
        </ul>
    )
}

export default CommentsList;