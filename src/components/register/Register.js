import { useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator"
import { v4 as uuidv4 } from "uuid";

import { activeUserChanged, userAdded } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

import './register.scss';

const Register = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",

        }
    })

    const changeInputRegister = (e) => {
        e.preventDefault();
        setRegister(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const user = {
            ...register,
            id: uuidv4()
        }
        if (validator.isEmpty(user.username)) {
            alert("Вы не ввели имя пользователя")
        } else if (!validator.isEmail(user.email)) {
            alert("Вы не ввели email")
        } else if (user.password !== user.password2) {
            alert("Пароли не совпадают")
        } else if (!validator.isStrongPassword(user.password, {minSymbols: 0})) {
            alert("Минимальная длина пароля 8 символов. Пароль должен включать в себя как минимум одну заглавную букву и одну цифру")
        } else {
            //ДОЛЖНА БЫТЬ ПРОВЕРКА ЕСТЬ ЛИ УЖЕ ТАКОЙ ПОЛЬЗОВАТЕЛЬ
            console.log(user, "успешно")
            // request("http://localhost:3001/users", "POST", JSON.stringify(user))
            //     .then(res => console.log(res, "Отправка успешна"))
            //     .then(dispatch(userAdded(user)))
            //     .catch(err => console.log(err))
        }
    }

    return (
        <div className="form">
            <h2 className="form__title">Регистрация пользователя:</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form__group">
                    <p>Имя пользователя: <input className="form__control"
                        type="username"
                        id="username"
                        name="username"
                        value={register.username}
                        onChange={changeInputRegister}
                        /></p>
                </div>
                <div className="form__group">
                    <p>Email: <input className="form__control"
                        type="email"
                        id="email"
                        name="email"
                        value={register.email}
                        onChange={changeInputRegister}
                        formNoValidate
                        /></p>
                </div>
                <div className="form__group">
                    <p>Пароль: <input className="form__control"
                        type="password"
                        id="password"
                        name="password"
                        value={register.password}
                        onChange={changeInputRegister}
                        /></p>
                </div>
                <div className="form__group">
                    <p>Повторите пароль: <input className="form__control"
                    type="password"
                    id="password2"
                    name="password2"
                    value={register.password2}
                    onChange={changeInputRegister}
                        /></p>
                </div>
                <button className="btn" type="submit">Регистрация</button>
            </form>
        </div>
    )
}

export default Register;