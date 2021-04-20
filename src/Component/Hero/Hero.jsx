import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button, Container, Grid, Typography } from '@material-ui/core'; 
import './hero.scss';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

function Hero() {
    const [ movieImage, setMovie] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
    };
    useEffect(()=>{
        const fetchMovie = async () => {
            const respond = await fetch('https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?soTrang=1&soPhanTuTrenTrang=5');
            const respondJson = await respond.json();  
            setMovie(respondJson.items);  
        }
        fetchMovie(); 
          
    },[])   
    return (
        <>   
            <Container className="hero-page" style={{padding:"0",paddingTop:"55px"}}>
                <Grid className="banner" container
                    justify="flex-start"
                >  
                    <Grid container item sm={6} style={{display:"block"}}>
                        <Slider {...settings}>
                            {movieImage.map((data) =>
                                <div key={data.maPhim} className="item"> 
                                    <Grid
                                        container
                                        justify="space-between"
                                    >
                                        <Grid item
                                            container
                                        > 
                                            <div className="content">
                                                <Typography variant="h3" color="secondary">{data.tenPhim}</Typography>
                                                <p><b>Miêu tả</b> : <em>{data.moTa}</em></p>
                                                <p><b>Ngày khởi chiếu</b> : <em>{data.ngayKhoiChieu}</em></p>
                                                <p><b>Đánh giá</b> : <em>{data.danhGia}/10</em></p>
                                            
                                                <Button variant="text" color="primary">
                                                <PlayCircleOutlineIcon color="secondary"/><a href={data.trailer} target="_blank" rel="noreferrer noopener">
                                                    Trailer 
                                                    </a>
                                                </Button> 
                                            </div>
                                        </Grid>
                                        
                                    </Grid>
                                </div> 
                            )} 
                        </Slider>
                    </Grid>
                    <Grid container item sm={6} className="quick-book">
                        <Typography variant="h3" color="secondary">Đặt vé nhanh</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Hero;