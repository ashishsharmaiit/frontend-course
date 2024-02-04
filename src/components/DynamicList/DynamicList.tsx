import * as React from 'react';
import {
    Box,
    IconButton,
    List,
    ListItem,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TextProp {text: string}

export default function DynamicList({onAddItem, onChange} : {onAddItem: number, onChange: (text: string, countItem: number) => void}) {
    React.useEffect(() => {
        if (onAddItem > serviceList.length) {
            handleServiceAdd();
        }
    }, [onAddItem]);

    const [serviceList, setServiceList] = React.useState<TextProp[]>([]);

    const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const list = [...serviceList];
        list[index].text = event.target.value;
        setServiceList(list);
        onChange(serviceList.map((element) => element.text).join(", "), list.length);
    };

    const handleServiceRemove = (index: number) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
        onChange(serviceList.map((element) => element.text).join(", "), list.length);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { text: "" }]);
    };

    return (
        <Box>
            <List>
            {serviceList.map((element, index) => (
                <ListItem
                    key={index}
                    secondaryAction={
                    <IconButton 
                        onClick={() => handleServiceRemove(index)} 
                        edge="end" 
                        aria-label="delete"
                        sx={{height: "18px", width: "18px"}}>
                            <DeleteIcon />
                    </IconButton>
                }>
                    <TextField 
                        variant="standard"
                        fullWidth 
                        value={element.text}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleServiceChange(event, index)
                        }}
                        InputProps={{ disableUnderline: true }}
                        SelectProps={{ native: true }}
                        sx={{
                            width: "250px",
                            bgcolor: "#FFF",
                            borderRadius: "20px",
                            marginLeft: "2px",
                            paddingLeft: "8px",
                            paddingRight: "2px"
                        }}>
                    </TextField>
                </ListItem>
            ))}
        </List>
        </Box>
    );
}