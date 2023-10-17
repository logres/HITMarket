import { Card, CardContent, TextField, Chip, Typography, Button } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useState } from 'react';



const ItemCard = ({
    item,
    changeStatus,
}) => {

    return (
        <Card sx={{ width: '90vw', borderRadius: '10px', boxShadow: 'none' }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexDirection: 'row' }} >
                    <div className='flex flex-column flex-start gap-2' >
                        <div>
                            <Icons.TabletMac sx={{ width: '50px', height: '50px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                            <Typography variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="h7" component="div">
                                {item.description}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }} >
                        <div className='flex flex-row items-center gap-2' >
                            <Icons.Circle style={{ color: 'green', height: 12, width: 12 }} />
                            <Typography variant="h7" component="div">
                                {item.status}
                            </Typography>
                        </div>
                        <Typography variant="h5" sx={{ color: 'red' }} component="div">
                            {'￥' + item.price}
                        </Typography>
                        <Chip label={item.category} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexDirection: 'row' }} >
                    <div className='flex flex-row flex-wrap gap-2' >
                        {item.bids.map((bid, index) => {
                            return <Chip label={<div className='flex flex-row ' sx={{ alignItems: 'center' }} >
                                <Typography variant="h7" component="div" className='flex flex-row items-center' sx={{ marginRight: '10px' }} >
                                    {bid.name}
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ color: 'red' }}>
                                    {'￥' + bid.price}
                                </Typography>

                            </div>} />;
                        })}
                    </div>
                    <Typography variant="h7" fontWeight="bold" component="div">
                        {`${item.bids.length}人想要`}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )

}

export default ItemCard;