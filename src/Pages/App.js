import React, {useState, useEffect} from "react";
import "../Style/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import Header from "../Components/Header";
import Home from "./Home";
import Cart from "./Cart";
import Products from "./Products"
import Contact from "./Contact";
import ClientsPage from "./Clients";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C6C5B3',
    },
    secondary: {
      main: '#b31533',
    },
    secondary_dark: {
      main : "#660517",
    },
  },
});

function App() {

  const [cart, setCart] = useState([])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Products" element={<Products cart={cart} setCart={setCart}/>}/>
            <Route path="/Cart" element={<Cart cart={cart} setCart={setCart}/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/Clients" element={<ClientsPage/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
