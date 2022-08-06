import { useState, useEffect } from "react";
import { Link, useMatch, useLocation } from "react-router-dom";
import api from "../services/api";
import s from './HomePage.module.css';

function HomePage() {
    const [allHeros, setAllHeros] = useState([]);
    const match = useMatch("/id");
    const location = useLocation();

    const toLoadAllHeros = async () => {
        try {
            const data = await api.fetchAllHeros();
            setAllHeros(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        console.log(match)
        console.log(location)
        toLoadAllHeros();
    }, []);

    return (
        <>
        <ul className={s.gallery}>
            {allHeros.map(({ _id: id, nickname, images }) => (
                <li key={id} className={s.gallery_item}><Link to={"/"}><div className={s.gallery_card}>
                    <img src={images[0]} />
                    <p>{nickname}</p>
                    
                </div></Link></li>
            ))}
        </ul>
        </>
    )
}

export default HomePage;