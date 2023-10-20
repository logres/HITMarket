import MainFrame from '@/components/mainFrame';
import { Card, CardContent, CardHeader, List, ListItem, Avatar, Typography, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { getPersonInfo } from '@/Utils/api';
import { useEffect, useState } from 'react';

const MinePage = () => {

    const [name, setName] = useState('');
    const [signature, setSignature] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            const data = await getPersonInfo();
            setName(data.name);
            setSignature(data.signature);
        }
        getInfo();
    }, []);

    const navigator = useNavigate();

    return (
        <MainFrame pageState={'mine'} >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Card sx={{ width: '90vw', marginTop: '20px', height: 'calc( 100vh - 100px)' }} >
                    <CardContent>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }} >
                            <Avatar sx={{ width: 50, height: 50, marginRight: '20px' }} >
                                {name?.[0]}
                            </Avatar>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }} >
                                <Typography variant="h6" component="div">
                                    {name}
                                </Typography>
                                <Typography variant="h8" component="div">
                                    {signature}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent sx={{ border: 'none', padding: '0px', paddingBottom: '0px !important' }} >
                        <List sx={{ padding: '0' }} >
                            <ListItemButton sx={{ borderRadius: '10px', height: '60px', border: 'none' }} onClick={() => { navigator('/personInfo/-1') }} >
                                <ListItemIcon>
                                    <Icons.PermIdentity />
                                </ListItemIcon>
                                <ListItemText primary="个人信息" />
                                <ListItemIcon>
                                    <Icons.ArrowForwardIos />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton sx={{ borderRadius: '10px', height: '60px', border: '2px solid #' }} onClick={() => { navigator('/favorite') }} >
                                <ListItemIcon>
                                    <Icons.FavoriteBorder />
                                </ListItemIcon>
                                <ListItemText primary="收藏" />
                                <ListItemIcon>
                                    <Icons.ArrowForwardIos />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton sx={{ borderRadius: '10px', height: '60px', border: '2px solid #' }} onClick={() => { navigator('/myPost') }} >
                                <ListItemIcon>
                                    <Icons.Article />
                                </ListItemIcon>
                                <ListItemText primary="我的贴子" />
                                <ListItemIcon>
                                    <Icons.ArrowForwardIos />
                                </ListItemIcon>
                            </ListItemButton>

                        </List>
                    </CardContent>
                </Card>
            </div>
        </MainFrame>
    );
}

export default MinePage;