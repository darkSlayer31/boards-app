import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import TaskList from '../taskList/TaskList';
import TaskAddForm from '../taskAddForm/TaskAddForm';
import { columnDeleted, taskDeleted } from '../../actions';

import './columnsItem.scss';

const ColumnsItem = (props) => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    const tasks = useSelector(state => state.tasks)

    const onDelete = (id) => {
        const deletedTasks = tasks.filter(item => item.parent === id)
        request(`http://localhost:3001/columns/${id}`, 'DELETE')
            .then(data => console.log(data))
            .then(dispatch(columnDeleted(id)))
            .catch(err => console.log(err))
        // dispatch(columnDeleted(id));
        // dispatch(taskDeleted(deletedTasks));
    }

    return (
        <div className="columns__item">
            <div className="columns__item-inner">
                <div className="columns__header">{props.name}</div>
                <TaskList columnId={props.id} columnName={props.name}/>
                <TaskAddForm columnId={props.id}/>
                <div className='columns__delete'>
                    <button
                        className="btn"
                        type="button"
                        onClick={() => onDelete(props.id)} >Удалить колонку</button>
                </div>
            </div>
        </div>
    )
}

export default ColumnsItem;