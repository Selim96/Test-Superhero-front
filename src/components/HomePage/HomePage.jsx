import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import s from './HomePage.module.css';
import DeleteBtn from "../DeleteBtn";

function HomePage() {
    const [allHeros, setAllHeros] = useState([]);
    

    const toLoadAllHeros = async () => {
        try {
            const data = await api.fetchAllHeros();
            setAllHeros(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlDelete = async (id) => {
        api.superId = id;
        try {
            await api.fetchToDeleteHero();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        
        toLoadAllHeros();
    }, []);

    return (
        <>
        <ul className={s.gallery}>
            {allHeros.map(({ _id: id, nickname, images }) => (
                <li key={id} className={s.galleryItem}><Link to="id"><div className={s.galleryCard}>
                    <img src={`${images[0]}`} className={s.galleryImage} />
                    <p className={s.galleryNiclname}>{nickname}</p>
                    <button type="button" onClick={()=>handlDelete(id)} className={s.dltButton}>Delete</button>
                </div></Link></li>
            ))}
        </ul>
        </>
    )
}

export default HomePage;