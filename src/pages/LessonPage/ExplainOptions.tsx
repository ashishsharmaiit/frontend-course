import { Box, List, ListItemButton, ListItemText } from "@mui/material";

export default function ExplainOptions({clickExplain, clickResolver, top, left} : {clickExplain?: () => void, clickResolver?: () => void, top: number, left: number}) {
    return (
        <Box sx={{
            z: 10,
            position: 'absolute', 
            top: top, 
            left: left,
            boxShadow: 3,
            bgcolor: '#FFF',
            borderRadius: "10px"}}>
            <List>
                <ListItemButton onClick={clickExplain}>
                    <ListItemText primary="Explain" />
                </ListItemButton>
                <ListItemButton onClick={clickResolver}>
                    <ListItemText primary="Ask AI" />
                </ListItemButton>
            </List>
        </Box>
    );
}