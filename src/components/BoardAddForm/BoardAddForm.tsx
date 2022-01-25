import React, { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";


import { useHttp } from "../../hooks/useHttp";
import { boardCreated } from "../../actions";
import { errorNotify, successNotify } from "../Toaster";


const BoardAddForm = () => {

    const [boardName, setBoardName] = useState('');
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newBoard = {
            id: uuidv4(),
            name: boardName
        }

        request("http://localhost:3001/boards", "POST", JSON.stringify(newBoard))
            .then(() => dispatch(boardCreated(newBoard)))
            .then(() => successNotify('Доска создана'))
            .catch(() => errorNotify());

        setBoardName("");
    }

    return (
        <form className="boards__add-form"
            onSubmit={onSubmitHandler} >
            <input
                type="text"
                name="name"
                required
                placeholder="Добавить доску"
                className="boards__add-input"
                value={boardName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBoardName(e.target.value)} />
            <button className="btn" type="submit">Добавить</button>
        </form>
    )
}

export default BoardAddForm;