import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import SignUp from './pages/signUp/SignUp.js'
import Login from './pages/Login/Login.js'
import Home from './pages/Home/Home.js'
import Answer from './pages/answer/Answer';
import Question from './pages/Question/Question';
function App() {  
  return (
    <div className="App">
     <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path ='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/question' element={<Question/>}/>
          <Route path='/answer/:question_id/:user_id' element={<Answer/>}/>
        </Routes>
      </div>
     </Router>
    </div>
  );
}

export default App;
