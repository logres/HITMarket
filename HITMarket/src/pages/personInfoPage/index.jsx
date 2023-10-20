import React, { useEffect, useState } from 'react';
import { MainFrame } from '@/components/mainFrame';
import { Card, CardContent, Button, Typography, TextField, Avatar } from '@mui/material';
import * as Icons from '@mui/icons-material';
import CustomTextField from '@/components/TextField';
import { getPersonInfo, editPersonInfo } from '@/Utils/api';
import { useParams } from 'react-router-dom';

const PersonInfoPage = ({

}) => {

    const { userId } = useParams();

    const readOnly = userId == '-1' ? false : true;

    const [mode, setMode] = useState('view');

    const [name, setName] = useState('');
    const [QQ, setQQ] = useState('');
    const [weChat, setWeChat] = useState('');
    const [signature, setSignature] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            const data = await getPersonInfo(
                userId
            );
            setQQ(data.qq);
            setWeChat(data.wx);
            setSignature(data.signature);
            setPhonenumber(data.phone);
            setName(data.name);
        }
        if (mode === 'view') {
            getInfo();
        }
    }, [mode])


    const handleEdit = () => {
        const editInfo = async () => {
            await editPersonInfo({
                QQ: QQ,
                weChat: weChat,
                signature: signature,
                phone: phonenumber,
            });
            setMode('view');
        }
        editInfo();

    }


    const ViewModeContent = () => {
        return (
            <>
                <div className='flex flex-row items-center justify-start'>
                    <Typography sx={{ fontSize: '18px' }} color='grey'>
                        个性签名:
                    </Typography>
                    <Typography sx={{ fontSize: '18px' }}>
                        {signature}
                    </Typography>
                </div>
                <div className='flex flex-row items-start justify-start' >
                    <Typography sx={{ fontSize: '18px' }} color='grey'>
                        QQ:
                    </Typography>
                    <Typography sx={{ fontSize: '18px' }}>
                        {QQ}
                    </Typography>
                </div>
                <div className='flex flex-row items-start justify-start' >
                    <Typography sx={{ fontSize: '18px' }} color='grey'>
                        微信:
                    </Typography>
                    <Typography sx={{ fontSize: '18px' }}>
                        {weChat}
                    </Typography>
                </div>
                <div className='flex flex-row items-center justify-start' >
                    <Typography sx={{ fontSize: '18px' }} color='grey'>
                        电话:
                    </Typography>
                    <Typography sx={{ fontSize: '18px' }}>
                        {phonenumber}
                    </Typography>
                </div>
            </>
        )
    }

    const EditModeContent = () => {
        return (
            <>
                <div className='flex flex-col items-start' >
                    <Typography sx={{ fontSize: '18px' }}>
                        个性签名
                    </Typography>
                    <CustomTextField sx={{ marginBottom: '10px' }} value={signature} onChange={(e, value) => {
                        setSignature(e.target.value);
                    }
                    } placeholder='个性签名' />
                </div>
                <div className='flex flex-col items-start' >
                    <Typography sx={{ fontSize: '18px' }}>
                        QQ
                    </Typography>
                    <CustomTextField sx={{ marginBottom: '10px' }} value={QQ} onChange={(e, value) => setQQ(e.target.value)} placeholder='QQ' />
                </div>
                <div className='flex flex-col items-start' >
                    <Typography sx={{ fontSize: '18px' }}>
                        微信
                    </Typography>
                    <CustomTextField sx={{ marginBottom: '10px' }} value={weChat} onChange={(e, value) => setWeChat(e.target.value)} placeholder='微信' />
                </div>
                <div className='flex flex-col items-start' >
                    <Typography sx={{ fontSize: '18px' }}>
                        电话
                    </Typography>
                    <CustomTextField sx={{ marginBottom: '10px' }} value={phonenumber} onChange={(e, value) => setPhonenumber(e.target.value)} placeholder='电话' />
                </div>
            </>
        )
    }


    return (
        <MainFrame needNavigator={false} >
            {/* QQ Loaction Wechat signature phonenumber*/}
            {/* <div className="flex justify-center items-center"> */}

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }} >

                <Card sx={{ width: '90vw', marginTop: '20px', height: '90vh', boxShadow: 'none' }} >
                    <div className="sticky top-0 w-full flex justify-between items-center z-10 pt-2.5 pb-2.5 pl-5 pr-5 bg-white">
                        <Button className="focus:outline-none" onClick={() => {
                            window.history.back();
                        }}
                        >
                            <Icons.Close />
                        </Button>
                        {
                            readOnly ? null : <Button className="focus:outline-none" onClick={() => {
                                if (mode === 'view') setMode('edit');
                                else handleEdit();
                            }} >
                                <Typography variant="h6" component="div">
                                    {mode === 'view' ? '编辑' : '保存'}
                                </Typography>
                            </Button>
                        }
                    </div>
                    <div className='flex justify-center items-center' style={{ height: '20vh' }} >
                        <Avatar sx={{ height: '15vh', width: '15vh' }}>
                            {name?.charAt(0)}
                        </Avatar>
                    </div>
                    <div className='flex flex-col justify-start items-center ' style={{ width: '100%' }} >
                        {mode === 'view' ? ViewModeContent() : EditModeContent()}
                    </div>
                </Card>
            </div>

        </MainFrame>
    )
}

export default PersonInfoPage;