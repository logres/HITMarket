import { Card, CardContent, TextField, Chip, Typography, Button, Switch } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useState } from 'react';


import Daily from '@/assets/icons/daily.svg?react';


const categoryToIcon = (category) => {
    switch (category) {
        case 'daily':
            return <Daily style={{ width: '30px', height: '30px' }} />;
        case 'electronic':
            return <Icons.PhoneAndroid sx={{ width: '30px', height: '30px', }} />;
        case 'book':
            return <Icons.MenuBook sx={{ width: '30px', height: '30px' }} />;
        case 'other':
            return <Icons.Menu sx={{ width: '30px', height: '30px' }} />;
        default:
            return <Icons.Menu sx={{ width: '30px', height: '30px' }} />;
    }
}

const categoryToChinese = (category) => {
    switch (category) {
        case 'daily': return '生活用品';
        case 'book': return '书籍';
        case 'electronic': return '电子产品';
        // case 'other': return '其他';
        default: return '其他';
    }
}

const ItemCard = ({
    item,
    OwnerMode = false,
    changeStatus,
}) => {

    console.log(item);

    return (
        <Card sx={{ width: '90vw', borderRadius: '10px', boxShadow: 'none' }}>
            <CardContent >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexDirection: 'row' }} >
                    <div className='flex flex-column flex-start gap-2 ' >
                        <div>
                            {/* <Icons.TabletMac sx={{ width: '30px', height: '30px' }} /> */}
                            {categoryToIcon(item?.category)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                            <Typography variant="h6" component="div" >
                                {item?.name}
                            </Typography>
                            <Typography variant="h7" component="div" color="gray">
                                {item?.text}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }} >


                        {
                            OwnerMode === false ? (
                                <div className='flex flex-row items-center gap-2' >
                                    <Icons.Circle style={{ color: 'green', height: 12, width: 12 }} />
                                    <Typography variant="h7" component="div">
                                        {item?.status === 1 ? '待售' : '已下架'}
                                    </Typography>
                                </div>
                            ) : (
                                <div className='flex flex-row items-center gap-2' >
                                    <Typography variant="h7" component="div">
                                        {item?.status === 1 ? '待售' : '已下架'}
                                    </Typography>
                                    <Switch checked={item?.status === 1} onChange={() => changeStatus(
                                        item?.status === 1 ? 2 : 1
                                    )} />
                                </div>
                            )
                        }
                        <Typography variant="h5" sx={{ color: 'red' }} component="div">
                            {'￥' + item?.price}
                        </Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexDirection: 'row', marginTop: '20px' }} >
                    {/* <Chip label={item?.category} /> */}
                    <Typography color='#6183C2' >
                        {'# ' + categoryToChinese(item?.category)}
                    </Typography>
                    <Typography variant="h7" component="div">
                        {`${item.want_cnt}人想要`}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )

}

export default ItemCard;