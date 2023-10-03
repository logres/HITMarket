import { Navigator } from '../navigator';


export const MainFrame = (props) => {

    const pageState = props.pageState;

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
        }}>
            {props.children}
            <div style={{
                position: 'fixed',
                bottom: 0,
            }}>
                <Navigator pageState={pageState} />
            </div>
        </div>
    );
}
