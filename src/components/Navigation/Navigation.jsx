import { NavLink } from "react-router-dom";
import s from './Navigation.module.css';

export default function Navigation() {
    return (
        <>
            <nav>                
                <NavLink exact="true" to='/superheros' className={s.link} activeClassName={s.activeLink}>Home</NavLink>
                <NavLink to='/superheros/newsuperhero' className={s.link} activeClassName={s.activeLink}>Add</NavLink>
            </nav>
        </>
    )
}