import { TextField } from "@mui/material"

const CustomTextField = ({
    height = '10px',
    width = '80vw',
    fontSize = '16px',
    ...props
}) => {
    return (
        <TextField
            {...props}
            inputProps={{
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