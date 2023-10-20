
import { useEffect, useState } from "react";
import { Chip, Divider, Typography, Card, CardContent, Avatar, CardHeader } from "@mui/material";

import { PhotoProvider, PhotoView } from 'react-photo-view';
import { changeTimeShow } from '@/Utils/timeTool'
import styled from '@emotion/styled';


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

const Host = 'http://39.107.83.124:9000/'

const loadPicture = async (pic) => {
    try {
        const pictureData = await fetch(Host + pic);
        const data = await pictureData.body.getReader().read();
        return new TextDecoder().decode(data.value);
    } catch (error) {
        throw error;
    }
};

const ReplyCard = ({
    reply
}) => {


    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const promises = reply.pics.map(loadPicture);
            const local_images = await Promise.all(promises);
            setImages(local_images);
        }
        loadData();
    }, []);


    return (
        <Card sx={{ width: '90vw', marginTop: '10px', boxShadow: 'none' }} >
            <CardHeader
                avatar={
                    <div>
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe"
                            onClick={() => navigator('/personInfo/' + reply.uid)}
                        >
                            {reply.userName}
                        </Avatar></div>

                }
                sx={{ textAlign: 'left' }}
                title={reply.userName}
                subheader={changeTimeShow(reply.date)}
            />
            <Divider />
            {
                reply?.text && <CardContent className="flex flex-col items-start" >
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                        {reply?.text}
                    </Typography>
                </CardContent>
            }

            <CardContent style={{ paddingBottom: '10px' }} >
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
                <div className='flex flex-start' style={{ whiteSpace: 'wrap', gap: '10px' }}>
                    {reply?.items?.map?.((item) => {
                        return (
                            <Chip label={
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}  >
                                    <div>
                                        {item.name}
                                    </div>
                                    <div style={{ width: '20px' }} />
                                    <div style={{ color: 'red' }} >
                                        {'￥' + item.price}
                                    </div>
                                </div>
                            }
                                style={
                                    {
                                        marginTop: '5px',
                                    }
                                }
                            />
                        )
                    })}
                </div>
            </CardContent>


        </Card>
    )
}

export default ReplyCard;