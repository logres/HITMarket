import MainFrame from '@/components/mainFrame';
import MessageCard from './messageCard';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const incrementContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const MessagePage = () => {


    const [content, setContent] = useState(incrementContent);

    const fetchMoreData = () => {
        setTimeout(() => {
            setContent([...content, ...incrementContent]);
        }, 500)
    }

    return (
        <MainFrame pageState={'message'} >
            {/* <div>MessagePage</div>
            <MessageCard /> */}
            <div
                style={{
                    width: '100vw',
                    height: 'calc(100vh - 50px)',
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                id='scroll-container'
            >
                <InfiniteScroll
                    dataLength={content.length}
                    next={
                        fetchMoreData
                    }
                    hasMore={content.length < 100}
                    loader={<p
                        style={{
                            color: '#2b2b2b'
                        }}
                    >加载中……</p>}
                    scrollableTarget='scroll-container'
                    endMessage={<p>已经划到底啦！</p>}
                    height='calc(100vh - 50px)'
                >

                    <ul>
                        {
                            content.map((item, index) => <MessageCard key={index} />)
                        }
                    </ul>
                </InfiniteScroll>


            </div>

        </MainFrame>
    );
}

export default MessagePage;