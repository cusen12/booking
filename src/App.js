import './App.scss';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from './Component/Header/Header';  
import Hero from './Component/Hero/Hero';
import ListCard from './Component/List/ListCard'; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailFirm from './Pages/DetailFilm/DetailFirm';
const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#FF5252',
    },
    secondary: {
      main: '#ffffff',
    }
  } ,
  typography:{
    fontFamily: 'Raleway, Arial',
    fontWeight: 700,
  }

})

function App() {  
  localStorage.setItem('UserStore', JSON.stringify([]));  
  return (  
      <ThemeProvider theme={theme}>
        <Router>
        <>
            <Header/>
            <Hero/>
            <Switch>
              <Route path="/detail:filmId" children={<DetailFirm/>} /> 
              <Route path="/">
                <ListCard/>
              </Route>
          </Switch> 
           
        </>
        </Router>
      </ThemeProvider>  
  );
}

export default App;
