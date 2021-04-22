import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button, Container, Grid, Typography } from '@material-ui/core'; 
import './hero.scss';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

function Hero() { 
    const [ movie, setMovie] = useState([]); 
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
    const fullDayMY = (date) =>{
        const d = new Date(date)
       return  d.getDate()+ "-" + d.getMonth()+"-" + d.getFullYear()
    }
    useEffect(()=>{
        const fetchMovie = async () => {
            const respond = await fetch('https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?soTrang=1&soPhanTuTrenTrang=8');
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
                            {movie.map((data) =>
                                <div key={data.maPhim} className="item"> 
                                    <Grid
                                        container
                                        justify="space-between"
                                    >
                                        <Grid
                                            container
                                        > 
                                            <div className="content">
                                                <Typography variant="h3" color="secondary">{data.tenPhim}</Typography>
                                                <p><b>Miêu tả</b> : <em>{data.moTa}</em></p>
                                                <p><b>Ngày khởi chiếu</b> : <em>{fullDayMY(data.ngayKhoiChieu)}</em></p>
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
                    <Grid container
                     item 
                     sm={6}
                     alignItems="flex-start"
                     className="quick-book">
                        <Typography variant="h3" color="secondary">Phim nổi bật</Typography>  
                        <Grid container item sm={12} spacing={2}> 
                            {movie.map((dataItem)=>
                                <Grid container item sm={3} key={dataItem.maPhim} >
                                    <img src={dataItem.hinhAnh} alt={dataItem.moTa} height="48%"/>
                                </Grid>  
                            )} 
                        </Grid> 
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Hero;