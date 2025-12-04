import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Login } from './pages/login';
import { Home } from './pages/home';
import { Admin } from './pages/admin'
import { Servidor } from './pages/servidor'

import { GlobalStyle, HeaderActionButton } from './styles/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { FaMoon, FaSun } from 'react-icons/fa';
import ProtectedRoute from './ProtectedRoute';
import Inexistente from './pages/inexistente';

function App() {

  const [currentThemeMode, setCurrentThemeMode] = useState(darkTheme)

  const toggleTheme = () => {
    if(currentThemeMode === lightTheme){
      setCurrentThemeMode(darkTheme);
      return;
    }
    setCurrentThemeMode(lightTheme);
  }

  return (
    <>
    <ThemeProvider theme={currentThemeMode}>
      <GlobalStyle />
      <ToastContainer 
        autoClose={3000} 
        position="top-right"
        theme={currentThemeMode === lightTheme ? "light" : "dark"} 
      />
      <HeaderActionButton
        onClick={toggleTheme} 
      >
          {currentThemeMode === lightTheme ? <FaMoon /> : <FaSun />}
      </HeaderActionButton>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/servidor" element={<Servidor />}/>
          </Route>
          <Route path="*" element={<Inexistente />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
