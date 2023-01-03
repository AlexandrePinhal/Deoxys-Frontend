import React from 'react';
import "../Style/Header.css";
import NegoSud from "../Assets/NegoSud.png"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Header(props) {

    const headerTitle = [["PRODUITS", "/Products"],["PANIER", "/Cart"],["CONTACT", "/Contact"], ["CLIENTS", "/Clients"]]

    return(
        <div className='headerContainer'>
            <div className='negosudWrapper'><img src={NegoSud} alt="NEGOSUD" /></div>
            <Stack spacing={2} direction="row">
                {headerTitle.map((header, index) => {
                    return(
                        <Link to={header[1]} key={index}>
                            <Button sx={{fontSize : '22px'}} style={{lineHeight : '280%'}} color='secondary' size='large' variant='text'>
                                {header[0]}
                            </Button>
                        </Link>
                        )
                })}
            </Stack>
            <Stack direction="row" className='authenticationWrapper'>
                <Button color='secondary_dark' size='large' variant='text'>Signup/Register</Button>
            </Stack>
        </div>
    )
}

export default Header