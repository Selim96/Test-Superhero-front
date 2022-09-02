import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { toast} from 'react-toastify'
import api from "../../services/api";
import s from './HomePage.module.scss';
import * as selectors from "../../redux/superheros/selectors";
import { BaseURL } from "../../services/api";
import noImage from '../../images/noImage.webp';

// const imagesHost = "https://superheros-collection.herokuapp.com";
const imagesHost = `${BaseURL}`;

function HomePage() {

    const dispatch = useDispatch();

    const allHeros = useSelector(selectors.getHeros);
    const errors = useSelector(selectors.getError);
    const onLoading = useSelector(selectors.getLoader);

    const clickNext = () => {
        api.incrementPage();
        dispatch(api.fetchAllHeros());
    };

    const clickBefor = () => {
        api.decrementPage();
        dispatch(api.fetchAllHeros());
    };

    const handlDelete = async (id) => {
        api.superId = id;
        dispatch(api.fetchToDeleteHero(id));
        
        if (allHeros.dataLength === (api.page * 5 - 4) && allHeros.dataLength !== 1) {
            clickBefor();
        }
    }

    useEffect(() => {
        dispatch(api.fetchAllHeros());
        if (errors) {
            toast.error(`Error: ${errors}`);
        }
        
    }, [dispatch, errors, ]);

    const btnClassesBefor = [s.paginationBtn];
    const btnClassesNext = [s.paginationBtn];

    if (api.page < 2) {
    btnClassesBefor.push(s.disabled);
    }
    if (api.page === Math.ceil(allHeros.dataLength / 5)) {
        btnClassesNext.push(s.disabled);
        
    }

    return <>
        {errors && <h3 className="error">Something went wrong, update app.</h3>}
        {onLoading ? <h2 className="loader">Loading...</h2> :
        <div className={s.homePage}>
            <ul className={s.gallery}>
                {allHeros.heros.map(({ _id: id, nickname, images }) => {
                    const imageUrl = images.length !== 0 ? `${imagesHost}/${images[0]}` : noImage;
                    return (
                    <li key={id} className={s.galleryItem}>
                        <Link to={`${id}`} className={s.galleryCard}>
                            <img src={imageUrl} className={s.galleryImage} alt="Superhero poster" width={80} height='115'/>
                            <p className={s.galleryNickname}>{nickname}</p>
                        </Link>
                        <button type="button" onClick={() => handlDelete(id)} className={s.dltButton}>Delete</button>
                    </li>
                )})}
            </ul>
            {allHeros.dataLength > 5 && <div className={s.paginetion}>
                <button type="button" onClick={() => clickBefor()} className={btnClassesBefor.join(" ")} disabled={api.page < 2 ? true : false}>Befor</button>
                <button type="button" onClick={() => clickNext()} className={btnClassesNext.join(" ")} disabled={api.page === Math.ceil(allHeros.dataLength / 5) ? true : false}>Next</button>
            </div>}
        </div>}
        {allHeros.dataLength === 0 && setTimeout(() => {
            <h2 className="error">Any Superhero was not added to Collection</h2>
        }, 0) }
    </>
}

export default HomePage;