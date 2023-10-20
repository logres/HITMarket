import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomTextField from '@/components/TextField';

import { Typography, Button, Card, Chip, CardContent, TextField, Switch } from '@mui/material';
import * as Icons from '@mui/icons-material';

import MainFrame from '@/components/mainFrame';
import ItemCard from './itemCard';
import ImageBlock, { AddBlock } from '@/components/imageBlock';

import { publishReply, getPost } from '@/Utils/api';

const NewReplyPage = () => {

    const { postId } = useParams();

    const [content, setContent] = useState('');
    const [pictures, setPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);
    const navigator = useNavigate();
    const [isPublishing, setIsPublishing] = useState(false);
    const [published, setPublished] = useState(false);


    useEffect(() => {
        if (!isPublishing && published) {
            window.history.back();
        }
    }, [isPublishing, published]);

    const makePost = () => {
        const publish = async () => {
            setIsPublishing(true);
            const res = await publishReply({
                pid: postId,
                text: content,
                items: totalItems.filter((item) => {
                    return item.checked
                }).map((item) => {
                    return {
                        iid: item.iid,
                        price: item.price,
                    }
                }),
                pictures: pictures,
            })
            if (res.err === 0) {
                setPublished(true);
            }
            setIsPublishing(false);
        }
        publish();
        window.history.back();
    }

    const [totalItems, setTotalItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await getPost(postId);
            const data_with_checked = data.items.map((item) => {
                return {
                    ...item,
                    checked: false,
                }
            });
            setTotalItems(data_with_checked);
        }
        loadData();
    }, []);

    const handlePictureAdd = (picture) => {
        setPictures([...pictures, { pictureID: pictureIndex, picture: picture }]);
        setPictureIndex(pictureIndex + 1);
    }

    const handlePictureRemove = (index) => {
        const newPictures = pictures.filter((picture, i) => picture.pictureID !== index);
        setPictures(newPictures);
    }


    return (
        <MainFrame needNavigator={false} >
            {published && <p>发布中...</p>}
            <div className="sticky top-0 w-full flex justify-between items-center z-10 pt-2.5 pb-2.5 pl-5 pr-5 bg-white">
                <Button className="focus:outline-none" onClick={() => {
                    window.history.back();
                }}
                >
                    <Icons.Close />
                </Button>
                <Button className="focus:outline-none" onClick={makePost} >
                    <Typography variant="h6" component="div">
                        发布
                    </Typography>
                </Button>
            </div>
            <div style={{
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Card style={{ color: 'black', width: '90vw', padding: '10px', marginTop: '10px' }} >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}  >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                            <div className='flex flex-col items-start' >
                                <Typography sx={{ fontSize: '18px', marginBottom: '10px' }}>
                                    内容
                                </Typography>
                                <TextField multiline value={content} onChange={(e) => setContent(e.target.value)} placeholder='内容' minRows={4}
                                    inputProps={{
                                        style: {
                                            width: '80vw',
                                            fontSize: '16px',
                                        },
                                    }}
                                />
                            </div>
                        </div>


                        {/* 图片 */}
                        <div className='flex justify-start w-full'>
                            <div className='flex flex-wrap justify-start' style={{ width: '80%', gap: '10px 10px' }} >
                                {
                                    pictures.map((picture, index) => {
                                        return <ImageBlock imageUrl={picture.picture} onDelete={() => handlePictureRemove(picture.pictureID)} />
                                    })
                                }
                                <AddBlock onAdd={handlePictureAdd} />
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {
                    totalItems.map((item, index) =>
                        <div style={{ width: '90vw', marginTop: '20px' }} >
                            <ItemCard
                                pid={item.pid}
                                status={item.status === 1 ? 'valid' : 'invalid'}
                                name={item.name}
                                price={item.price}
                                checked={item.checked}
                                makeCheck={() => {
                                    const newItems = totalItems.map((item) => {
                                        if (item.iid === totalItems[index].iid) {
                                            return {
                                                ...item,
                                                checked: !item.checked,
                                            }
                                        }
                                        return item;
                                    });
                                    setTotalItems(newItems);
                                }}
                                setPrice={(price) => {
                                    const newItems = totalItems.map((item) => {
                                        if (item.iid === totalItems[index].iid) {
                                            return {
                                                ...item,
                                                price: price,
                                            }
                                        }
                                        return item;
                                    })
                                    setTotalItems(newItems);
                                }}

                            />
                        </div>)
                }
            </div>
        </MainFrame>
    )
};

export default NewReplyPage;