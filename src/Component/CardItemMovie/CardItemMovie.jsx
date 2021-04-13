import React from 'react'; 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'; 
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'; 
import Typography from '@material-ui/core/Typography'; 
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import './CardItemMovide.scss';
import Hero from '../Hero/Hero';
 
function CardItemMovie(props) {
    const { itemMovie } = props;
    return (
        <>
            <Hero/>
            {itemMovie.map((data) => 
                <Grid className="cardItem" key={data.maPhim} item xs={3}
                container>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={data.hinhAnh}
                                title="Contemplative Reptile"
                                 
                            />
                            <CardContent>
                            <Typography className="titleCard" gutterBottom variant="h5" component="h5">
                                {data.tenPhim}
                            </Typography> 
                            <Typography variant="h5" color="textSecondary" component="p">
                                {data.danhGia}/10
                            </Typography> 
                            </CardContent> 
                        </CardActionArea> 
                        <ButtonGroup variant="contained" color="primary">
                                <Button> Đặt vé </Button>
                                <Button><Link to={`detail${data.maPhim}`}>Xem</Link></Button>
                        </ButtonGroup>
                    </Card> 
                </Grid>
            )}  
        </>
    );
}

export default CardItemMovie;
 