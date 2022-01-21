import { useSelector} from 'react-redux'
import { useState } from 'react';


import './commentsList.scss'
import CommentsItem from '../CommentsItem/CommentsItem';

const CommentsList = ({taskId}) => {

    const {comments} = useSelector(state => state);
    const filteredComments = comments.filter(item => item.parent === taskId);

    const [editComment, setEditComment] = useState(() => {
        return {
            show: false,
            id: null
        }
    })

    const renderComments = (arr) => {
        if (arr.length === 0) {
            return <h3 className="task__subtitle">Нет комментариев</h3>
        }

        return arr.map(item => {
            return (
                <CommentsItem key={item.id} comment={item} editComment={editComment} setEditComment={setEditComment} />
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