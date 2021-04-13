import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, Grid } from "@material-ui/core";
import './details.scss'

function DetailFirm() { 
    const [data, setData] = useState([])
    const [dayNuber ,setDay] = useState();
    let { filmId } = useParams();  
    const fullDayMY = (date) =>{
        const d = new Date(date)
       return  d.getHours() + "h" + d.getMinutes() +
        "  " + d.getDate()+ "-" + d.getMonth()+"-" + d.getFullYear()
    }
    useEffect(() =>{
        const getData = async () =>{
            const respond = await fetch(`https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`);
            const respondJson = await respond.json();
            await setData(respondJson); 
            const setday = new Date(respondJson.ngayKhoiChieu)
            setDay(setday.getDate()+"-"+setday.getMonth()+"-"+setday.getFullYear())
        }
        getData();
    },[filmId])   
    return (
        <>
            <Container className="details-film">
                <Grid
                container
                direction="row"
                justify="flex-start" spacing={2}>
                    <Grid item sm={8}>
                        {data.trailer ? <iframe width="100%" height="315" src={data.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : <Skeleton/>}
                    </Grid>
                    <Grid item sm={4}> 
                        <h1>{data.tenPhim ? data.tenPhim : <Skeleton variant="text" />} </h1>
                        <p><b>Mô tả: </b>{data.moTa ? data.moTa : <Skeleton variant="text" />} </p>
                        <p><b>Ngày chiếu: </b> {dayNuber ? dayNuber : <Skeleton variant="text" />} </p>
                        <p><b>Đánh giá</b> {data.danhGia ? `${data.danhGia}/10` : <Skeleton variant="text" />}</p>
                    </Grid>
                </Grid> 
                <Grid container
                justify="flex-start">
                    {data.lichChieu ? data.lichChieu.map((dataItem)=>
                        <Grid item sm={3} key={data.maRap}>  
                            {dataItem.thongTinRap.tenHeThongRap}  
                            <br/>
                            {dataItem.thongTinRap.tenCumRap}
                            <br/>
                            {dataItem.thongTinRap.tenRap}
                            <br/>
                            { 
                              fullDayMY(dataItem.ngayChieuGioChieu) 
                            }
                            
                        </Grid>
                           
                        ) : <Skeleton variant="text" />
                    }
                </Grid>
            </Container> 
        </>
    );
}

export default DetailFirm;