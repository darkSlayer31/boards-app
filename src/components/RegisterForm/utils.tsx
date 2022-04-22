import validator from 'validator';
import {warningNotify} from '../Toaster';
import {User} from '../../types/types';

const validateUser = (user: User) => {
  if (validator.isEmpty(user.username)) {
    warningNotify('Вы не ввели имя пользователя');
  } else if (!validator.isEmail(user.email)) {
    warningNotify('Некорректный email');
  } else if (user.password !== user.password2) {
    warningNotify('Пароли не совпадают');
  } else {
    return true;
  }
};

export default validateUser;
