import { Navigator } from '../navigator';


export const MainFrame = (props) => {

    const pageState = props.pageState;
    const needNavigator =  props.needNavigator===false?props.needNavigator:true;
    
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            overflow: 'scroll',
            backgroundColor: '#F5F5F5',
        }}>
            {props.children}
            <div style={{
                display: needNavigator? 'block':'none',
                position: 'fixed',
                bottom: 0,
            }}>
                <Navigator pageState={pageState} />
            </div>
        </div>
    );
}

export default MainFrame;