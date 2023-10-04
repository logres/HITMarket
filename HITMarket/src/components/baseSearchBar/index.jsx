import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SearchBox = ({
    onChange = (value) => { },
}) => {
    return (
        <Autocomplete
            freeSolo
            options={[]}
            onChange={(e, value) => {
                console.log(value);
                onChange(value);
            }}
            sx={{
                width: '90vw',
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-root':{
                    height:'33px'
                },
                '& .MuiAutocomplete-input':{
                    height:'20px'
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
    );
};

export default SearchBox;
