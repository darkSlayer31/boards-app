import { toast } from 'react-toastify';

const errorNotify = (text = 'Что-то пошло не так') => toast.error(text);
const successNotify = (text) => toast.success(text);
const warningNotify = (text) => toast.warning(text);

export {
    errorNotify,
    successNotify,
    warningNotify
}