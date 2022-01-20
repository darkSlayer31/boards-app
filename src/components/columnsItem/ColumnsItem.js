import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import TaskList from '../taskList/TaskList';
import TaskAddForm from '../taskAddForm/TaskAddForm';
import { columnDeleted} from '../../actions';

import './columnsItem.scss';

const ColumnsItem = (props) => {

    const {tasks} = useSelector(state => state)
    const dispatch = useDispatch();
    const {request} = useHttp();


    const onDelete = async (id) => {
        try {
            const deletedTasks = tasks.filter(item => item.parent === id);
            const promises = deletedTasks.map(async (item) => await request(`http://localhost:3001/tasks/${item.id}`, 'DELETE'));

            await Promise.all(promises);
            await request(`http://localhost:3001/columns/${id}`, 'DELETE');

            dispatch(columnDeleted(id));
        } catch (err) {
            console.log(err)
        }

        // console.log('tasks deleted')
        //     .then(data => console.log(data, "column deleted"))
        //     .then(dispatch(columnDeleted(id)))
        //     .then(Promise.all(promises)
        //         .then(console.log('tasks deleted')))
        //     .catch(err => console.log(err))
        //dispatch(columnDeleted(id));
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