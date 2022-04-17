import React, {ChangeEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {columnCreated} from '../../actions';
import {successNotify, errorNotify} from '../Toaster';

const ColumnAddForm = () => {
  const {activeBoardId} = useAppSelector((state) => state);
  const [columnName, setColumnName] = useState('');
  const dispatch = useAppDispatch();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newColumn = {
      id: uuidv4(),
      name: columnName,
      parent: activeBoardId,
    };

    axios
      .post(`http://localhost:3001/columns`, newColumn)
      .then(() => dispatch(columnCreated(newColumn)))
      .then(() => successNotify('Колонка добавлена'))
      .catch(() => errorNotify());

    setColumnName('');
  };

  return (
    <div className="columns__item">
      <div className="columns__item-inner">
        <h3 className="columns__header columns__header--add">Добавить колонку</h3>
        <form className="columns__add-form" onSubmit={onSubmitHandler}>
          <input
            type="text"
            required
            name="column"
            placeholder="Введите заголовок списка"
            className="columns__add-input"
            value={columnName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setColumnName(e.target.value)}></input>
          <button className="btn btn--add-column" type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ColumnAddForm;
