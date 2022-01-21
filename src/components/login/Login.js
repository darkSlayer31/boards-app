import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { activeUserChanged } from "../../actions";
import { errorNotify } from "../Toaster";


const Login = () => {

    const dispatch = useDispatch();
    const {users} = useSelector(state => state)
    const [userData, setUserData] = useState(() => {
        return {
            username: '',
            password: ''
        }
    })

    const changeInputRegister = (e) => {
        setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const user = users.find(item => item.username === userData.username);
        if (userData.password !== user.password) {
            errorNotify('Неверный пароль')
        } else {
            dispatch(activeUserChanged(user))
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