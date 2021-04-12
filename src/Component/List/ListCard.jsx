import { Button, ButtonGroup, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CardItemMovie from '../CardItemMovie/CardItemMovie';

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
            const respond = await fetch(`https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?soTrang=${currentPage}&soPhanTuTrenTrang=12`);
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
            <Grid
                container
                justify="space-between"
                > 
                    <CardItemMovie itemMovie={itemMovie}/> 
                </Grid>
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button disabled={currentPage === 1 ? true : false} onClick={handlePrevPage}>Pre</Button>
                    <Button disabled={currentPage === totalPage ? true : false} onClick={handleNextPage}>Next</Button>
                </ButtonGroup>
           </Container>
        </>
    );
}

export default ListCard;