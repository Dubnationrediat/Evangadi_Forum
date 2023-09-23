import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import SignUp from './pages/signUp/SignUp.js'
import Login from './pages/Login/Login.js'
import Home from './pages/Home/Home.js'
import Answer from './pages/answer/Answer';
import Question from './pages/Question/Question';
import ForGotEmail from './pages/ForGotPasswordForEmail/ForGotEmail';
import PassWordUpdatePage from './pages/passWordUpdatePage/PassUpdate'
import Header from './Components/Header';
function App() {  
  return (
    <div className="App">
  <Header/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path ='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/question' element={<Question/>}/>
          <Route path='/answer/:question_id/:user_id' element={<Answer/>}/>
          <Route path='/forgotPass' element={<ForGotEmail/>}/>
          <Route path='/user/updatePassword/:user_id' element={<PassWordUpdatePage/>}/>
        </Routes>

    </div>
  );
}

export default App;
