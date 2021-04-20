import React, { useState } from 'react'; 
import { Button, ButtonGroup, Grid } from '@material-ui/core';  
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './user.scss';   
import { useDispatch } from 'react-redux'; 
import { logout } from '../Login/LoginSlice';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
 
function User(props) { 
    const {user} = props 
    const [active, setActive] = useState(false); 
    const [findUser, setFindUser] = useState() 
    const [edit, setEdit] = useState(false);
    const taiKhoan = user.taiKhoan; 
    const dispatch = useDispatch()
    const handleClickArrowUser = async () =>{
        setActive(!active) 
        await fetch(`https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${taiKhoan}`)
        .then(response => response.json())
        .then(data => {
            setFindUser(data[0])  
        });
    }
    const accessTokens = user.accessToken;
    const handleEditProfile = (e) =>{
        e.preventDefault()  
        const hoTen = e.target.hoTen.value;
        const matKhau = e.target.matKhau.value; 
        const email = e.target.email.value;  
        const soDt = e.target.soDt.value;
        const requestOptions = {
            method: 'PUT',
            headers: {  
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + accessTokens 
            }, 
            body: JSON.stringify(
              {
                "taiKhoan": taiKhoan,
                "email": email,
                "matKhau": matKhau,
                "soDt": soDt,
                "maNhom": user.maNhom,
                "maLoaiNguoiDung": user.maLoaiNguoiDung,
                "hoTen": hoTen
              }
            )
        };
        fetch('https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', requestOptions)
        .then(res =>{
            if(res.ok){
                alert('Sửa thành công thành công !!!');
                setActive(!active) 
                setEdit(!edit)  
            } 
            return res.json(); 
        })  
        .catch((error) => console.log('Sửa thất bại', error))  
        setEdit(!edit)
          
    }
    const handleClickLogout = () =>{
        dispatch(logout());
    }   
    return (
        <> 
        
            {(user.taiKhoan !== undefined) ? <AccountCircleIcon color="secondary" /> : ''}
            <ArrowDropDownIcon className="pointer" color="secondary" onClick={handleClickArrowUser}/>
           
            <Grid style={ active ? {display: 'block'} : {display: 'none'} } className="user-info" item sm={3} md={2} container
                    justify="space-between" 
                    direction="column" 
            >     
                <Grid style={!edit ? {display: 'block'} : {display: 'none'}} >
                    <div>
                        <h5>Họ tên: {findUser !== undefined ? findUser.hoTen : user.hoTen}</h5>
                        <h5>Mail: {findUser !== undefined ? findUser.email : user.email}</h5>
                        <h5>Loại: {findUser !== undefined ? findUser.maLoaiNguoiDung : user.maLoaiNguoiDung}</h5> 
                        <h5>Phone: {findUser !== undefined ? findUser.soDt : user.soDT}</h5>   
                    </div> 
                    <br/>
                    <ButtonGroup size="small" color="secondary" variant="outlined">
                        <Button onClick={()=> setEdit(!edit)} ><EditIcon color="secondary" /></Button> 
                        <Button onClick={handleClickLogout} ><ExitToAppIcon color="secondary" fontSize="small"/></Button>     
                    </ButtonGroup>  
                </Grid>
                <Grid style={edit ? {display: 'block'} : {display: 'none'}}> 
                    <form onSubmit={handleEditProfile} >
                        <label htmlFor="">
                            Họ Tên
                            <input id="hoTen" type="text" defaultValue={findUser !== undefined ? findUser.hoTen : ""}/>
                        </label><br/>
                        <label htmlFor="">
                            Tài khoản
                        </label><br/>
                        <label htmlFor="">
                            Mật khẩu 
                            <input id="matKhau" type="text" defaultValue={findUser !== undefined ? findUser.matKhau : ""}/>
                        </label><br/>
                        <label htmlFor="">
                            Email
                            <input id="email" type="text" defaultValue={findUser !== undefined ? findUser.email : ""}/>
                        </label><br/>
                        <label htmlFor="">
                             Số điện thoại 
                             <input id="soDt" type="text" defaultValue={findUser !== undefined ? findUser.soDt : ""}/>  
                        </label><br/> 
                        <Button type="submit" ><EditIcon color="secondary" /></Button>
                    </form>
                </Grid>    
            </Grid>  
        </>
    );
}
export default User;