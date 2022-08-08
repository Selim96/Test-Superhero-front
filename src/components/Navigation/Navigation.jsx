import { NavLink } from "react-router-dom";
import s from './Navigation.module.css';

export default function Navigation() {
    return (
        <>
            <nav>                
                <NavLink exact="true" to='/' className={s.link}>Home</NavLink>
                <NavLink to='/newsuperhero' className={s.link}>Add</NavLink>
            </nav>
        </>
    )
}