import MainFrame from '@/components/mainFrame';
import PostCard from './marketCard'
import SearchBar from '@/components/baseSearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { getFavoritePostList } from '@/Utils/api';

import { changeTimeShow } from '@/Utils/timeTool'
import * as Icons from '@mui/icons-material';
import { Button, Typography } from '@mui/material';


const incrementContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const FavoritePage = () => {

    const navigator = useNavigate();

    const [content, setContent] = useState([]);

    const [hasMore, setHasMore] = useState(true);

    const NUM = 5;

    // debugger;
    const getContent = async () => {
        const local_content = await getFavoritePostList({
            start: content.length,
            num: NUM
        });
        if (local_content.length < NUM) {
            setHasMore(false);
        }
        setContent(content.concat(local_content));
    }

    const init = async () => {
        const local_content = await getFavoritePostList({
            start: content.length,
            num: NUM
        });
        if (local_content.length < NUM) {
            setHasMore(false);
        }
        setContent(local_content);
    }


    useEffect(() => {
        init();
    }, []);

    const fetchMoreData = () => {
        getContent();
    }

    return (
        <MainFrame pageState={'market'} needNavigator={false} >
            {/* <div className="sticky top-0 w-full flex justify-center items-center z-10 pt-2.5 pb-2.5 bg-white">
                <SearchBar placeholder={'请按照 “关键词1 关键词2 关键词3” 输入关键词'} value={keywordsString}
                    onChange={(value) => { setKeywordsString(value) }}
                />
            </div> */}
            {/* CategoryBar */}
            <div className="sticky top-0 w-full flex justify-start items-center z-10 pt-2.5 pb-2.5 pl-5 pr-5 bg-white">
                <Button className="focus:outline-none" onClick={() => {
                    window.history.back();
                }}
                >
                    <Icons.Close />
                </Button>
            </div>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
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
                    height='100vh'

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
                                    navigator('/marketDetail/' + item.pid)
                                }} />)
                        }
                    </ul>
                </InfiniteScroll>
            </div>
        </MainFrame>
    );
}

export default FavoritePage;