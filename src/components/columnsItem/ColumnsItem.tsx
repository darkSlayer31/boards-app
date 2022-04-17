import axios from 'axios';
import {useAppSelector, useAppDispatch} from '../../hooks';

import TaskList from '../TaskList/TaskList';
import TaskAddForm from '../TaskAddForm/TaskAddForm';
import {columnDeleted} from '../../actions';
import {errorNotify} from '../Toaster';

import './columnsItem.scss';

interface ColumnsItemProps {
  id: string;
  name: string;
  parent: string;
}

const ColumnsItem = (props: ColumnsItemProps) => {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const onDelete = async (id: string) => {
    try {
      const deletedTasks = tasks.filter((item) => item.parent === id);
      const promises = deletedTasks.map(async (item) => await axios.delete(`http://localhost:3001/tasks/${item.id}`));

      await Promise.all(promises);
      await axios.delete(`http://localhost:3001/columns/${id}`);

      dispatch(columnDeleted(id));
    } catch (err) {
      errorNotify();
    }
  };

  return (
    <div className="columns__item">
      <div className="columns__item-inner">
        <h3 className="columns__header">{props.name}</h3>
        <TaskList columnId={props.id} columnName={props.name} />
        <TaskAddForm columnId={props.id} />
        <div className="columns__delete">
          <button className="btn" type="button" onClick={() => onDelete(props.id)}>
            Удалить колонку
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnsItem;
