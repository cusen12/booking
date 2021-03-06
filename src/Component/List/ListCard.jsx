import { Button, ButtonGroup, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CardItemMovie from '../CardItemMovie/CardItemMovie';
import Hero from '../Hero/Hero'; 
import Rated from '../Rated/Rated';
import './ListCard.scss'

function ListCard() {
    const [itemMovie, setitemMovie] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(); 
    const handleNextPage = () =>{ 
        setcurrentPage(currentPage + 1) 
    }
    const handlePrevPage = () =>{
        setcurrentPage(currentPage - 1) 
    }
    useEffect(()=>{
        const listMoviePagination = async () => {
            const respond = await fetch(`https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?soTrang=${currentPage}&soPhanTuTrenTrang=32`);
            const respondJson = await respond.json();
            setitemMovie(respondJson.items);
            setTotalPage(respondJson.totalPages); 
            return respondJson;
        }
        listMoviePagination();
    },[currentPage]);  
    return (
        <> 
            <Container>
                <Hero/>
                <Grid container
                    justify="space-between"
                    alignItems="flex-start">
                    <Grid item md={10} spacing={2}
                        container
                        direction="column"
                        wrap="wrap"
                        justify="space-between"
                        >  <Typography variant="h3" align="left" color="primary" className="bTittle"> Phim mới</Typography>
                            <Grid item md={12}  container
                                    direction="row"
                                    wrap="wrap"
                                    justify="space-between">
                                 
                                <CardItemMovie itemMovie={itemMovie}/> 
                            </Grid>
                            <Grid
                              container 
                              justify="center">
                                <ButtonGroup disableElevation variant="contained" color="primary">
                                    <Button color="primary" disabled={currentPage === 1 ? true : false} onClick={handlePrevPage}>Pre</Button>
                                    <Button color="primary" disabled={currentPage === totalPage ? true : false} onClick={handleNextPage}>Next</Button>
                                </ButtonGroup>
                            </Grid>
                    </Grid>
                    
                    <Grid item md={2} spacing={2}
                        container
                        direction="column"
                        justify="space-between"
                        > 
                           <Grid container
                                direction="column"
                                wrap="wrap"
                                justify="space-between">
                                <Typography variant="h3"align="center" color="primary" className="bTittle top-rated"> Top Rated </Typography>
                                <Grid item md={12}  container
                                    direction="row"
                                    wrap="wrap"
                                    justify="space-between">  
                                    <Rated/>
                            </Grid>
                           </Grid>
                    </Grid> 
                    
                </Grid>
            </Container>
           
        </>
    );
}

export default ListCard;