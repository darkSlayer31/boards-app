import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";

import { boardCreated } from "../../actions";


const AddBoardForm = () => {

    const [boardName, setBoardName] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newBoard = {
            id: uuidv4(),
            name: boardName,
            columns: []
        }

        request("http://localhost:3001/boards", "POST", JSON.stringify(newBoard))
            .then(res => console.log(res, "Отправка успешна"))
            .then(dispatch(boardCreated(newBoard)))
            .catch(err => console.log(err));

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
                onChange={(e) => setBoardName(e.target.value)} />
            <button className="btn" type="submit">Добавить</button>
        </form>
    )
}

export default AddBoardForm;