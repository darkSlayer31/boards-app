import validator from "validator"
import { warningNotify } from "../Toaster";
import { User } from "../../types/types";

const validateUser = (user: User) => {
    if (validator.isEmpty(user.username)) {
        warningNotify("Вы не ввели имя пользователя")
    } else if (!validator.isEmail(user.email)) {
        warningNotify("Некорректный email")
    } else if (user.password !== user.password2) {
        warningNotify("Пароли не совпадают")
    } /* else if (!validator.isStrongPassword(user.password, {minSymbols: 0})) {
        //alert("Минимальная длина пароля 8 символов. Пароль должен включать в себя как минимум одну заглавную букву и одну цифру")
        warningNotify("Минимальная длина пароля 8 символов. Пароль должен включать в себя как минимум одну заглавную букву и одну цифру")
    } */ else {
        return true
    }
}

export {
    validateUser
}