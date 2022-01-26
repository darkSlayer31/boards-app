import { useAppSelector } from '../../hooks';
import CommentsItem from '../CommentsItem/CommentsItem';


import './commentsList.scss'

interface CommentsListProps {
  taskId: string
}

const CommentsList = ({ taskId }: CommentsListProps) => {

  const { comments } = useAppSelector(state => state);
  const filteredComments = comments.filter(item => item.parent === taskId);

  return (
    <>
      {
        filteredComments.length === 0 ? (<h3 className="task__subtitle">Нет комментариев</h3>)
          :
          (
            <ul className="comments">
              {
                filteredComments.map(item => {
                  return (
                    <CommentsItem key={item.id} comment={item} />
                  )
                })
              }
            </ul>
          )
      }
    </>
  )
}

export default CommentsList;