import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import './details.scss'

const useStyles = makeStyles((theme) => ({
    formControl: { 
      minWidth: 220,
    },
  }));
function DetailFirm() { 
    const classes = useStyles();
    const [data, setData] = useState([])
    const [dayNuber ,setDay] = useState(); 
    const [age, setAge] = useState('');
    let { filmId } = useParams();  
    const fullDayMY = (date) =>{
        const d = new Date(date)
       return  d.getHours() + "h" + d.getMinutes() +
        "  " + d.getDate()+ "-" + d.getMonth()+"-" + d.getFullYear()
    }
    useEffect(() =>{
        const getData = async () =>{
            const respond = await fetch(`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmId}`);
            const respondJson = await respond.json();
            await setData(respondJson); 
            const setday = new Date(respondJson.ngayKhoiChieu)
            setDay(setday.getDate()+"-"+setday.getMonth()+"-"+setday.getFullYear())
        }
        getData();
    },[filmId])   

    const handleChange = (event) => {
        const value = event.target.value
        setAge(value);
        
      };
    return (
        <>
            <Container className="details-film">
                <Grid
                container
                direction="row"
                justify="flex-start" spacing={2}>
                    <Grid item sm={8}>
                        {data.trailer ? <iframe width="100%" height="315" src={data.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <Skeleton/>}
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
                    <FormControl>
                        <InputLabel htmlFor="grouped-select" >Chọn hệ thống rạp</InputLabel>
                        <Select className={classes.formControl}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                        >
                            {data.heThongRapChieu ? data.heThongRapChieu.map((dataItem)=> 
                                    <MenuItem key={dataItem.maHeThongRap} value={dataItem.maHeThongRap}>{dataItem.tenHeThongRap}</MenuItem>  
                                
                                ) : <h1><Skeleton variant="text" /></h1>
                            }
                     </Select>
                </FormControl>
                </Grid>
                <br/>
                <Grid container 
                  spacing={2}>
                    {data.heThongRapChieu ?  data.heThongRapChieu.map((value)=>
                        value.cumRapChieu.map((dataValue)=>
                        dataValue.lichChieuPhim.map((dataValue2)=> 
                            <Grid container key={dataValue2.maLichChieu}> <p>{dataValue2.ngayChieuGioChieu}</p> </Grid>
                        ))) : <h1><Skeleton variant="text" /></h1>
                    }    
                </Grid>           
                
            </Container> 
        </>
    );
}

export default DetailFirm;