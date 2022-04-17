import {toast} from 'react-toastify';

const errorNotify = (text = 'Что-то пошло не так') => toast.error(text);
const successNotify = (text: string) => toast.success(text);
const warningNotify = (text: string) => toast.warning(text);

export {errorNotify, successNotify, warningNotify};
