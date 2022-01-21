import Register from "../Register";
import Login from "../Login";

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