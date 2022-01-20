import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { activeUserChanged } from "../../actions";


const Login = () => {

    const dispatch = useDispatch();
    const {users} = useSelector(state => state)
    const [loginUser, setLoginUser] = useState(() => {
        return {
            username: '',
            password: ''
        }
    })

    const changeInputRegister = (e) => {
        e.preventDefault();
        setLoginUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const user = users.find(item => item.username === loginUser.username);
        console.log(user)
        if (loginUser.password !== user.password) {
            alert("Неверный пароль")
        } else {
            console.log('вход успешен')
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
                        value={loginUser.username}
                        onChange={changeInputRegister}
                        /></p>
                </div>
                <div className="form__group">
                    <p>Пароль: <input className="form__control"
                        type="password"
                        id="login-password"
                        name="password"
                        value={loginUser.password}
                        onChange={changeInputRegister}
                        /></p>
                </div>
                <button className="btn" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;