import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Container, Grid } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import './hero.scss';

function Hero() {
    const [ movieImage, setMovie] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
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
            <br/>
            <br/>
            <Container className="hero-page">
                <Slider {...settings}>
                    {movieImage.map((data) =>
                        <div key={data.maPhim} className="item"> 
                            <Grid
                                container
                                justify="space-between"
                            >
                                <Grid item sm={9}
                                    container
                                >
                                    <div className="img">
                                        <img src={data.hinhAnh} alt=""/>
                                        <div className="icon">
                                            <a href={data.trailer} target="_blank" rel="noreferrer noopener"><PlayCircleOutlineIcon color="primary" className="play-youtube"/></a>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid className="right-hero" item sm={3}
                                    container
                                    justify="flex-start" 
                                    direction="column"
                                >
                                    <h3>{data.tenPhim}</h3>
                                    <p><b>Miêu tả</b> : <em>{data.moTa}</em></p>
                                    <p><b>Ngày khởi chiếu</b> : <em>{data.ngayKhoiChieu}</em></p>
                                    <p><b>Đánh giá</b> : <em>{data.danhGia}/10</em></p>
                                </Grid>
                            </Grid>
                        </div> 
                    )} 
                </Slider>
            </Container>
        </>
    );
}

export default Hero;