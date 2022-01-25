import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppSelector, useAppDispatch, useHttp } from "../../hooks";
import { Comment } from '../../types/types'
import { commentCreated } from "../../actions";
import { errorNotify, successNotify } from "../Toaster";


import './commentsAddForm.scss'

interface CommentsAddFormProps {
    taskId: string,
    taskParent: string
}

const CommentsAddForm = ({ taskId, taskParent }: CommentsAddFormProps) => {

    const { activeBoardId, activeUser } = useAppSelector(state => state)

    const [commentText, setCommentText] = useState('');
    const dispatch = useAppDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (activeUser) {
            const newComment: Comment = {
                id: uuidv4(),
                text: commentText,
                author: activeUser.username,
                parent: taskId,
                columnParent: taskParent,
                boardParent: activeBoardId
            }

            request(`http://localhost:3001/comments`, 'POST', JSON.stringify(newComment))
                .then(() => dispatch(commentCreated(newComment)))
                .then(() => successNotify('Комментарий добавлен'))
                .catch(() => errorNotify());

            setCommentText("");
        }
    }

    return (
        <form className="form form--comment" action="/" method="post" onSubmit={onSubmitHandler}>
            <div className="form__group">
                <textarea
                    className="form__control form__control--textarea"
                    name="commentText"
                    placeholder="Текст комментария"
                    value={commentText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
                ></textarea>
            </div>
            <button className="btn" type="submit">Отправить</button>
        </form>
    )
}

export default CommentsAddForm;