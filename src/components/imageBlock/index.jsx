import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import * as Icons from '@mui/icons-material';

// function base64ToBlob(base64Data) {
//     const byteCharacters = atob(base64Data.split(",")[1]);
//     const byteArrays = [];

//     for (let i = 0; i < byteCharacters.length; i++) {
//         byteArrays.push(byteCharacters.charCodeAt(i));
//     }

//     const blob = new Blob([new Uint8Array(byteArrays)], { type: "image/png" });
//     return blob;
// }

const ImageBlock = ({ imageUrl, onDelete, width = '20vw', height = '20vw', needDelete = true }) => {
    return (
        <Box position={'relative'} className="focus:outline-none" >
            <img src={imageUrl} alt="Image" style={{ width: width, height: height }} />
            {
                needDelete && <IconButton
                    onClick={onDelete}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: 'red',
                        zIndex: 10,
                    }}
                >
                    <Icons.Delete />
                </IconButton>
            }
        </Box>
    );
};

export const AddBlock = ({ onAdd, width = '20vw', height = '20vw' }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataURL = event.target.result;
            console.log(dataURL);
            onAdd(dataURL);
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Box style={{ border: '1px solid gray', width: width, height: height }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <IconButton onClick={handleClick} style={{ width: width, height: height }} className="focus:outline-none" disableRipple>
                <Icons.Add style={{ transform: 'scale(3,3)' }} />
            </IconButton>
        </Box>
    );
};

export default ImageBlock;
