import s from './Appbar.module.scss';
import Navigation from '../Navigation';

export default function Appbar() {
    return <>
        <header className={s.header}>
            <Navigation />
            <p className={s.title}>Superheros Collection</p>
        </header>
    </>
}