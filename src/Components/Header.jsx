import React from 'react';
import "../Style/Header.css";
import NegoSud from "../Assets/NegoSud.png"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Header(props) {

    const headerTitle = ["PRODUITS","PANIER","CONTACT"]

    return(
        <div className='headerContainer'>
            <div className='negosudWrapper'><img src={NegoSud} alt="NEGOSUD" /></div>
            <Stack spacing={2} direction="row">
                {headerTitle.map((header) => {
                    return(<Button sx={{fontSize : '18px'}} color='secondary' size='large' variant='text'>{header}</Button>)
                })}
            </Stack>
            <Stack direction="row" className='authenticationWrapper'>
                <Button color='secondary_dark' size='large' variant='text'>Signup/Register</Button>
            </Stack>
        </div>
    )
}

export default Header