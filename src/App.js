// import logo from './logo.svg';
import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Header from "./components/Header/Header";
import MainNav from "./components/MainNav";
import Container from "@material-ui/core/Container";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route exact path='/' element={<Trending/>}/>
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/series' element={<Series/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </Container>
      </div>
      <MainNav />
    </>
  );
}

export default App;
