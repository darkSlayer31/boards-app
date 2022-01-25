import { useAppSelector, useAppDispatch } from "../../hooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { activeUserChanged } from "../../actions";
import { errorNotify } from "../Toaster";

interface UserData {
    username: string,
    password: string
}

const Login = () => {

    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state)
    const [userData, setUserData] = useState<UserData>(() => {
        return {
            username: '',
            password: ''
        }
    })

    const changeInputRegister = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = users.find(item => item.username === userData.username);
        if (userData.password !== user?.password) {
            errorNotify('Неверный пароль')
        } else {
            dispatch(activeUserChanged(user))
            localStorage.setItem('user', user.username)
        }
    }

    return (
        <div className="form">
            <h2 className="form__title">Войти</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form__group">
                    <p>Имя пользователя: <input className="form__control"
                        type="username"
                        id="login-username"
                        name="username"
                        value={userData.username}
                        onChange={changeInputRegister}
                    /></p>
                </div>
                <div className="form__group">
                    <p>Пароль: <input className="form__control"
                        type="password"
                        id="login-password"
                        name="password"
                        value={userData.password}
                        onChange={changeInputRegister}
                    /></p>
                </div>
                <button className="btn" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;