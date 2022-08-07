import api from "../../services/api";
import s from "./DeleteBtn.module.css";

function DeleteBtn({ fetchFunc, id }) {
    api.superId = id;
    const handlDelete = async () => {
        try {
            await fetchFunc();
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <button type="button" onClick={handlDelete} className={s.button}>Delete</button>
    )
}

export default DeleteBtn;