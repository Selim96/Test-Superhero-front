import React, {lazy, Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import Appbar from "./Appbar";
import Container from "./Container";
const HomePage = lazy(() => import("./HomePage" /*webpackChankName: "home-view" */));
const SuperHeroInfo = lazy(() => import("./SuperHeroInfo"));
const NewSuperHero = lazy(() => import('./NewSuperHero'));
const NotFoundView = lazy(() => import('./NotFoundView/NotFoundView'));

function App() {
    return <div>
        <Appbar />
        
        <Suspense fallback={<h2>Loading...</h2>}>   
            <Routes>
                <Route path="/" element={<HomePage />} exact/>
                    
                <Route path="/:superId" element={<SuperHeroInfo />}/>
                    
                <Route path="/newsuperhero" element={<NewSuperHero/>} exact />
                    
                <Route element={<NotFoundView />} />
                
            </Routes>
        </Suspense>
    </div>
}

export default App;