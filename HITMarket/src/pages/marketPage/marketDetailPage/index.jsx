import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Card, CardHeader, CardContent, Avatar, CardMedia, Typography, Button } from '@mui/material';
import * as Icons from '@mui/icons-material';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import styled from '@emotion/styled';

import MainFrame from '@/components/mainFrame';
import ItemCard from './itemCard';


const ImageGalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;


const MarketDetailPage = (props) => {

    const { postId } = useParams();
    // useEffect(() => {
    //     console.log(postId);
    //     // Load COntent Here
    // });
    const [detail, setDetail] = useState({
        author: '小荔枝',
        title: '出ipad',
        time: '2023-10-03',
        content: '女生自用ipad pro 2021, 99新',
        isFavorite: true,
        pictures: [
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=540&hei=540&align=0%2C-1&fmt=jpeg&qlt=90&fit=constrain&.v=1645065732688',
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=540&hei=540&align=0%2C-1&fmt=jpeg&qlt=90&fit=constrain&.v=1645065732688',
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=540&hei=540&align=0%2C-1&fmt=jpeg&qlt=90&fit=constrain&.v=1645065732688',
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=540&hei=540&align=0%2C-1&fmt=jpeg&qlt=90&fit=constrain&.v=1645065732688',
        ],
        items: [
            {
                id: 1,
                name: 'ipad',
                price: '1000',
                category: '电子产品',
                description: '99新',
                status: '未出售', // 已出售
                bids: [
                    { name: '罗家乐', price: '1000' },
                    { name: '小明', price: '100' },
                    { name: '小红', price: '200' },
                ]
            }
        ]
    });

    const [replies, setReplies] = useState([
        {
            id: 1,
            name: '罗家乐',
            content: '我想要，能聊聊吗',
            items: [
                { id: 1, name: 'ipad', price: '1000', description: '99新' }
            ]
        }
    ]);

    const handleChangeStatus = (index) => (status) => {
        const newItems = detail.items.map((item, i) => {
            if (item.id === index) {
                return { ...item, status: status };
            }
            return item;
        });
        setDetail({ ...detail, items: newItems });
    };

    return (
        <MainFrame needNavigator={false} >
            {/* <h1>MarketDetailPage</h1> */}
            {/* content */}
            <div className="sticky top-0 w-full flex justify-between items-center z-10 pt-2.5 pb-2.5 pl-5 pr-5 bg-white">
                <Button className="focus:outline-none" onClick={() => {
                    window.history.back();
                }}
                >
                    <Icons.Close />
                </Button>
                <Button className="focus:outline-none" onClick={() => {
                    setDetail({ ...detail, isFavorite: !detail.isFavorite });
                }}
                >
                    {
                        detail.isFavorite ?
                            <Icons.Favorite /> :
                            <Icons.FavoriteBorder />
                    }
                </Button>
            </div>
            <div style={{
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'scroll',
            }} >
                <Card sx={{ width: '90vw', marginTop: '20px', boxShadow: 'none' }} >
                    <CardHeader
                        avatar={
                            <div><Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                {detail.author}
                            </Avatar>{detail.author}</div>

                        }
                        title={detail.title}
                        subheader={detail.time}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {detail.content}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <PhotoProvider>
                            <ImageGalleryContainer>
                                {detail.pictures.map((picture, index) => (
                                    <PhotoView
                                        src={picture}
                                    >
                                        <Image src={picture} style={{ objectFit: 'cover', width: '100px', height: '100px' }} />
                                    </PhotoView>
                                ))}
                            </ImageGalleryContainer>
                        </PhotoProvider>
                    </CardContent>
                </Card>
                {/* 物品卡片 */}
                <div style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }} >
                    {
                        detail.items.map((item, index) => (
                            <ItemCard
                                item={item}
                                changeStatus={(status) => { handleChangeStatus(item.id)(status) }}
                            />
                        ))
                    }
                </div>
                {/* 评论区 */}
                <Card sx={{ width: '90vw', marginTop: '20px', boxShadow: 'none' }} >
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            回复
                        </Typography>
                    </CardContent>

                    {replies.map((reply, index) => (
                        <Card  >
                            <CardHeader
                                avatar={
                                    <div><Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                        {reply.name}
                                    </Avatar>{reply.name}</div>

                                }
                                title={reply.content}
                            />
                        </Card>
                    ))}
                </Card>
                <div className="h-20" />
                {/* Reply input */}

                <div className="fixed bottom-0 left-0 w-full flex justify-center items-center z-10 pt-2.5 pb-2.5 pl-5 pr-5 bg-white">
                    <input className="w-4/5 h-10 rounded-full pl-5 pr-5 outline-none" placeholder="回复" />
                    <Button className="focus:outline-none" >
                        <Icons.Send />
                    </Button>
                </div>
            </div>
        </MainFrame>
    );

};

export default MarketDetailPage;