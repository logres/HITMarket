import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { Button } from '@mui/material';
import styled from '@emotion/styled'

import AddIcon from '@/assets/navigator/addIcon.svg?react';
import Alert from '@/assets/navigator/alert.svg?react';
import Market from '@/assets/navigator/market.svg?react';
import Mine from '@/assets/navigator/mine.svg?react';
import PriceTag from '@/assets/navigator/priceTag.svg?react';
import AlertActive from '@/assets/navigator/alertActive.svg?react';
import MarketActive from '@/assets/navigator/marketActive.svg?react';
import MineActive from '@/assets/navigator/mineActive.svg?react';
import PriceTagActive from '@/assets/navigator/priceTagActive.svg?react';


const StyledButton = ({
    chosen,
    activeIcon,
    Icon,
    text,
    ...rest
}) => {

    const ButtonWithCss = styled(Button)`
    &:focus {
      outline: none;
    }`;

    const scale = Math.min(window.screen.width / 412,window.screen.height / 915)

    return (
        <ButtonWithCss disableTouchRipple sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}   {...rest} >
            {
                chosen ? activeIcon : Icon
            }
            <div style={{
                transform: `scale(${scale},${scale})`
            }} >
                {text}
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
            } chosen={pageState === 'market'}
                activeIcon={<MarketActive />}
                Icon={<Market />}
            />
            <StyledButton text={'求购'} onClick={
                () => navigator('/sell')
            } chosen={pageState === 'sell'}
                activeIcon={<PriceTagActive />}
                Icon={<PriceTag />}
            />
            <StyledButton
                Icon={<AddIcon />}
                onClick={() => navigator('/newPost')}
            />
            <StyledButton text={'消息'} onClick={
                () => navigator('/message')
            } chosen={pageState === 'message'}
                activeIcon={<AlertActive />}
                Icon={<Alert />}
            />
            <StyledButton text={'我的'} onClick={
                () => navigator('/mine')
            } chosen={pageState === 'mine'}
                activeIcon={<MineActive />}
                Icon={<Mine />}
            />
        </div>
    );

}