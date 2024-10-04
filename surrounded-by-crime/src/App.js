import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import LogIn from './Pages/LogIn/LogIn';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import UserPage from './Pages/UserPage/UserPage';
import NewAccount from './Pages/newAccount/newAccount';
import Report from './components/Report/Report';
import ReportPreview from './components/ReportPreview/ReportPreview';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/report/' element={<Report/>}/>
        <Route path='/user/' element={<UserPage/>}/>
        <Route path='/newaccount' element={<NewAccount/>}/>
        <Route path='/Login' element={<LogIn/>}/>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/' element={<ErrorPage/>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
