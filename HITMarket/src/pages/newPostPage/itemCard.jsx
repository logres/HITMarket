import { Card, CardContent, TextField } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useState } from 'react';


const ItemCard = ({
    item,
    setItemValue,
    removeSelf
}) => {

    const [mode, setMode] = useState('edit');

    if (mode === 'view') {
        return (
            <Card>
                <div>
                    <Icons.Edit onClick={() => setMode('edit')} />
                    <Icons.Delete onClick={() => removeSelf()} />
                </div>
                <CardContent>
                    物品名称 {item.name}
                </CardContent>
                <CardContent>
                    物品名称 {item.price}
                </CardContent>
                <CardContent>
                    物品名称 {item.description}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardContent>
                <div>
                    <Icons.Done onClick={() => setMode('view')} />
                    <Icons.Delete onClick={() => removeSelf()} />
                </div>
                <div>
                    物品名称 <TextField value={item.name} onChange={(e) => setItemValue('name', e.target.value)} />
                </div>
                <div>
                    价格 <TextField value={item.price} onChange={(e) => setItemValue('price', e.target.value)} />
                </div>
                <div>
                    备注 <TextField value={item.description} onChange={(e) => setItemValue('description', e.target.value)} />
                </div>
            </CardContent>
        </Card>
    )
}

export default ItemCard;