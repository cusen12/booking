import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import './Footer.scss';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <> 
            <Grid className="footer" >
                <Container>
                    <Typography variant="h4" >Liên hệ với chúng tôi.</Typography>
                    <ul>
                        <li><Link to="/">Câu hỏi thường gặp</Link></li>
                        <li><Link to="/">Quan hệ với nhà đầu tư</Link></li>
                        <li><Link to="/">Quyền riêng tư</Link></li>
                        <li><Link to="/">Câu hỏi thường gặp</Link></li>
                        <li><Link to="/">Kiểm tra tốc độ</Link></li>
                        <li><Link to="/">Trung tâm đa phương tiện</Link></li>
                        <li><Link to="/">Điều khoản sử dụng</Link></li>
                        <li><Link to="/">Liên hệ với chúng tôi</Link></li>
                        <li><Link to="/">Trung tâm trợ giúp</Link></li>
                        <li><Link to="/">Việc làm</Link></li>
                        <li><Link to="/">Tùy chọn cookie</Link></li>
                        <li><Link to="/">Câu hỏi thường gặp</Link></li>
                        <li><Link to="/">Thông báo pháp lý</Link></li> 
                        <li><Link to="/">Tài khoản</Link></li>
                        <li><Link to="/">Các cách xem</Link></li>
                        <li><Link to="/">Quyền riêng tư</Link></li>
                        <li><Link to="/">Thông tin doanh nghiệp</Link></li>
                        <li><Link to="/">Tác phẩm của chúng tôi</Link></li>

                    </ul> 
                </Container>
            </Grid> 
        </>
    );
}

export default Footer;