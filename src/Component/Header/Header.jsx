import { AppBar, Button, Container, Grid, Typography, Drawer  } from '@material-ui/core';  
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useEffect, useState } from 'react';  
import './header.scss'; 
import Login from '../Login/Login'; 
import { useSelector } from 'react-redux'; 
import Search from '../Search/Search';
import User from '../User/User'; 

function Header() {   
    const [iSdrawer, setiSdrawer] = useState(false);
    const [iSdrawerLogin, setiSdrawerLogin] = useState(false); 
    const islogIn = useSelector((state) => state.login.value);    
    const userAdmin = islogIn.taiKhoan;  
     
    useEffect(()=>{
        if(islogIn.taiKhoan !== undefined){
            setiSdrawerLogin(false); 
        }  
    },[islogIn.taiKhoan])   
    return (
        <>  
            <AppBar>
                <Container className="contaniner">
                    <Grid 
                    container
                    justify="space-between"
                    alignItems="center"> 
                        <Grid item sm={2}
                        container
                        justify="flex-start"
                        alignItems="center"
                        >
                            <MenuIcon className="pointer" onClick={()=> setiSdrawer(!iSdrawer)} fontSize="large" color="secondary"/> 
                             
                        </Grid>
                        <Grid item sm={10}
                            container
                            justify="flex-end"
                            alignItems="center">
                            <Search/>   
                            {
                               (islogIn.taiKhoan !== undefined) ?   <User user={islogIn } />
                                                        : 
                                                        <Button variant="outlined" size="small" color="secondary" onClick={()=>setiSdrawerLogin(!iSdrawerLogin) }>
                                                            <Typography variant='button'>Login</Typography> 
                                                        </Button> 
                            }    
                             
                        </Grid>
                    </Grid>
                </Container>
            </AppBar> 
            <Drawer anchor='left' open={iSdrawer}>
                <Button onClick={()=> setiSdrawer(!iSdrawer)}><ArrowBackIcon color="primary"/></Button>
                <h1>Menu</h1>
                {(userAdmin === 'sen') ? <Button variant="outlined" color="primary">Quản lý phim</Button> : ''}  
            </Drawer>
            <Drawer anchor='right' open={iSdrawerLogin}>
                <Button onClick={()=> setiSdrawerLogin(!iSdrawerLogin)}><ArrowForwardIcon color="primary"/></Button>
                <Login/>
            </Drawer> 
        </>
    );
}

export default Header;