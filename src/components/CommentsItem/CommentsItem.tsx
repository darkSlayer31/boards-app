import {ChangeEvent, useState, useRef} from 'react';
import {useOnClickOutside} from 'usehooks-ts';
import axios from 'axios';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {Comment} from '../../types/types';
import {commentDeleted, commentUpdated} from '../../store/reducers/boardsSlice/boardsSlice';
import {errorNotify} from '../Toaster';

type CommentsItemProps = {
  comment: Comment;
};

const CommentsItem = ({comment}: CommentsItemProps) => {
  const {comments} = useAppSelector((state) => state.boards);
  const {activeUser} = useAppSelector((state) => state.users);
  const [commentText, setCommentText] = useState(comment.text);
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useAppDispatch();
  const commentRef = useRef<HTMLLIElement>(null);

  const onDelete = (id: string, author: string) => {
    if (activeUser) {
      if (activeUser.username !== author) {
        errorNotify('Вы не можете удалить чужой комментарий');
      } else {
        axios
          .delete(`http://localhost:3001/comments/${id}`)
          .then(() => dispatch(commentDeleted(id)))
          .catch(() => errorNotify());
      }
    }
  };

  const onChangeComment = (id: string, text: string) => {
    const comment = comments.find((item) => item.id === id);
    if (comment) {
      const newComment = {
        ...comment,
        text,
      };
      axios
        .put(`http://localhost:3001/comments/${id}`, newComment)
        .then(() => dispatch(commentUpdated(newComment)))
        .catch(() => errorNotify());

      setIsEditable(false);
    }
  };

  const onClickOutside = () => {
    setIsEditable(false);
  };

  useOnClickOutside(commentRef, onClickOutside);

  return (
    <li className="comments__item" ref={commentRef}>
      <div className="comments__header">
        <div className="comments__author">
          <div className="comments__name">{comment.author}</div>
        </div>
      </div>

      {isEditable ? (
        <input
          className="comments__text"
          defaultValue={comment.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
        />
      ) : (
        <p className="comments__text">{comment.text}</p>
      )}

      {activeUser?.username === comment.author && !isEditable && (
        <>
          <button className="comments__change" type="button" onClick={() => setIsEditable(true)}>
            изменить
          </button>
          <button className="comments__change" type="button" onClick={() => onDelete(comment.id, comment.author)}>
            удалить
          </button>
        </>
      )}

      {isEditable && comment.author === activeUser?.username && (
        <button className="comments__change" type="button" onClick={() => onChangeComment(comment.id, commentText)}>
          подтвердить
        </button>
      )}
    </li>
  );
};

export default CommentsItem;
