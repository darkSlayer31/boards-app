import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";

import { commentDeleted, commentChanged } from "../../actions";

const CommentsItem = ({comment, editComment, setEditComment}) => {

    const {activeUser, comments} = useSelector(state => state);
    const [commentText, setCommentText] = useState(comment.text);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onDelete = (id, author) => {
        if (activeUser.username !== author) {
            alert('Вы не можете удалить чужой комментарий')
        } else {
            request(`http://localhost:3001/comments/${id}`, 'DELETE')
                .then(dispatch(commentDeleted(id)))
                .then(console.log('коммент удален'))
                .catch(err => console.log(err))
        }
    }

    const onChangeComment = (id, text) => {
        const comment = comments.find(item => item.id === id)
        const newComment = {
            ...comment,
            text
        }

        request(`http://localhost:3001/comments/${id}`, "PUT", JSON.stringify(newComment))
            .then(dispatch(commentChanged(id, text)))
            .catch(err => console.log(err))

        setEditComment({show: false, id: null})
    }

    return (
        <li className="comments__item">
            <div className="comments__header">
                <div className="comments__author">
                    <div className="comments__name">{comment.author}</div>
                </div>
            </div>

            { (editComment.show && editComment.id === comment.id)
                ? <input className="comments__text" value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                : <p className="comments__text">{comment.text}</p>
            }

            { (activeUser.username === comment.author && !editComment.show) && (
                <>
                    <button className="comments__reply" type="button" onClick={() => setEditComment({show: true, id: comment.id})}>изменить</button>
                    <button className="comments__reply" type="button" onClick={() => onDelete(comment.id, comment.author)}>удалить</button>
                </>
            )}

            { (editComment.show && comment.author === activeUser.username && editComment.id === comment.id) && (
                <button className="comments__reply" type="button" onClick={() => onChangeComment(comment.id, commentText)}>подтвердить</button>
            )}

        </li>
    )
}

export default CommentsItem;