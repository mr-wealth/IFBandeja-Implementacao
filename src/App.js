import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './pages/login';
import { Home } from './pages/home';

import { GlobalStyle } from './styles/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { FaMoon, FaSun } from 'react-icons/fa';

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
      <button 
        onClick={toggleTheme} 
        style={{ position: 'fixed', top: 10, right: 20, zIndex: 999, padding: '8px', 
          color: 'black'}}
      >
          {currentThemeMode === lightTheme ? <FaMoon /> : <FaSun />}
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
