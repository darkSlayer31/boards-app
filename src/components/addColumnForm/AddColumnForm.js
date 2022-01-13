import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { columnCreated } from "../../actions";


const AddColumnForm = () => {

    const activeBoardId = useSelector(state => state.activeBoard.id)
    const [columnName, setColumnName] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newColumn = {
            id: uuidv4(),
            name: columnName,
            tasks: []
        }

        request(`http://localhost:3001/boards/${activeBoardId}/columns`, "POST", JSON.stringify(newColumn))
            .then(res => console.log(res, "Отправка успешна"))
            .then(dispatch(columnCreated(activeBoardId, newColumn)))
            .catch(err => console.log(err));

        //dispatch(columnCreated(activeBoardId, newColumn))

        setColumnName("");
    }


    return (
        <div className="columns__item">
            <div className="columns__item-inner">
                <div className="columns__header columns__header--add">Добавить колонку</div>
                <form className="columns__add-form" onSubmit={onSubmitHandler}>
                    <input type="text"
                        required
                        name="column"
                        placeholder="Введите заголовок списка"
                        className="columns__add-input"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)} ></input>
                    <button className="btn btn--add-column" type="submit">Добавить</button>
                </form>
            </div>
        </div>
    )
}

export default AddColumnForm;