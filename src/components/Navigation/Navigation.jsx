import { NavLink } from "react-router-dom";
import s from './Navigation.module.css';

export default function Navigation() {
    return (
        <>
            <nav>                
                <NavLink exact="true" to='/' className={s.link} activeClassName={s.activeLink}>Home</NavLink>
                <NavLink to='/newsuperhero' className={s.link} activeClassName={s.activeLink}>Add</NavLink>
            </nav>
        </>
    )
}