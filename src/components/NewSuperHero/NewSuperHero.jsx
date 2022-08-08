import { useState } from 'react';
import api from '../../services/api';
import {toast} from 'react-toastify'
import s from './NewSuperHero.module.css';

function NewSuperHero() {
    const [nickname, setNickname] = useState("");
    const [realName, setRealName] = useState("");
    const [superpowers, setSuperpowers] = useState("");
    const [catchPhrase, setCatchPhrase] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState({});
    const objectToSend = {
        nickname,
        real_name: realName,
        superpowers,
        catch_phrase: catchPhrase,
        origin_description: description,
        images
    }

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

    const handlFetch = async () => {
        try {
            const result = await api.fetchToCreate(objectToSend);
            console.log(result)
            toast.error("Oops! Check form!")
        } catch (error) {
            console.log(error.message)
            toast.error("Oops! Check form!")
        }
    }

    const handlSubmit = e => {
        e.preventDefault();
        handlFetch();
    
        setNickname("");
        setRealName("");
        setSuperpowers("");
        setCatchPhrase("");
        setDescription("");
        setImages({});
        console.log(toast)
        toast("Superhero was added successfuly!")
    }
    
    return (
        <div className={s.addPage}>
            <h3 className={s.title}>Please, enter Information to add Superhero</h3>
            <form action='' id='add-superhero' encType='multipart/form-data' className={s.addForm} onSubmit={handlSubmit}>
                <div className={s.inputBox}>
                    <input type='text' name='nickname' value={nickname}  placeholder="Nickname" className={s.addFormInput} required pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" onChange={handlChange}/>
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

                <div>
                    <label className={s.addFormLable}>Choose Images</label>
                    <input name='images' type='file' files={images} multiple onChange={handlChange}/>
                </div>

                <button type='submit' className={s.submitBtn} >Add Hero</button>
            </form>
        </div>
    )
}

export default NewSuperHero;