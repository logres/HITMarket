import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Card, CardHeader, CardContent, Avatar, CardMedia, Typography, Button, Divider, Chip, Modal } from '@mui/material';
import * as Icons from '@mui/icons-material';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import styled from '@emotion/styled';

import MainFrame from '@/components/mainFrame';
import ItemCard from './itemCard';
import ReplyCard from './replyCard';

import { getPost } from '@/Utils/api'
import { changeTimeShow } from '@/Utils/timeTool'

import { editFavorite } from '@/Utils/api'

import { editPost } from '@/Utils/api'
// import * as Icons from '@mui/icons-material';
import { MinioHost as Host } from '@/Utils/axios_instance'


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

// const Host = 'http://39.107.83.124:9000/'

const MarketDetailPage = ({
    kind
}) => {

    const { postId } = useParams();

    const navigator = useNavigate();

    const [detail, setDetail] = useState(null);

    const [items, setItems] = useState([]);

    const [replies, setReplies] = useState([]);

    const [images, setImages] = useState([]); // [url1, url2, ...

    const [ownerMode, setOwnerMode] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            const data = await getPost(postId);
            const promises = data.pics.map(async (pic) => {
                try {
                    const pictureData = await fetch(Host + pic);
                    const data = await pictureData.body.getReader().read();
                    return new TextDecoder().decode(data.value);
                } catch (error) {
                    throw error;
                }
            });
            const images = await Promise.all(promises);
            setImages(images);
            setDetail({
                author: data.userName,
                title: data.title,
                content: data.text,
                date: data.date,
                isFavorite: data.is_favorite,
                pictures: data.pics,
                location: data.location,
                status: data.status,
            })
            setItems(data.items);
            setReplies(data.replies);
            setOwnerMode(data.own);
        }
        loadData();
    }, []);


    const handleChangeStatus = (index) => (status) => {
        const newItems = items.map((item, i) => {
            if (item.iid === index) {
                return { ...item, status: status };
            }
            return item;
        });
        // net Request
        const changeItemStatus = async () => {
            const res = await editPost({
                pid: postId,
                items: newItems,
                status: 1,
            });
            if (res.err === 1) {
                return;
            }
            setItems(newItems);
        }
        changeItemStatus();
    };

    const handleChangeStatusOfPost = (status) => {
        // net Request
        const changePostStatus = async () => {
            const res = await editPost({
                pid: postId,
                items: [],
                status: 2,
            });
            if (res.err === 1) {
                return;
            }
            window.history.back();
        }
        changePostStatus();
    };

    return (
        <MainFrame needNavigator={false} pageState={kind === 'buy' ? 'market' : 'sell'}  >
            {/* <h1>MarketDetailPage</h1> */}
            {/* content */}
            <div className="sticky top-0 w-full flex justify-between items-center z-10 pt-2.5 pb-2.5 pl-5 pr-5 bg-white">
                <Button className="focus:outline-none" onClick={() => {
                    window.history.back();
                }}
                >
                    <Icons.Close />
                </Button>
                <Typography variant="h6" component="div" color='black'  >
                    {kind === 'buy' ? '商品详情' : '求购详情'}
                </Typography>
                <Button className="focus:outline-none" onClick={() => {
                    editFavorite(postId, detail.isFavorite ? 'remove' : 'add');
                    setDetail({ ...detail, isFavorite: !detail.isFavorite });
                }}
                >
                    {
                        detail?.isFavorite ?
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
                            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                {detail?.author?.[0]}
                            </Avatar>
                        }
                        sx={{ textAlign: 'left' }}
                        title={
                            <div className='flex flex-row justify-between' >
                                <p>{detail?.author}</p>
                                {
                                    ownerMode === true && <div onClick={() => setModalOpen(true)}>
                                        <Icons.DeleteOutline style={{ color: 'red' }} />
                                    </div>
                                }

                            </div>
                        }
                        subheader={changeTimeShow(detail?.date)}
                    />
                    <Divider />
                    <CardContent className="flex flex-col items-start" >
                        <Typography variant="h6" color="black">
                            {detail?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                            {detail?.content}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <PhotoProvider>
                            <ImageGalleryContainer>
                                {images.map((picture, index) => {
                                    // console.log('39.107.83.124:9000/' + picture);
                                    return (
                                        <PhotoView
                                            src={picture}
                                        >
                                            <Image src={picture} style={{ objectFit: 'cover', width: '100px', height: '100px' }} />
                                        </PhotoView>
                                    );
                                })}
                            </ImageGalleryContainer>
                        </PhotoProvider>
                    </CardContent>
                </Card>
                {/* 物品卡片 */}
                <div style={{ padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }} >
                    {
                        items?.map((item, index) => (
                            <ItemCard
                                item={item}
                                OwnerMode={ownerMode}
                                changeStatus={(status) => {
                                    handleChangeStatus(item.iid)(status)
                                }}
                            />
                        ))
                    }
                </div>
                {/* 评论区 */}

                {
                    ownerMode === true && <Card sx={{ width: '90vw', marginTop: '20px', boxShadow: 'none' }} >
                        <CardContent>
                            <Typography variant="h7" color="black">
                                回复
                            </Typography>
                        </CardContent>
                    </Card>

                }
                {replies.map((reply, index) => (
                    <ReplyCard reply={reply} />
                ))}
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }} >
                    已经到底了
                </Typography>
                <div className="h-20" />
                <div className="fixed bottom-0" >
                    <Button onClick={() => navigator('/newReply/' + postId)} sx={{
                        width: '100vw', backgroundColor: 'white',
                        height: '50px'
                    }} >
                        <Typography variant="h6">
                            发表回复！
                        </Typography>
                    </Button>
                </div>

            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} >
                <div style={{ width: '100vw', border: 'none', height: '100vh' }} className='flex justify-center items-center' >
                    <Card sx={{ width: '90vw', marginTop: '20px', boxShadow: 'none' }} >
                        <CardContent>
                            <Typography variant="h7" color="black">
                                是否要关闭帖子？
                            </Typography>
                        </CardContent>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '10px' }} >
                            <Button onClick={() => setModalOpen(false)} sx={{ width: '40vw' }} >
                                <Typography variant="h7" color="black">
                                    取消
                                </Typography>
                            </Button>
                            <Button onClick={() => handleChangeStatusOfPost()} sx={{ width: '40vw' }} >
                                <Typography variant="h7" color="black">
                                    确认
                                </Typography>
                            </Button>
                        </div>
                    </Card>
                </div>
            </Modal>
        </MainFrame >
    );

};

export default MarketDetailPage;