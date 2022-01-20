import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';

import { commentDeleted, commentChanged } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

import './commentsList.scss'

const CommentsList = ({taskId}) => {

    const {request} = useHttp();
    const dispatch = useDispatch()
    const {comments, activeUser} = useSelector(state => state);
    const filteredComments = comments.filter(item => item.parent === taskId);

    const [editComment, setEditComment] = useState(() => {
        return {
            show: false,
            id: null
        }
    })

    const [commentText, setCommentText] = useState('');

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

                    { (editComment.show && editComment.id === id)
                        ? <input className="comments__text" defaultValue={text} onChange={(e) => setCommentText(e.target.value)}></input>
                        : <p className="comments__text">{text}</p>
                    }

                    { (activeUser.username === author && !editComment.show) && (
                        <>
                            <button className="comments__reply" type="button" onClick={() => setEditComment({show: true, id: id})}>изменить</button>
                            <button className="comments__reply" type="button" onClick={() => onDelete(id, author)}>удалить</button>
                        </>
                    )}

                    { (editComment.show && author === activeUser.username && editComment.id === id) && (
                        <button className="comments__reply" type="button" onClick={() => onChangeComment(id, commentText)}>подтвердить</button>
                    )}

                </li>
            )
        })
    }

    const elements = renderComments(filteredComments)

    return (
        <ul className="comments">
            {elements}
        </ul>
    )
}

export default CommentsList;