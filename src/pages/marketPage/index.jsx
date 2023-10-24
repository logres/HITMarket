import MainFrame from '@/components/mainFrame';
import PostCard from './marketCard'
import SearchBar from '@/components/baseSearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { getPostList } from '@/Utils/api';

const MarketPage = ({
    kind
}) => {

    const navigator = useNavigate();

    const [content, setContent] = useState([]);

    const [keywordsString, setKeywordsString] = useState('');

    const [hasMore, setHasMore] = useState(true);

    const NUM = 5;

    // const FLAG = sessionStorage.getItem('FLAG');

    // debugger;
    const getContent = async () => {
        const local_content = await getPostList({
            start: content.length,
            kind: kind,
            category: 'all',
            keywords: keywordsString.split(' '),
            num: NUM
        });
        if (local_content.length < NUM) {
            setHasMore(false);
        }
        setContent(content.concat(local_content));
    }

    const init = async () => {
        const local_content = await getPostList({
            start: 0,
            kind: kind,
            category: 'all',
            keywords: keywordsString.split(' '),
            num: NUM
        });
        if (local_content.length < NUM) {
            setHasMore(false);
        }
        setContent(local_content);
    }


    useEffect(() => {
        init();
    }, [keywordsString, kind]);

    const fetchMoreData = () => {
        getContent();
    }

    return (
        <MainFrame pageState={kind === 'buy' ? 'market' : 'sell'} >
            <div className="sticky top-0 w-full flex justify-center items-center z-10 pt-2.5 pb-2.5 bg-white">
                <SearchBar placeholder={'请按照 “关键词1 关键词2 关键词3” 输入关键词'} value={keywordsString}
                    onChange={(value) => { setKeywordsString(value) }}
                />
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
                    hasMore={hasMore}
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
                            content.map?.((item, index) => <PostCard
                                item={{
                                    userName: item.userName,
                                    title: item.title,
                                    abstractDetail: item?.text?.length > 20 ? item.text.slice(0, 20) + '...' : item.text,
                                    // abstractDetail: '123',
                                    time: item.date,
                                    pictures: item.pics,
                                }}
                                key={index} onClick={() => {
                                    if (kind === 'buy') {
                                        navigator('/marketDetail/' + item.pid)
                                    } else {
                                        navigator('/sellDetail/' + item.pid)
                                    }
                                }} />)
                        }
                    </ul>
                </InfiniteScroll>
            </div>
        </MainFrame>
    );
}

export default MarketPage;