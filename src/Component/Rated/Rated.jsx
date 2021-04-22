import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Rated() {
    const [rated, setRated] = useState()
     
    useEffect(()=>{
        const fetchRated = async () => {
            const respond = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=cd58c7bd131cba3c391d62c5fda2ae53&language=en-US&page=1');
            const respondJson = await respond.json();  
            await setRated(respondJson.results);   
        }
        fetchRated();  
    },[]) 
   
    return (
        <>
            {rated ? rated.map((data)=>
                <Grid sm={12} item key={data.id}>
                    <Link to="/"><img src={"https://image.tmdb.org/t/p/w300"+data.backdrop_path} width="100%"  alt="" /></Link>
                </Grid> 
            ): ""} 
        </>
    );
}

export default Rated;