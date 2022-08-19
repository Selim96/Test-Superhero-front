import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { toast} from 'react-toastify'
import s from './NewSuperHero.module.scss';
import * as selectors from "../../redux/superheros/selectors";


function NewSuperHero() {
    const [nickname, setNickname] = useState("");
    const [realName, setRealName] = useState("");
    const [superpowers, setSuperpowers] = useState("");
    const [catchPhrase, setCatchPhrase] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const superHero = useSelector(selectors.getHeroInfo);
    const error = useSelector(selectors.getError);

    const handlChange = e => {

        switch (e.currentTarget.name) {
        case 'nickname':
            setNickname(e.currentTarget.value);
            break;
        
        case 'real_name':
            setRealName(e.currentTarget.value);
            break;
        
        case 'superpower':
            setSuperpowers(e.currentTarget.value);
            break;
        
        case 'catch_phrase':
            setCatchPhrase(e.currentTarget.value);
            break;
        
        case 'description':
            setDescription(e.currentTarget.value);
            break;
        
        case 'images':
            setImages(e.currentTarget.files[0]);
            break;
        
        default:
            break;
        }
    };

    const handlSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("real_name", realName);
        formData.append("superpowers", superpowers);
        formData.append("catch_phrase", catchPhrase);
        formData.append("origin_description", description);
        if (images.length !== 0) {
            formData.append("images", images);
        }

        dispatch(api.fetchToCreate(formData));
        toast.success("Superhero was added successfuly!");
        // navigate(`/${superHero._id}`, { replace: true });
        if (error) {
            toast.error(error);
        }

        setNickname("");
        setRealName("");
        setSuperpowers("");
        setCatchPhrase("");
        setDescription("");
        setImages([]);
        //     catch(error => {
            
        //     const words = error.message.split(" ");
        //     if (words.includes("500")) {
        //         toast.error(`${nickname} is already in collection!`);
        //     }
        // });
    };
    
    return (
        <div className={s.addPage}>
            <h3 className={s.title}>Please, enter Information to add Superhero</h3>
            <form action='' id='add-superhero' encType='multipart/form-data' className={s.addForm} onSubmit={handlSubmit}>
                <div className={s.inputBox}>
                    <input type='text' name='nickname' value={nickname}  placeholder="Nickname" className={s.addFormInput} required  onChange={handlChange}/>
                </div>

                <div className={s.inputBox}>
                    <input type='text' name='real_name' value={realName} placeholder="Real name" className={s.addFormInput} required onChange={handlChange}/>
                </div>

                <div className={s.inputBox}>
                    {/* <label className={s.addFormLable}>Nickname</label> */}
                    <input type='text' name='superpower' value={superpowers} placeholder="Superpower" className={s.addFormInput} required onChange={handlChange}/>
                </div>

                <div className={s.inputBox}>
                    <textarea type='text' name='description' value={description} placeholder="Description" className={s.addFormInput} required onChange={handlChange}/>
                </div>

                <div className={s.inputBox}>
                    <input type='text' name='catch_phrase' value={catchPhrase} placeholder="Catch phrase" className={s.addFormInput} required onChange={handlChange}/>
                </div>

                <div className={s.fileInputBox}>
                    <label for="fileLoader" className={s.addFileLable}>Choose Images</label>
                    <input id='fileLoader' name='images' type='file' files={images} multiple onChange={handlChange} className={s.fileInput} />
                </div>

                <button type='submit' className={s.submitBtn} >Add Hero</button>
            </form>
        </div>
    )
}

export default NewSuperHero;