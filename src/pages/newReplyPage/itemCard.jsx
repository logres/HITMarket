import { Card, CardContent, TextField, Chip, Typography, Button, Checkbox } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useState } from 'react';

import CustomTextField from '@/components/TextField';

const ItemCard = ({
    name = '无名12321123213',
    status = 'valid',
    checked = false,
    makeCheck = () => { },
    price = '1000',
    setPrice = () => { },
}) => {

    return (
        <Card sx={{ width: '90vw', borderRadius: '10px', boxShadow: 'none' }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexDirection: 'row' }} >
                    <div style={{ width: '70vw' }}>
                        <div className='flex flex-row items-center' >
                            <div style={{ width: '20vw', textAlign: 'left', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} >
                                {name}
                            </div>
                            {
                                status === 'invalid' ? <div style={{ color: 'red' }} >
                                    已下架
                                </div> : <CustomTextField value={"￥" + price} onChange={(e) => setPrice(e.target.value.slice(1))} width={'50vw'} />
                            }

                        </div>
                    </div>
                    <div style={{}} >
                        <Checkbox onChange={makeCheck} checked={checked} disabled={status === 'invalid'} />
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

export default ItemCard;