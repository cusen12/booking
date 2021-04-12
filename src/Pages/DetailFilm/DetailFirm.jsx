import { useParams } from "react-router-dom";
import React from 'react';

function DetailFirm() { 
    let { filmId } = useParams(); 
    return (
        <div>
            <h1> trang details id là {filmId}</h1>
        </div>
    );
}

export default DetailFirm;