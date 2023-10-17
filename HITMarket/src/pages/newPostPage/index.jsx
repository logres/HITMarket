import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '@/components/TextField';

import { Typography, Button, Card, Chip, CardContent, TextField, Switch } from '@mui/material';
import * as Icons from '@mui/icons-material';

import MainFrame from '@/components/mainFrame';
import ItemCard from './itemCard';
import ImageBlock, { AddBlock } from '@/components/imageBlock';

import { publishPost } from '@/Utils/api';

const NewPostPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');

    const [pictures, setPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);

    const [items, setItems] = useState([]);
    const [itemIndex, setItemIndex] = useState(0);

    const [kind, setKind] = useState('buy');

    const navigator = useNavigate();
    const [isPublishing, setIsPublishing] = useState(false);
    const [published, setPublished] = useState(false);


    useEffect(() => {
        if (!isPublishing && published) {
            navigator('/market');
        }
    }, [isPublishing, published]);

    const makePost = () => {
        const publish = async () => {
            setIsPublishing(true);
            const res = await publishPost({
                title: title,
                text: content,
                kind: kind,
                items: items,
                pictures: pictures,
                location: location
            })
            if (res.err === 0) {
                setPublished(true);
            }
            setIsPublishing(false);
        }
        publish();
        // navigator('/market');
    }

    const handlePictureAdd = (picture) => {
        setPictures([...pictures, { pictureID: pictureIndex, picture: picture }]);
        setPictureIndex(pictureIndex + 1);
    }

    const handlePictureRemove = (index) => {
        const newPictures = pictures.filter((picture, i) => picture.pictureID !== index);
        setPictures(newPictures);
    }

    const handleAddItem = () => {
        setItems([...items, { editID: itemIndex, name: 'test', price: '100', description: 'test', category: 'other' }]);
        setItemIndex(itemIndex + 1);
    }

    const handleItemEdit = (index) => (key, value) => {
        const newItems = items.map((item, i) => {
            if (item.editID === index) {
                return { ...item, [key]: value };
            }
            return item;
        })
        setItems(newItems);
    };

    const handleItemDelete = (index) => () => {
        const newItems = items.filter((item, i) => item.editID !== index);
        setItems(newItems);
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
                        <div className='flex justify-end items-center'>{kind === 'buy' ? '我想出' : '我想买'}<Switch checked={kind === 'sell'}
                            onChange={() => {
                                if (kind === 'sell') setKind('buy');
                                else setKind('sell')
                            }} /> </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                            <div className='flex flex-col items-start' >
                                <Typography sx={{ fontSize: '18px' }}>
                                    标题
                                </Typography>
                                <CustomTextField sx={{ marginBottom: '10px' }} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='标题' />
                            </div>
                            <div className='flex flex-col items-start' >
                                <Typography sx={{ fontSize: '18px' }}>
                                    交易地点
                                </Typography>
                                <CustomTextField sx={{ marginBottom: '10px' }} value={location} onChange={(e) => setLocation(e.target.value)} placeholder='理想交易地点' />
                            </div>
                            <div className='flex flex-col items-start' >
                                <Typography sx={{ fontSize: '18px' }}>
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
                    items.map((item, index) =>
                        <div style={{ width: '90vw', marginTop: '20px' }} >
                            <ItemCard item={item}
                                setItemValue={handleItemEdit(item.editID)}
                                removeSelf={handleItemDelete(item.editID)}
                            />
                        </div>)
                }
            </div>
            <Button className='focus:outline-none' onClick={handleAddItem}  >
                <Icons.Add sx={{ transform: 'scale(2,2)', marginTop: '20px' }} />
            </Button>
            {/* Loading absolute */}
            {/* <div style={{ position: 'absolute', top: '50vh', left: '50vw', display: isPublishing ? 'block' : 'none' }} >
                <Icons.Circle />
            </div> */}
        </MainFrame>
    )
};

export default NewPostPage;