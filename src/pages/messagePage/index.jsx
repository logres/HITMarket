import MainFrame from '@/components/mainFrame';
import MessageCard from './messageCard';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getReplyList } from '@/Utils/api';

const incrementContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const MessagePage = () => {


    const [content, setContent] = useState(incrementContent);

    const fetchMoreData = () => {
        setTimeout(() => {
            setContent([...content, ...incrementContent]);
        }, 500)
    }

    const [replies, setReplies] = useState([])

    useEffect(() => {
        const init = async () => {
            const data = await getReplyList();
            console.log(data);
            setReplies(data);
        }
        init();
    }, [])

    console.log(replies);
    return (
        <MainFrame pageState={'message'} >
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
                    // loader={<p
                    //     style={{
                    //         color: '#2b2b2b'
                    //     }}
                    // >加载中……</p>}
                    scrollableTarget='scroll-container'
                    endMessage={<p>已经划到底啦！</p>}
                    height='calc(100vh - 50px)'
                >

                    <ul>
                        {
                            replies?.map((reply, index) => <MessageCard reply={reply} />)
                        }
                    </ul>
                </InfiniteScroll>
            </div>

        </MainFrame>
    );
}

export default MessagePage;