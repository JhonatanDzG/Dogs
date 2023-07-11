import "./landingPage.css";
import React, { useEffect } from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

//import{
//getDogs,
//    getTemperaments
//} from '../../../../api/src/controllers/index'

import { getDogs, getTemperaments} from '../../../../api/src/controllers/index.js';



export default function LandingPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlerSubmit = (event)  => {
        props.login();
        navigate("/home")   
    }

    useEffect(()=> {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    return (
        <LandingPage>
            <div className="container">

            </div>
        </LandingPage>
    );
}
