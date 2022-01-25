import React, { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppSelector, useAppDispatch, useHttp } from "../../hooks";
import { columnCreated } from "../../actions";
import { successNotify, errorNotify } from "../Toaster";

const ColumnAddForm = () => {

    const { activeBoardId } = useAppSelector(state => state)
    const [columnName, setColumnName] = useState('');
    const dispatch = useAppDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newColumn = {
            id: uuidv4(),
            name: columnName,
            parent: activeBoardId
        }

        request(`http://localhost:3001/columns`, "POST", JSON.stringify(newColumn))
            .then(() => dispatch(columnCreated(newColumn)))
            .then(() => successNotify('Колонка добавлена'))
            .catch(() => errorNotify());

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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setColumnName(e.target.value)} ></input>
                    <button className="btn btn--add-column" type="submit">Добавить</button>
                </form>
            </div>
        </div>
    )
}

export default ColumnAddForm;