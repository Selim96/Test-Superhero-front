import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import s from './SuperHeroInfo.module.css';
import api from '../../services/api';
import noImage from '../../images/noImage.webp';
const imagesHost = "https://superheros-collection.herokuapp.com";

function SuperHeroInfo() {
    const [superHero, setSuperHero] = useState({});

    const { superId } = useParams();
    const fetchSuperHero = async () => {
        api.superId = superId;
        const result = await api.fetchById();
        setSuperHero(result.data);
    }
    useEffect(() => {
        fetchSuperHero();
    }, [superId])

    console.log(superHero)
    const {nickname, real_name, images, origin_description, superpowers, catch_phrase } = superHero;
    return <>
        {Object.keys(superHero).length === 0 ? <h2>Loading...</h2> :
        <div className={s.superCard}>
            <h2 className={s.title}>Information about <span className={s.titleNickname}>{nickname}</span></h2>
            <ul>
                <li className={s.superCardItem}><span className={s.superCardSpan}>Nickname:</span> {nickname}</li>
                <li className={s.superCardItem}><span className={s.superCardSpan}>Real name:</span> {real_name}</li>
                <li className={s.superCardItem}><span className={s.superCardSpan}>Superpower:</span> {superpowers}</li>
                <li className={s.superCardItem}><span className={s.superCardSpan}>Description:</span> {origin_description}</li>
                <li className={s.superCardItem}><span className={s.superCardSpan}>Catch phrase:</span> {catch_phrase}</li>
            </ul>
            {images.length !== 0 &&
            <div className={s.gallery}>
                <h3 className={s.galleryTitile}>Gallery</h3>
                <ul className={s.galleryList}>
                    {images.map(image => (
                        <li className={s.galleryItem}>
                            <img src={`${imagesHost}/${image}`} className={s.galleryImage} alt={`pictures of ${nickname}`}/>
                            <button type='button' className={s.galleryButton}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button type='button'>Add images</button>
            </div>}
        </div>}
    </>
}

export default SuperHeroInfo;