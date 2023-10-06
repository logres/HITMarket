import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import { Typography, Button, Card, Chip, CardContent, TextField } from '@mui/material';
import * as Icons from '@mui/icons-material';

import styled from '@emotion/styled';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import quillEmoji from 'quill-emoji';
import "quill-emoji/dist/quill-emoji.css"; //这个不引入的话会出现emoji框一直在输入框下面的情况

import MainFrame from '@/components/mainFrame';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

const modules = {
    toolbar: [
        // [{ 'font': [] }, { 'header': [] }],
        // ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        // [{ 'color': [] }, { 'background': [] }],
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        // [{ 'align': [] }],
        ['emoji'],
        ['link', 'image'],
        // ['clean']
    ],
    'emoji-toolbar': true,
    // "emoji-textarea": true,
    // "emoji-shortname": true,
};

const formats = ['font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'color', 'background', 'list', 'indent', 'align', 'link', 'image', 'clean', 'emoji'];


Quill.register({
    'formats/emoji': EmojiBlot,
    // 'formats/video': VideoBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji,
}, true);


const StyledChip = styled(Chip)`
    margin: 5px;
    background-color: #F5F5F5;
    width: 70vw;
`


const NewPostPage = () => {


    // const [value, setValue] = useState('');
    const [delta, setDelta] = useState([]);
    const navigator = useNavigate();

    const [items, setItems] = useState([
        {
            name: '手机',
            price: '100'
        },
        {
            name: '平板',
            price: '200'
        }
    ]);

    // console.log(delta);

    const makePost = () => {
        navigator('/market');
        const newDelta = handleDelta(JSON.parse(JSON.stringify(delta)));
        // Upload New Delta
    }

    const handleDelta = (delta) => {
        delta.ops.forEach(element => {
            if (element?.insert?.image) {
                // console.log(element.insert.image);
                const dataToLoad = element.insert.image;
                element.insert.image = 'URI';
            }
        });
        return delta;
    }

    function quillGetHTML(inputDelta) {
        var tempCont = document.createElement("div");
        (new Quill(tempCont)).setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    };

    console.log(quillGetHTML(delta));

    return (
        <MainFrame needNavigator={false} >
            <div className="sticky top-0 w-full flex justify-between items-center z-10 pt-2.5 pb-2.5 bg-white">
                <Button className="focus:outline-none" onClick={() => {
                    window.history.back();
                }}
                >
                    <Icons.Close />
                </Button>
                <Button className="focus:outline-none" onClick={makePost} >
                    <Typography variant="h6" component="div">
                        发布
                    </Typography>
                </Button>
            </div>
            <div style={{
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Card style={{ color: 'black', width: '90vw', padding: '10px', marginTop: '10px' }} >
                    <CardContent>
                        <ReactQuill
                            theme='snow' modules={modules} formats={formats} value={delta} onChange={(content, delta, source, editor) => {
                                setDelta(editor.getContents());
                            }}
                            placeholder='发布内容...'
                        // style={{
                        //     minHeight:'100px'
                        // }}
                        />
                    </CardContent>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            {items.map((item, index) => {
                                return <StyledChip label={item.name} />
                            })}
                            <Button
                                className="focus:outline-none"
                                onClick={() => {
                                    console.log("DSADA");
                                }} >
                                <Icons.Add />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
            {/* <div style={{ textAlign: 'left' }} >
                {parse(quillGetHTML(delta))}
            </div> */}
            {/* CHIP区 */}

        </MainFrame>
    )
};

export default NewPostPage;