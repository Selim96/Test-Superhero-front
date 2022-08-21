import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import s from './SuperHeroInfo.module.scss';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as selectors from "../../redux/superheros/selectors";
import { toClearHero } from '../../redux/superheros/actions';
import { BaseURL } from "../../services/api";

const imagesHost = `${BaseURL}`;

function SuperHeroInfo() {
    const [newImages, setNewImages] = useState([]);

    const dispatch = useDispatch();
    const superHero = useSelector(selectors.getHeroInfo);
    const onLoading = useSelector(selectors.getLoader);
    const error = useSelector(selectors.getError);

    const { superId } = useParams();

    const formData = new FormData();
        formData.append("images", newImages);

    const deleteImage = async (image) => {
        formData.append("imageToDelete", image);
        dispatch(api.fetchToEditImages(formData));
    };

    const handlChange = e => {
        setNewImages(e.currentTarget.files[0]);
    };

    const handlSubmit = e => {
        e.preventDefault();

        dispatch(api.fetchToEditImages(formData));
        setNewImages([]);
    }

    useEffect(() => {
        api.superId = superId;
        dispatch(api.fetchById(superId));
        
        if (error) {
            toast.error(`Error: ${error}`);
        }

        return function cleanup() {
            dispatch(toClearHero());
        }; 
    }, [dispatch, superId, error]);

    const { nickname, real_name, images, origin_description, superpowers, catch_phrase } = superHero;

    const btnClasses = [s.submitBtn];
    
    if (newImages.length === 0) {
        btnClasses.push(s.disabled);
    }
    
    return <>
        {onLoading ? <h2 className="loader">Loading...</h2> :
        <div className={s.superCard}>
            <h2 className={s.title}>Information about <span className={s.titleNickname}>{nickname}</span></h2>
            <ul>
                <li className={s.superCardItem}>Nickname: <div className={s.superCardSpan}>{nickname}</div></li>
                <li className={s.superCardItem}>Real name: <div className={s.superCardSpan}>{real_name}</div> </li>
                <li className={s.superCardItem}>Superpower: <div className={s.superCardSpan}>{superpowers}</div> </li>
                <li className={s.superCardItem}>Description: <div className={s.superCardSpan}>{origin_description}</div> </li>
                <li className={s.superCardItem}>Catch phrase: <div className={s.superCardSpan}>{catch_phrase}</div> </li>
            </ul>
            {images && images.length !== 0 &&
            <div className={s.gallery}>
                <h3 className={s.galleryTitile}>Gallery</h3>
                <ul className={s.galleryList}>
                    {images.map(image => (
                        <li key={uuidv4()} className={s.galleryItem}>
                            <img src={`${imagesHost}/${image}`} className={s.galleryImage} alt={`pictures of ${nickname}`}/>
                            <button type='button' className={s.galleryButton} onClick={() => deleteImage(image)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>}
            <form id='add-images' encType='multipart/form-data' className={s.addImageForm} onSubmit={handlSubmit}>
                <h4 className={s.formTitle}>Choose images to add</h4>
                <label htmlFor="imageInput" className={s.addFileLable}>Choose Images</label>
                <input id='imageInput' name='images' type='file'  multiple onChange={handlChange} className={s.fileInput}/>
                <button type='submit' disabled={newImages.length === 0 ? true : false} className={btnClasses.join(" ")}>Add images</button>
            </form>
        </div>}
    </>
}

export default SuperHeroInfo;