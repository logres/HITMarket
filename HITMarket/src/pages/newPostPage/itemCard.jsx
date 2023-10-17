import { Autocomplete, Card, CardContent, TextField, Typography } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useState } from 'react';
import CustomTextField from '@/components/TextField';

const ItemCard = ({
    item,
    setItemValue,
    removeSelf
}) => {

    const categoryMap = (category) => {
        switch (category) {
            case 'book':
                return '书籍';
            case 'electronic':
                return '电子产品';
            case 'daily':
                return '生活用品';
            default:
                return '其他';
        }
    }

    return (
        <Card sx={{ width: '100%', boxShadow: 'none' }} >
            <CardContent className='flex flex-col justify-start gap-2' >
                <div className='flex justify-end' >
                    {/* <Icons.Done onClick={() => setMode('view')} /> */}
                    <Icons.Delete onClick={() => removeSelf()} />
                </div>
                <div className='flex flex-col items-start ' >
                    <Typography sx={{ fontSize: '18px' }}>
                        物品名称
                    </Typography>
                    <CustomTextField
                        value={item.name} onChange={(e) => setItemValue('name', e.target.value)} />
                </div>
                <div className='flex flex-col items-start gap-2' >
                    <Typography sx={{ fontSize: '18px' }}>
                        价格
                    </Typography>
                    <CustomTextField
                        value={item.price} onChange={(e) => setItemValue('price', e.target.value)} />
                </div>
                <div className='flex flex-col items-start ' >
                    <Typography sx={{ fontSize: '18px' }}>
                        备注
                    </Typography>
                    <CustomTextField value={item.description} onChange={(e) => setItemValue('text', e.target.value)} />
                </div>
                <div className='flex flex-col items-start ' >
                    <Typography sx={{ fontSize: '18px' }}>
                        类别
                    </Typography>
                    <Autocomplete options={[
                        { label: '书籍', value: 'book' },
                        { label: '电子产品', value: 'electronic' },
                        { label: '生活用品', value: 'daily' },
                        { label: '其他', value: 'other' },
                    ]}
                        value={
                            { label: categoryMap(item.category), value: item.category }
                        }
                        onChange={(e, value) => setItemValue('category', value.value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    style: {
                                        height: '40px',
                                        width: '85vw',
                                        fontSize: '16px'
                                    },
                                    readOnly: true,
                                }}
                                size='small'

                            />
                        )}

                    />

                </div>
            </CardContent>
        </Card>
    )
}

export default ItemCard;