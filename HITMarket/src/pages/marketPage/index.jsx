import MainFrame from '@/components/mainFrame';
import PostCard from './marketCard'
import SearchBar from '@/components/baseSearchBar';

const MarketPage = () => {

    const content = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 3, 42, 42, 43124, 213, 213, 123, 123, 21, 321, 321, 321, 3, 123, 21, 321, 3, 213, 21, 321, 3, 123, 21, 3213, 12, 1, 1, 1, 1, 1, 1
    ];

    return (
        <MainFrame pageState={'market'} >
            <div className="sticky top-0 w-full flex justify-center items-center z-10 pt-2.5 pb-2.5 bg-white">
                <SearchBar />
            </div>
            <div
                style={{
                    width: '100vw',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
            <div style={{ height: '50px' }} />
            {/* {content.map(item => (<div>{item}</div>))} */}
        </MainFrame>
    );
}

export default MarketPage;