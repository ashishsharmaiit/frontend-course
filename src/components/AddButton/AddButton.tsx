import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


export default function AddButton({height, width, onClick} : {height: string, width: string, onClick?: () => void}) {
    return (
        <IconButton onClick={onClick} sx={{
            height: `${height}`,
            width: `${width}`,
            bgcolor: "#727675",
            borderRadius: "9px"
        }}>
            <AddIcon style={{
                color: "#FFF", 
                fontSize: "15px", 
                fontWeight: "700"}}>    
            </AddIcon>
        </IconButton>
    );
}