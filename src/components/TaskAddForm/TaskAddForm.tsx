import {FormEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {useAppSelector, useAppDispatch} from '../../hooks';

import {taskCreated} from '../../actions';
import {errorNotify, successNotify} from '../Toaster';
import {Task} from '../../types/types';

interface TaskAddFormProps {
  columnId: string;
}

const TaskAddForm = ({columnId}: TaskAddFormProps) => {
  const {activeBoardId, activeUser} = useAppSelector((state) => state);
  const [taskName, setTaskName] = useState('');
  const dispatch = useAppDispatch();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeUser) {
      const newTask: Task = {
        id: uuidv4(),
        name: taskName,
        author: activeUser.username,
        description: '',
        parent: columnId,
        boardParent: activeBoardId,
      };

      axios
        .post(`http://localhost:3001/tasks`, newTask)
        .then(() => dispatch(taskCreated(newTask)))
        .then(() => successNotify('Задача добавлена'))
        .catch(() => errorNotify());

      setTaskName('');
    }
  };

  return (
    <form className="task__add-form" onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="task"
        placeholder="Добавить задачу"
        className="task__add-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button className="btn" type="submit">
        Добавить
      </button>
    </form>
  );
};

export default TaskAddForm;
