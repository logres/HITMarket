import * as React from 'react';
import { Chip, Typography, CardContent, CardMedia, CardHeader, Card, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import styled from '@emotion/styled'


import { changeTimeShow } from '@/Utils/timeTool'
import { useNavigate } from 'react-router-dom';


const MessageCard = (
    {
        reply
    }
) => {


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

    const navigator = useNavigate();


    return (
        <Card sx={{ width: '90vw', margin: '5px', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)', border: '2px solid #FFF', borderRadius: '10px' }}
            onClick={() => navigator('/marketDetail/' + reply?.pid)}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {reply?.userName?.[0]}
                    </Avatar>
                }
                sx={{ textAlign: 'left' }}
                title={reply?.userName}
                subheader={changeTimeShow(reply?.date)}
            />

            <CardContent>
                <div >
                    <MultiContentTypography>
                        {'回复: ' + reply.text}
                    </MultiContentTypography>
                </div>

                <div style={{ backgroundColor: '#ebebeb', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px', marginTop: '5px' }} >
                    <MultiContentTypography style={{ fontSize: '14px' }} >
                        {reply.post}
                    </MultiContentTypography>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginTop: '10px',
                    }}
                >
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
                </div>

            </CardContent>
        </Card>
    );
}

export default MessageCard;