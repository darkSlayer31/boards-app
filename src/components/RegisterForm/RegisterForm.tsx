import {ChangeEvent, FormEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {userAdded} from '../../actions';
import validateUser from './utils';
import {errorNotify, successNotify} from '../Toaster';
import {User} from '../../types/types';

import './register.scss';

const Register = () => {
  const dispatch = useAppDispatch();
  const {users} = useAppSelector((state) => state);

  const [userData, setUserData] = useState(() => {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
    };
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = {
      ...userData,
      id: uuidv4(),
    };

    const sameUser = users.find((item) => item.username === user.username || item.email === user.email);

    if (sameUser) {
      errorNotify('Такой пользователь уже существует');
    } else if (validateUser(user)) {
      await axios
        .post('http://localhost:3001/users', user)
        .then(() => dispatch(userAdded(user)))
        .then(() => successNotify('Вы успешно зарегистрированы'))
        .catch(() => errorNotify('Что-то пошло не так'));
    }

    setUserData({
      username: '',
      email: '',
      password: '',
      password2: '',
    });
  };

  return (
    <div className="form">
      <ToastContainer hideProgressBar position="top-center" theme="dark" />
      <h2 className="form__title">Регистрация пользователя:</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form__group">
          <label>
            Имя пользователя:{' '}
            <input
              className="form__control"
              type="username"
              id="username"
              name="username"
              value={userData.username}
              onChange={onChangeHandler}
            />
          </label>
        </div>
        <div className="form__group">
          <label>
            Email:{' '}
            <input
              className="form__control"
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={onChangeHandler}
              formNoValidate
            />
          </label>
        </div>
        <div className="form__group">
          <label>
            Пароль:{' '}
            <input
              className="form__control"
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={onChangeHandler}
            />
          </label>
        </div>
        <div className="form__group">
          <label>
            Повторите пароль:{' '}
            <input
              className="form__control"
              type="password"
              id="password2"
              name="password2"
              value={userData.password2}
              onChange={onChangeHandler}
            />
          </label>
        </div>
        <button className="btn" type="submit">
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default Register;
