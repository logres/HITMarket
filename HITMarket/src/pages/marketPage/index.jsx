import MainFrame from '@/components/mainFrame';
import PostCard from './marketCard'
import SearchBar from '@/components/baseSearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { getPostList } from '@/Utils/api';

const incrementContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const MarketPage = () => {

    const navigator = useNavigate();

    const [content, setContent] = useState([]);

    const [start, setStart] = useState(0);

    const [keywords, setKeywords] = useState([]);

    const [loadMore, setLoadMore] = useState(true);

    useEffect(() => {
        if (!loadMore) {
            return;
        }
        const getContent = async () => {
            // console.log('asb');
            const content = await getPostList({
                start: start,
                kind: 'buy',
                category: 'all',
                keywords: keywords,
                num: 10
            });
            console.log(content);
            setContent(content.concat(content));
        }
        getContent();
        setStart(start + 10);
        setLoadMore(false);
        console.log("123");
    }, [loadMore]);

    const fetchMoreData = () => {
        setLoadMore(true);
    }

    return (
        <MainFrame pageState={'market'} >
            <div className="sticky top-0 w-full flex justify-center items-center z-10 pt-2.5 pb-2.5 bg-white">
                <SearchBar />
            </div>
            {/* CategoryBar */}
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
                    hasMore={content.length < 100}
                    loader={<p
                        style={{
                            color: '#2b2b2b'
                        }}
                    >加载中……</p>}
                    scrollableTarget='scroll-container'
                    endMessage={<p>已经划到底啦！</p>}
                    height='calc(100vh - 103px)'

                    pullDownToRefresh
                    pullDownToRefreshThreshold={300}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; 下拉以刷新内容</h3>
                    }
                    releaseToRefreshContent={
                        <div style={{ height: '500px' }}>
                            <CircularProgress />
                        </div>

                    }
                    refreshFunction={() => { console.log("你好") }}
                >

                    <ul>
                        {
                            content.map((item, index) => <PostCard
                                item={{
                                    userName: item.userName,
                                    title: item.title,
                                    // abstractDetail: item?.text?.length > 20 ? item.text.slice(0, 20) + '...' : item.text,
                                    abstractDetail: '123',
                                    time: item.data,
                                    pictures: item.pics.length > 0 ? item.pics[0] : null,
                                }}
                                key={index} onClick={() => {
                                    navigator('/marketDetail/' + item.pid)
                                }} />)
                        }
                    </ul>
                </InfiniteScroll>
            </div>
        </MainFrame>
    );
}

export default MarketPage;