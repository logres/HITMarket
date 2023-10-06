import * as React from 'react';
import { Chip, Typography, CardContent, CardMedia, CardHeader, Card, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import styled from '@emotion/styled'


const MessageCard = (
    props
) => {

    const {
        userName,
        time,
        reply,
        originMessage,
        pictureURI,
        interestedItems,
    } = {
        userName: '罗家乐',
        time: '2023-10-03',
        reply: '内容内容内容,回复回复回复回复回复,回复回复,回复回复,回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复',
        originMessage: '出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad出ipad',
        pictureURI: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=540&hei=540&align=0%2C-1&fmt=jpeg&qlt=90&fit=constrain&.v=1645065732688',
        interestedItems: [

            {
                item: 'AppleOne',
                price: 100
            },
            {
                item: 'AppleTwo',
                price: 200
            },
            {
                item: 'AppleThree',
                price: 300
            }
        ]
    }

    const MultiContentTypography = styled(Typography)`
    text-align: left;
    display: block;
    display: -webkit-box;
    max-width: 100%;
    max-height: 87.5px;
    font-size: 16px;
    line-height: 125%;
    wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;


    return (
        <Card sx={{ width: '90vw', margin: '5px', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)', border: '2px solid #FFF', borderRadius: '10px' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {userName}
                    </Avatar>
                }
                // title={title}
                subheader={time}
            />

            <CardContent>
                <div >
                    <MultiContentTypography>
                        {'回复: ' + reply}
                    </MultiContentTypography>
                </div>

                <div style={{ backgroundColor: '#ebebeb', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px', marginTop: '5px' }} >
                    <MultiContentTypography style={{ fontSize: '14px' }} >
                        {originMessage}
                    </MultiContentTypography>
                </div>

                <div
                    // class='flex justify-center items-center'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginTop: '10px',
                    }}
                >
                    {
                        interestedItems.map((item, index) =>
                            <Chip label={
                                <div style={{
                                    display: 'flex',
                                    // 后处理
                                    width: '35vw',
                                    justifyContent: 'space-between',
                                }}  >
                                    <div>
                                        {index + 1}
                                    </div>
                                    <div>
                                        {item.item}
                                    </div>
                                    <div>
                                        {item.price}
                                    </div>
                                </div>
                            }
                                style={
                                    {
                                        width: '48%',
                                        marginTop: '5px',
                                    }
                                }
                            />
                        )
                    }
                </div>

            </CardContent>
        </Card>
    );
}

export default MessageCard;