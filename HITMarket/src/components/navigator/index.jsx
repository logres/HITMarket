import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { Button } from '@mui/material';
import styled from '@emotion/styled'

import AddIcon from '../../assets/navigator/addIcon.svg?react';
import Alert from '../../assets/navigator/alert.svg?react';
import Market from '../../assets/navigator/market.svg?react';
import Mine from '../../assets/navigator/mine.svg?react';
import PriceTag from '../../assets/navigator/priceTag.svg?react';


const StyledButton = (props) => {

    const ButtonWithCss = styled(Button)`
    &:focus {
      outline: none;
    }`;

    return (
        <ButtonWithCss disableTouchRipple  sx={{
            display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
        }}   {...props} >
            {props.children}
            <div>
                {props.text}
            </div>
        </ButtonWithCss>
    )

} 


export const Navigator = (props) => {

    const pageState = props.pageState;
    const navigator = useNavigate();

    return (
        <div
            style={{
                height: 50,
                width: '100vw',
                display: 'flex',
                flexDirection: 'columns',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
            }}
        >
            <StyledButton text={'市场'} onClick={
                () => navigator('/market')
            } chosen={pageState==='market'} >
                <Market />
            </StyledButton>
            <StyledButton text={'求购'} onClick={
                () => navigator('/sell')
            } chosen={pageState==='sell'}
            >
                <PriceTag />
            </StyledButton>
            <StyledButton >
                <AddIcon />
            </StyledButton>
            <StyledButton text={'消息'} onClick={
                () => navigator('/alert')
            } chosen={pageState==='alert'}
            >
                <Alert />
            </StyledButton>
            <StyledButton text={'我的'} onClick={
                () => navigator('/mine')
            } chosen={pageState==='mine'}
            >
                <Mine />
            </StyledButton>
        </div>
    );

}