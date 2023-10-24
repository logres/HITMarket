import axios_instance, { login } from '@/Utils/axios_instance';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';


const LoadingPage = () => {

    const navigator = useNavigate();

    useEffect(() => {
        window.HWH5.getAuthCode()
            .then(res => {
                // console.log('dsadsda');
                return login(res.code)
            }).then(res => {
                axios_instance.defaults.headers.common['Authorization'] = res.data.token;
            }).then(res => {
                navigator('/market')
                console.log('Loading');
            });
    }, []);


    return (
        <div>
            Loading...（请使用哈工大APP打开）
        </div>
    )
}

export default LoadingPage;