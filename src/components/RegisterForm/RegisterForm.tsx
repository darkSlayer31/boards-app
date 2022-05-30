import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {userAdded} from '../../store/reducers/usersSlice/usersSlise';
import {errorNotify, successNotify} from '../Toaster';
import {User} from '../../types/types';

import './register.scss';

const Register = () => {
  const dispatch = useAppDispatch();
  const {users} = useAppSelector((state) => state.users);

  const userSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Минимум символов 4')
      .max(12, 'Максимум символов 12')
      .matches(/^[A-Za-z0-9]+$/, 'Только латиница')
      .required('Поле обязательно к заполнению'),
    email: Yup.string().email('Некорректный email адрес').required('Поле обязательно к заполнению'),
    password: Yup.string()
      .min(6, 'Минимум символов 6')
      .matches(/^[A-Za-z0-9]+$/, 'Только латиница')
      .required('Поле обязательно к заполнению'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  type FormUser = Yup.InferType<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm<FormUser>({mode: 'onBlur', resolver: yupResolver(userSchema)});

  const registerUser = async (user: User) => {
    await axios
      .post('http://localhost:3001/users', user)
      .then(() => dispatch(userAdded(user)))
      .then(() => successNotify('Вы успешно зарегистрированы'))
      .catch(() => errorNotify('Что-то пошло не так'));
  };

  const onSubmit = handleSubmit((userData) => {
    const user: User = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      id: uuidv4(),
    };

    const sameUser = users.find((item) => item.username === user.username || item.email === user.email);

    if (sameUser) {
      errorNotify('Такой пользователь уже существует');
    } else {
      registerUser(user);
    }

    reset();
  });

  return (
    <div className="form">
      <ToastContainer hideProgressBar position="top-center" theme="dark" />
      <h2 className="form__title">Регистрация пользователя:</h2>
      <form onSubmit={onSubmit}>
        <div className="form__group">
          <label>
            Имя пользователя:
            <input className="form__control" {...register('username')} />
          </label>
          {errors?.username && <p className="form__error">{errors?.username?.message || 'Ошибка!'}</p>}
        </div>
        <div className="form__group">
          <label>
            Email:
            <input className="form__control" {...register('email')} />
          </label>
          {errors?.email && <p className="form__error">{errors?.email?.message || 'Ошибка!'}</p>}
        </div>
        <div className="form__group">
          <label>
            Пароль: <input className="form__control" {...register('password')} />
          </label>
          {errors?.password && <p className="form__error">{errors?.password?.message || 'Ошибка!'}</p>}
        </div>
        <div className="form__group">
          <label>
            Повторите пароль: <input className="form__control" {...register('password2')} />
          </label>
          {errors?.password2 && <p className="form__error">{errors?.password2?.message || 'Ошибка!'}</p>}
        </div>
        <button className="btn" type="submit" disabled={!isValid}>
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default Register;
