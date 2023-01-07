import React, { useState } from "react";
import "../Style/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Header from "../Components/Header";
import Home from "./Home";
import Cart from "./Cart";
import Products from "./Products";
import Contact from "./Contact";
import ClientsPage from "./Clients";
import ProvidersPage from "./Fournisseurs";
import FamiliesPage from "./Familles";
import ConnexionInscription from "./ConnexionInscription";
import ManageProducts from "./ManageProducts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let role = {};
role[(role["Admin"] = 0)] = "Admin";
role[(role["User"] = 1)] = "User";

export const Role = role;

const theme = createTheme({
  palette: {
    primary: {
      main: "#C6C5B3",
    },
    secondary: {
      main: "#b31533",
    },
    secondary_dark: {
      main: "#660517",
    },
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header isConnected={isConnected} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Home" element={<Home />} />
            <Route
              path="/Products"
              element={
                <Products
                  cart={cart}
                  setCart={setCart}
                  isConnected={isConnected}
                />
              }
            />
            <Route
              path="/Cart"
              element={
                <Cart cart={cart} setCart={setCart} isConnected={isConnected} />
              }
            />
            <Route
              path="/Contact"
              element={<Contact isConnected={isConnected} />}
            />
            <Route
              path="/Clients"
              element={<ClientsPage isConnected={isConnected} />}
            />
            <Route
              path="/Providers"
              element={<ProvidersPage isConnected={isConnected} />}
            />
            <Route
              path="/Families"
              element={<FamiliesPage isConnected={isConnected} />}
            />
            <Route
              path="/ManageProducts"
              element={<ManageProducts isConnected={isConnected} />}
            />
            <Route
              path="/Connection"
              element={
                <ConnexionInscription
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
