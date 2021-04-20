import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { Button, TextField, Grid, ButtonGroup } from '@material-ui/core';
import { login } from './LoginSlice';
import './login.scss'
import { useDispatch } from 'react-redux';   
import Registration from '../../Pages/Registration/Registration';


function Login() {
    const [isLogin, setisLogin] = useState({
        login : false,
        account: [],
    })  
    const [isMember, setIsMember] = useState(true); 
    const dispatch = useDispatch() 
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        const username = e.target.userName.value
        const password = e.target.password.value
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                "taiKhoan": username,
                "matKhau": password,
              }
            )
        };
        fetch('https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap', requestOptions)
        .then(res =>{
            if(res.ok){
                alert('Đăng nhập thành công'); 
            }else {
                alert("Sai tên đăng nhập hoặc mật khẩu");
            }
            return res.json(); 
        })
        .then(data =>{
            setisLogin({
                login:true,
                account: data 
            })   
            
        }) 
        .catch((error) => console.log('Sai tên đăng nhập or mật khẩu', error))  
    }  
    useEffect(()=>{ 
        dispatch(login(isLogin.account)); 
    }) 
    return (
        <>
            <Grid className="login" container
                justify="center"
                alignItems="center"
                direction="column" 
            >  
                <ButtonGroup>
                    <Button type="button" variant="contained" color="primary" onClick={()=>setIsMember(true)}>Đăng nhập</Button>
                    <Button type="button" variant="contained" color="primary" onClick={()=>setIsMember(false)}>Đăng ký</Button>  
                </ButtonGroup>     
            </Grid>
             
            <form style={isMember ? {display: 'block'} : {display:'none'}} onSubmit={handleSubmit}>
                
                <Grid className="login" container
                        justify="center"
                        alignItems="flex-end"
                        direction="column"
                        
                    >   
                         <Grid container
                        justify="center"
                        alignItems="center"
                        direction="column" 
                        >    
                                
                                <AccountCircleIcon fontSize="large" color="secondary"/>
                            </Grid>    
                         
                        <TextField name="userName" id="user-basic" label="User name" />
                        <TextField name='password' type='password' id="password-basic" label="Password" />
                        <br/>
                        <Button type="submit" variant="contained" color="primary"><ArrowForwardSharpIcon/></Button> 
                </Grid> 
            </form>
            <div style={!isMember ? {display: 'block'} : {display:'none'}}>
                <Registration/>
            </div>
           
            
        </>
    );
}

export default Login;