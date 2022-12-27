import "../Style/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import Header from "../Components/Header";
import Home from "./Home";
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
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/Home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
