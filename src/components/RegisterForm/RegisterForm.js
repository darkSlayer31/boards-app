import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userAdded } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { validateUser } from "./utils";
import { errorNotify, successNotify } from "../Toaster";

import './register.scss';

const Register = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {users} = useSelector(state => state)

    const [userData, setUserData] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })

    const onChangeHandler = (e) => {
        setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const user = {
            ...userData,
            id: uuidv4()
        }

        const sameUser = users.find(item => item.username === user.username || item.email === user.email)

        if (sameUser) {
            errorNotify('Такой пользователь уже существует')
        } else if (validateUser(user)) {
            await request("http://localhost:3001/users", "POST", JSON.stringify(user))
                .then(() => dispatch(userAdded(user)))
                .then(() => successNotify('Вы успешно зарегистрированы'))
                .catch(() => errorNotify('Что-то пошло не так'))
        }

        setUserData({
            username: "",
            email: "",
            password: "",
            password2: "",
        })
    }

    return (
        <div className="form">
            <ToastContainer hideProgressBar={true} position="top-center" theme="dark"/>
            <h2 className="form__title">Регистрация пользователя:</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form__group">
                    <p>Имя пользователя: <input className="form__control"
                        type="username"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={onChangeHandler}
                        /></p>
                </div>
                <div className="form__group">
                    <p>Email: <input className="form__control"
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={onChangeHandler}
                        formNoValidate
                        /></p>
                </div>
                <div className="form__group">
                    <p>Пароль: <input className="form__control"
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={onChangeHandler}
                        /></p>
                </div>
                <div className="form__group">
                    <p>Повторите пароль: <input className="form__control"
                    type="password"
                    id="password2"
                    name="password2"
                    value={userData.password2}
                    onChange={onChangeHandler}
                        /></p>
                </div>
                <button className="btn" type="submit">Регистрация</button>
            </form>
        </div>
    )
}

export default Register;