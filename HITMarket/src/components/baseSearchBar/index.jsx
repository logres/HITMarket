import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';

const SearchBox = ({
    value = '',
    onChange = (value) => { },
}) => {
    return (
        <div className='flex justify-between' style={{ width: '90vw' }} >
            <Autocomplete
                freeSolo
                options={[]}
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
            />
            <Button onClick={() => {
                onChange('');
            }}
                // disableRipple
                className='focus:outline-none'
            >
                Cancel
            </Button>
        </div>
    );
};

export default SearchBox;
