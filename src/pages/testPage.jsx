import { Navigator } from '@/components/navigator';
import BaseCard from '@/components/baseCard';
import BaseSearchBar from '@/components/baseSearchBar';

export const TestPage = () => {
    return (
        <div style={{
            backgroundColor: '#888',
            height: '100vh',
            width: '100vw',
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <BaseSearchBar />
            <BaseCard />
        </div>
    );
} 