import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector} from "react-redux";
import { useHttp } from "../../hooks/http.hook";

import { commentCreated } from "../../actions";

import './commentsAddForm.scss'

const CommentsAddForm = ({taskId, taskParent}) => {

    const {activeBoardId, activeUser} = useSelector(state => state)

    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newComment = {
            id: uuidv4(),
            text: commentText,
            author: activeUser.username,
            parent: taskId,
            columnParent: taskParent,
            boardParent: activeBoardId
        }

        request(`http://localhost:3001/comments`, 'POST', JSON.stringify(newComment))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(commentCreated(newComment)))
            .catch(err => console.log(err));
        //dispatch(commentCreated(newComment));

        setCommentText("");
    }



    return (
        <form className="form form--comment" action="/" method="post" onSubmit={onSubmitHandler}>
            <div className="form__group">
                <textarea
                    className="form__control form__control--textarea"
                    name="commentText"
                    placeholder="Текст комментария"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                     ></textarea>
            </div>
            <button className="btn" type="submit">Отправить</button>
        </form>
    )
}

export default CommentsAddForm;