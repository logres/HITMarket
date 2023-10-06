import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import { Typography, Button, Card, Chip, CardContent, TextField } from '@mui/material';
import * as Icons from '@mui/icons-material';

import styled from '@emotion/styled';

import MainFrame from '@/components/mainFrame';
import ItemCard from './itemCard';
import ImageBlock, { AddBlock } from '@/components/imageBlock';

// import ImageUploader from 'react-image-upload'


const NewPostPage = () => {


    // const [value, setValue] = useState('');
    const [content, setContent] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);

    const [items, setItems] = useState([]);
    const [itemIndex, setItemIndex] = useState(0);

    const navigator = useNavigate();

    // console.log(delta);

    const makePost = () => {
        navigator('/market');
        // Upload New Delta
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
        setItems([...items, { editID: itemIndex, name: 'test', price: '100', description: 'test' }]);
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
            <div className="sticky top-0 w-full flex justify-between items-center z-10 pt-2.5 pb-2.5 bg-white">
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
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}  >

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}  >
                            {/* 标题 */}
                            <TextField sx={{ width: '80%', marginBottom: '10px' }} />
                            {/* 内容 */}
                            <TextField multiline sx={{ width: '80%' }} />
                        </div>


                        {/* 图片 */}
                        <div className='flex justify-center'>
                            <div className='flex flex-wrap justify-start' style={{ width: '80%' }} >
                                {
                                    pictures.map((picture, index) => {
                                        return <div className='mr-1.25 ml-1.25' ><ImageBlock imageUrl={picture.picture} onDelete={() => handlePictureRemove(picture.pictureID)} /></div>
                                    })
                                }
                                <div className='mr-1.25 ml-1.25' >
                                    <AddBlock onAdd={handlePictureAdd} />
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>
                {
                    items.map((item, index) => <ItemCard item={item}
                        setItemValue={handleItemEdit(item.editID)}
                        removeSelf={handleItemDelete(item.editID)}
                    />)
                }
            </div>
            <Button className='focus:outline-none' onClick={handleAddItem} >
                <Icons.Add sx={{ transform: 'scale(2,2)' }} />
            </Button>
        </MainFrame>
    )
};

export default NewPostPage;