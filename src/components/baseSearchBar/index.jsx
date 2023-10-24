import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';

const SearchBox = ({
    value = '',
    onChange = (value) => { },
    placeholder = '请输入关键词',
}) => {
    return (
        <div className='flex justify-between' style={{ width: '90vw' }} >
            {/* <Autocomplete
                freeSolo
                options={[]}
                value={value}
                onChange={(e, value) => {
                    console.log(value);
                    onChange(value);
                }}
                sx={{
                    width: '80vw',
                    backgroundColor: '#FFFFFF',
                    '& .MuiOutlinedInput-root': {
                        height: '33px'
                    },
                    '& .MuiAutocomplete-input': {
                        height: '20px'
                    }
                }}
                disableClearable
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        size='small'
                    />
                )}
            /> */}
            <TextField value={value} onChange={(e) => onChange(e.target.value)} placeholder='请输入关键词' size='small' sx={{
                width: '80vw',
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-root': {
                    height: '33px'
                },
                '& .MuiAutocomplete-input': {
                    height: '20px'
                }
            }} />
            <Button onClick={() => {
                onChange('');
            }}
                // disableRipple
                className='focus:outline-none'
            >
                取消
            </Button>
        </div>
    );
};

export default SearchBox;
