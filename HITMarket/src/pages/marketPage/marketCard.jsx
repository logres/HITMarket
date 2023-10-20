import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { red } from '@mui/material/colors';
import ImageBlock from '@/components/imageBlock';
import { changeTimeShow } from '@/Utils/timeTool'
import { MinioHost as Host } from '@/Utils/axios_instance'


// const Host = 'http://39.107.83.124:9000/'

const PostCard = (
    {
        onClick = () => { },
        item,
    }
) => {

    const loadPicture = async (pic) => {
        try {
            const pictureData = await fetch(Host + pic);
            const data = await pictureData.body.getReader().read();
            return new TextDecoder().decode(data.value);
        } catch (error) {
            throw error;
        }
    };

    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const promises = item.pictures.map(loadPicture);
            const local_images = await Promise.all(promises);
            setImages(local_images);
        }
        loadData();
    }, []);


    return (
        <Card className="w-[90vw]" sx={{
            margin: '5px', backgroundColor: '#FFFFFF', border: '2px solid #FFF', borderRadius: '10px', boxShadow: 'none', padding: '16px',
        }} onClick={onClick}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.userName[0]}
                    </Avatar>
                }
                sx={{
                    // Left align
                    textAlign: 'left',
                    padding: '0px',
                    marginBottom: '5px',
                }}
                title={item.userName}
                subheader={changeTimeShow(item.time)}
            />
            <Divider />
            <CardContent className="flex flex-col items-start" style={{ paddingLeft: '0px' }}  >
                <Typography variant="h7" color="black">
                    {item.title}
                </Typography>
            </CardContent>
            <div className='flex flex-row' >
                {
                    images.map((image, index) => {
                        return <ImageBlock key={index} imageUrl={image} needDelete={false} />
                    })
                }
            </div>

        </Card>
    );
}

export default PostCard;