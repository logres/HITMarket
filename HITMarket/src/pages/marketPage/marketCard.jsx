import * as React from 'react';
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

const PostCard = (
    {
        onClick = () => { },
        item = {
            userName: '罗家乐',
            title: '出ipad',
            time: '2023-10-03',
            abstractDetail: '女生自用ipad pro 2021, 99新',
            pictureURI: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=540&hei=540&align=0%2C-1&fmt=jpeg&qlt=90&fit=constrain&.v=1645065732688'
        },
    }
) => {
    return (
        <Card className="w-[90vw]" sx={{ margin: '5px', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)', border: '2px solid #FFF', borderRadius: '10px', boxShadow: 'none' }} onClick={onClick}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.userName}
                    </Avatar>
                }
                sx={{
                    // Left align
                    textAlign: 'left',
                }}
                title={item.title}
                subheader={item.time}
            />
            <Divider />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.abstractDetail}
                </Typography>
            </CardContent>
            {
                item.pictureURI ?
                    <CardMedia
                        component="img"
                        sx={{ height: '150px', margin: '0,5,0,5' }}
                        image={item.pictureURI}
                        alt="Paella dish"
                    /> : null
            }
        </Card>
    );
}

export default PostCard;