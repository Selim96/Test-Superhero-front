import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast} from 'react-toastify'
import api from "../../services/api";
import s from './HomePage.module.css';

import noImage from '../../images/noImage.webp';
const imagesHost = "https://superheros-collection.herokuapp.com";

function HomePage() {
    const [allHeros, setAllHeros] = useState([]);
    const [onDelete, setOnDelete] = useState(true);
    const [length, setLength] = useState(0);
    const [onLoading, setOnLoading] = useState(false);
    const [error, setError] = useState(false);

    const toLoadAllHeros = async () => {
        try {
            const objectData = await api.fetchAllHeros();
            setError(false);
            setAllHeros(objectData.data.result);
            setLength(objectData.data.dataLength);
            setOnLoading(false);
        } catch (error) {
            toast.error("Server Error");
            console.log(error.message);
            setError(true);
            setOnLoading(false);
        }
    };

    const clickNext = () => {
        api.incrementPage();
        toLoadAllHeros();
    };

    const clickBefor = () => {
        api.decrementPage();
        toLoadAllHeros();
    };

    const handlDelete = async (id) => {
        api.superId = id;
        if (length === (api.page * 5 - 4)) {
            api.decrementPage();
        }
        try {
            await api.fetchToDeleteHero();
        } catch (error) {
            toast.error('Server Error');
            console.log(error.message);
        }
        setOnDelete(!onDelete);
    }

    useEffect(() => {
        setOnLoading(true)
        toLoadAllHeros();
    }, [onDelete]);

    const btnClassesBefor = [s.paginationBtn];
    const btnClassesNext = [s.paginationBtn];

    if (api.page < 2) {
    btnClassesBefor.push(s.disabled);
    }
    if (api.page === Math.ceil(length / 5)) {
        btnClassesNext.push(s.disabled);
        
    }

    return <>
        {error && <h3 className="error">Something went wrong, update app.</h3>}
        {onLoading && <h2 className="loader">Loading...</h2> }
        {!onLoading && length === 0 ? <h2 className="error">Any Superhero was not added to Collection</h2> : 
        <div className={s.homePage}>
            <ul className={s.gallery}>
                {allHeros.map(({ _id: id, nickname, images }) => {
                    const imageUrl = images.length !== 0 ? `${imagesHost}/${images[0]}` : noImage;
                    return (
                    <li key={id} className={s.galleryItem}>
                        <Link to={`${id}`} className={s.galleryCard}>
                            <img src={imageUrl} className={s.galleryImage} alt="Superhero poster"/>
                            <p className={s.galleryNickname}>{nickname}</p>
                        </Link>
                        <button type="button" onClick={() => handlDelete(id)} className={s.dltButton}>Delete</button>
                    </li>
                )})}
            </ul>
            {length > 5 && <div className={s.paginetion}>
                <button type="button" onClick={() => clickBefor()} className={btnClassesBefor.join(" ")} disabled={api.page < 2 ? true : false}>Befor</button>
                <button type="button" onClick={() => clickNext()} className={btnClassesNext.join(" ")} disabled={api.page === Math.ceil(length / 5) ? true : false}>Next</button>
            </div>}
        </div>}
    </>
}

export default HomePage;