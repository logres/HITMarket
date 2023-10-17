import { Navigator } from '../navigator';
import { useEffect } from 'react';


export const MainFrame = (props) => {

    const pageState = props.pageState;
    const needNavigator = props.needNavigator === false ? props.needNavigator : true;

    useEffect(() => {
        // 假装获取用户信息
        if (!sessionStorage.getItem('userToken') === null) {
            sessionStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IndlaXl1cGVuZyIsImV4cCI6MTY5NzE1Nzk3NX0.WETYLQqpEP1wWVdQRU1r6t-jcPnyZZqJZMvbKrVyxng');
        }
    }, []);


    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            overflow: 'scroll',
            backgroundColor: '#edeef0',
        }}>
            {props.children}
            <div style={{
                display: needNavigator ? 'block' : 'none',
                position: 'fixed',
                bottom: 0,
            }}>
                <Navigator pageState={pageState} />
            </div>
        </div>
    );
}

export default MainFrame;