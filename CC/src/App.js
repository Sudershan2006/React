import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Error } from "./Pages/404";
import { Search } from "./Pages/Search";

function App() {
  const [login, setLogin] = useState(false);
  const [userid, setId] = useState('');
  const navigate = useNavigate();

  const setLoginStatus = (value) => setLogin(value);
  const setUserId = (value) => setId(value);

  useEffect(() => {
    if (login) {
      navigate('/');
      // console.log(userid);
    } else {
      navigate('/login');
    }
  }, [login]);

  return (
      <Routes> 
        <Route path='/' element={<Home login={login}/>} />
        <Route path='/login' element={<Login func1={setLoginStatus} func2={setUserId} />} />
        <Route path='*' element={<Error />} />
        <Route path='/searchresults' element={<Search />} />

      </Routes>
  );
}

export default App;