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
        <div className="backgraud"></div>
        <Container>
        <Suspense fallback={<h2 className="loader">Loading...</h2>}>   
            <Routes>
                <Route path="/" element={<HomePage/>} exact/>
                    
                <Route path="/:superId" element={<SuperHeroInfo />} exact/>
                    
                <Route path="/newsuperhero" element={<NewSuperHero/>} exact />
                    
                <Route element={<NotFoundView />} />
                
            </Routes>
        </Suspense>
        </Container>
    </div>
}

export default App;