import RegisterForm from "../RegisterForm";
import Login from "../Login";

import './authorization.scss'

const Authorization = () => {
  return (
    <div className="authorization">
      <RegisterForm />
      <Login />
    </div>
  )
}

export default Authorization;