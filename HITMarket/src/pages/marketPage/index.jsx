import MainFrame from '@/components/mainFrame';
import PostCard from './marketCard'
import SearchBar from '@/components/baseSearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';


const incrementContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const MarketPage = () => {

    const [content, setContent] = useState(incrementContent);

    const fetchMoreData = () => {
        setTimeout(() => {
            setContent([...content, ...incrementContent]);
        }, 500)
    }


    return (
        <MainFrame pageState={'market'} >
            <div className="sticky top-0 w-full flex justify-center items-center z-10 pt-2.5 pb-2.5 bg-white">
                <SearchBar />
            </div>
            <div
                style={{
                    width: '100vw',
                    height: 'calc(100vh - 103px)',
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                id='scroll-container'
            >
                {/* <h1>demo: react-infinite-scroll-component</h1> */}
                <InfiniteScroll
                    dataLength={content.length}
                    next={
                        fetchMoreData
                    }
                    hasMore={content.length<100}
                    loader={<p
                        style={{
                            color: '#2b2b2b'
                        }}
                    >加载中……</p>}
                    scrollableTarget='scroll-container'
                    endMessage={<p>已经划到底啦！</p>}
                    height='calc(100vh - 103px)'
                >

                    <ul>
                        {
                            content.map((item, index) => <PostCard key={index} />)
                        }
                    </ul>
                </InfiniteScroll>
            </div>

            {/* <div style={{ height: '50px' }} /> */}
            {/* {content.map(item => (<div>{item}</div>))} */}
        </MainFrame>
    );
}

export default MarketPage;