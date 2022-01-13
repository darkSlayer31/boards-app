import { useDispatch, useSelector } from 'react-redux';

import TaskList from '../taskList/TaskList';
import TaskAddForm from '../taskAddForm/TaskAddForm';
import { columnDeleted } from '../../actions';



import './columnsItem.scss';

const ColumnsItem = (props) => {

    const {activeBoard} = useSelector(state => state);
    const dispatch = useDispatch();


    return (
        <div className="columns__item">
            <div className="columns__item-inner">
                <div className="columns__header">{props.name}</div>
                <TaskList tasks={props.tasks} columnId={props.id} columnName={props.name}/>
                <TaskAddForm columnId={props.id}/>
                <div className='columns__delete'>
                    <button
                        className="btn"
                        type="button"
                        onClick={() => dispatch(columnDeleted(activeBoard.id, props.id))} >Удалить колонку</button>
                </div>
            </div>
        </div>
    )
}

export default ColumnsItem;