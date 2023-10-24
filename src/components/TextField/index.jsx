import { TextField, InputAdornment } from "@mui/material"

const CustomTextField = ({
    height = '40px',
    width = '85vw',
    fontSize = '16px',
    endAornment = null,
    ...props
}) => {
    return (
        <TextField
            {...props}
            InputProps={{
                style: {
                    height: height,
                    width: width,
                    fontSize: fontSize
                },
            }}
        />
    )
}

export default CustomTextField;