import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import s from './HomePage.module.css';

import noImage from '../../images/noImage.webp';
const imagesHost = "https://superheros-collection.herokuapp.com";

function HomePage() {
    const [allHeros, setAllHeros] = useState([]);
    const [onDelete, setOnDelete] = useState(true);

    const toLoadAllHeros = async () => {
        try {
            const data = await api.fetchAllHeros();
            console.log(data)
            setAllHeros(data.data);
        } catch (error) {
            console.log(error.message);
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
        try {
            await api.fetchToDeleteHero();
        } catch (error) {
            console.log(error.message);
        }
        setOnDelete(!onDelete);
    }

    useEffect(() => {
        toLoadAllHeros();
    }, [onDelete]);

    return (
        <div className={s.homePage}>
            <ul className={s.gallery}>
                {allHeros.map(({ _id: id, nickname, images }) => {
                    const imageUrl = images.length !== 0 ? `${imagesHost}/${images[0]}` : noImage;
                    return (
                    <li key={id} className={s.galleryItem}>
                        <Link to={`${id}`}>
                            <div className={s.galleryCard}>
                                <img src={imageUrl} className={s.galleryImage} alt="Superhero poster"/>
                                <p className={s.galleryNiclname}>{nickname}</p>
                            </div>
                        </Link>
                        <button type="button" onClick={() => handlDelete(id)} className={s.dltButton}>Delete</button>
                    </li>
                )})}
            </ul>
            <div className={s.paginetion}>
                <button type="button" onClick={() => clickBefor()} className={s.btn_befor}>Befor</button>
                <button type="button" onClick={() => clickNext()} className={s.btn_next}>Next</button>
            </div>
        </div>
    )
}

export default HomePage;