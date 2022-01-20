import Register from "../register/Register";
import Login from "../login/Login";

import './authorization.scss'

const Authorization = () => {
    return (
        <div className="authorization">
            <Register/>
            <Login/>
        </div>
    )
}

export default Authorization;