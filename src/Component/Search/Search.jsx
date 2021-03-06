import React, { useRef, useState } from 'react'; 
import SearchIcon from '@material-ui/icons/Search';
import './Search.scss'
import { useHistory } from 'react-router';

function Search() {
    const [search, setSearch] = useState([]);
    const [searchBox, setsearchBox] = useState(false);
    const inputEl = useRef();
    let history = useHistory();
    const handleChangeInput = async (e) =>{    
        const value = e.target.value;
        if(value !== ''){
            try {  
                const response = await fetch(`https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?tenPhim=${value}`); 
                const responseJson = await response.json();
                setSearch(responseJson); 
                setsearchBox(true);
                return responseJson; 
            } catch (error) {
                console.log('Không tìm thấy phim');
                setsearchBox(false);
            }  
        }
        setsearchBox(false);
    } 
    const handleClickSearch = (data) =>{ 
        history.push(`detail${data}`) 
        inputEl.current.value = "";
        setsearchBox(false)
    }
    return (
        <>
            <div className="search">
                <input onChange={handleChangeInput} ref={inputEl} type="text" placeholder="Search movie"/>
                <SearchIcon className="iconSearch" color="primary" fontSize="small"/> 
                <div style={searchBox ? {display: 'block'} : {display: 'none'} } className="box">
                    <ul>
                        {search.map((data) =>
                        <li 
                        key={data.maPhim}
                        onClick={()=> handleClickSearch(data.maPhim)}  
                        > 
                            {data.tenPhim} 
                        </li>
                        )}
                    </ul>
                    
                </div>
            </div>
            
        </>
    );
}

export default Search;