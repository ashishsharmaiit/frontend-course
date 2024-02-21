import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function CloseButton({height, width, onClick} : {height: string, width: string, onClick?: () => void}) {
    return (
        <IconButton onClick={onClick} sx={{
            height: `${height}`,
            width: `${width}`,
            bgcolor: "#727675",
            '&:hover': {
                backgroundColor: "#727675",
            },
            borderRadius: "10px"
        }}>
            <CloseIcon style={{
                color: "#FFF", 
                fontSize: "15px", 
                fontWeight: "700"}}>    
            </CloseIcon>
        </IconButton>
    );
}