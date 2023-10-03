import { Navigator } from '@/components/navigator';


export const TestPage = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
        }}>
            <div style={{
                position: 'fixed',
                bottom: 0,
            }}>
                <Navigator />
            </div>
        </div>

    );
} 