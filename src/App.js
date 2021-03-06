import './App.scss';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from './Component/Header/Header';  
import ListCard from './Component/List/ListCard'; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailFirm from './Pages/DetailFilm/DetailFirm';
import Footer from './Component/Footer/Footer';
const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#000000',
      contrastText: "#424242" 
    },
    secondary: {
      main: '#ffffff',
      contrastText: "#ffffff" 
    }
  } ,
  typography:{
    fontFamily: 'Raleway, Arial',
    fontWeight: 700,
    h1: {
      fontSize: 44,
      fontWeight: 600
    },
    h2: {
      fontSize: 34,
      fontWeight: 600
    },
    h3: {
      fontSize: 24,
      fontWeight: 600
    },
    h4: {
      fontSize: 18,
      fontWeight: 600
    },
    h5: {
      fontSize: 14,
      fontWeight: 600
    }

  }  
})

function App() {  
  localStorage.setItem('UserStore', JSON.stringify([]));  
  return (  
      <ThemeProvider theme={theme}>
        <Router>
        <>
          <Header/> 
          <Switch>
            <Route path="/detail:filmId" children={<DetailFirm/>} /> 
            <Route path="/">
              <ListCard/>
            </Route>
          </Switch> 
          <Footer/>
        </>
        </Router> 
      </ThemeProvider>  
  );
}

export default App;
