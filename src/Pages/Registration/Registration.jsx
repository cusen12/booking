import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { Grid } from '@material-ui/core';

function Registration() {
  const ListGroupUser = ['GP01','GP02','GP03','GP04','GP05','GP06','GP07','GP08','GP09','GP10','GP11','GP12','GP13','GP14','GP15'];
  const autoNumber =()=>{  
    return  Math.floor(Math.random() * 15) + 1
  } 
  const validationSchema = yup.object({
    user: yup
      .string('Nhập tên đăng nhập') 
      .required('Vui lòng nhập tên đăng nhập'),
    password: yup
      .string('Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu phải dài hơn 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    email: yup
      .string('Vui lòng nhập mail')
      .required('Vui lòng nhập mail'),
    fullname: yup
      .string('Vui lòng nhập họ tên')
      .required('Vui lòng nhập họ tên')
      .min(8, 'Họ tên phải dài hơn 8 ký tự'),
    phoneNumber: yup
      .string('Vui lòng số điện thoại')
      .required('Vui lòng nhập số điện thoại')
      .min(8, 'Họ tên phải dài hơn 8 ký tự'),
  });
  
  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
      email:'',
      fullname:'',
      phoneNumber:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { 
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              "taiKhoan": values.user,
              "matKhau": values.password,
              "email": values.email,
              "hoTen": values.fullname,
              "soDt": values.phoneNumber,
              "maNhom":ListGroupUser[autoNumber()]
            }
          )
      };
      
      fetch('https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy', requestOptions)
      .then(res =>{
          if(!res.ok || res.status !== 200){
            return res.text().then(function(text) {
              alert(text); 
            });
          }
          if(res.ok){
              alert('Đăng ký thành công'); 
          } 
            
          return res.json(); 
      }) 
      .catch((error) => console.log(error))  
      }
  })
  return (
    <> 
        <form onSubmit={formik.handleSubmit}>
          <Grid className="login" container  justify="center" alignItems="flex-end" direction="column" > 
                <Grid container justify="center" alignItems="center" direction="column"  >              
                      <LockOpenIcon color="primary" fontSize="large"/>
                </Grid>    
                <TextField
                fullWidth
                id="user"
                name="user"
                label="Tên đăng nhập"
                value={formik.values.user}
                onChange={formik.handleChange}
                error={formik.touched.user && Boolean(formik.errors.user)}
                helperText={formik.touched.user && formik.errors.user}
              />
              <TextField 
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="fullname"
                name="fullname"
                label="Họ tên"
                type="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname}
              />
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Số điện thoại"
                type="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
              <br/>
              <Button color="primary" variant="contained" type="submit">
                <ArrowForwardSharpIcon/>
              </Button>
            </Grid>
          
          
        </form> 
    </>
  );
}

export default Registration;