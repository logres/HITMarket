import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
    baseURL: 'http://39.107.83.124:14535', // 设置基本的 API URL
    timeout: 20000, // 设置请求超时时间，单位为毫秒
    headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJ3ZWl5dXBlbmciLCJleHAiOjE2OTc2MjAwMjF9.6SCiGkpOGSay44pZzPw1DOCKRnyI_-EmRAAd5zelWZY',
        'Name': 'Luojiale'
    },
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前可以进行一些处理，例如添加请求头等
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据进行处理，例如解析数据等
        return response.data;
    },
    (error) => {
        // 处理响应错误
        if (error.response) {
            // 响应已收到，但状态码不在 2xx 范围内
            console.log('Error status:', error.response.status);
            console.log('Error data:', error.response.data);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.log('No response received:', error.request);
        } else {
            // 发送请求时发生错误
            console.log('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
