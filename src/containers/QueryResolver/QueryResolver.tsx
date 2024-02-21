import { useState } from 'react';
import {
    Box,
    Fab,
    TextField,
    Typography,
    Grid,
    Paper,
    IconButton,
    Stack
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from '../../store';
import CloseButton from '../../components/CloseButton/CloseButton';

export class MessageDto {
    isUser: boolean;
    content: string;
  
    constructor(isUser: boolean, content: string) {
      this.isUser = isUser;
      this.content = content;
    }
}

export function QueryResolver() {
    const { progressStatus, courseContent } = useAppSelector(state => state.course);

    const [messageInput, setMessageInput] = useState("")

    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const [messages, setMessages] = useState<Array<MessageDto>>(new Array<MessageDto>());

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const createNewMessage = (content: string, isUser: boolean) => {
        const newMessage = new MessageDto(isUser, content);
        return newMessage;
    };

    const sendMessage = async () => {
        setIsWaiting(true);

        messages.push(createNewMessage(messageInput, true));
        setMessages([...messages]);

        const progressState = (progressStatus ?? 0).toString()

        const content = courseContent ? courseContent[progressState] : {}

        const response = await fetch('http://localhost:8080/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({course_content: content, query: messageInput}), // body data type must match "Content-Type" header
        });

        if (response.ok) { // Checks if the response status is 2xx
            const jsonResponse = await response.json();
            console.log('Parsed JSON response:', jsonResponse);
            
            // Directly access courseContent without assuming an error field
            if (jsonResponse && jsonResponse.response) {
                console.log('Received response:', jsonResponse.response);
                messages.push(createNewMessage(jsonResponse.response, false));
                setMessages([...messages]);
            } else {
                // Handle the case where courseContent is not as expected
                console.error('Unexpected JSON structure:', jsonResponse);
            }
        } else {
            // Handle HTTP errors
            console.error('HTTP error status:', response.status);
        }

        setIsWaiting(false);
    };

    return (
        <div>
            {!open && (<Fab onClick={handleOpen} variant="extended" sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}>
                Ask AI
            </Fab>)}
            {open && (
                <Box
                    sx={{
                        border: 0.1,
                        height: "80vh",
                        width: "40vh",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        bgcolor: "#F9F9F9",
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }}
                    >
                    <Box sx={{ 
                        borderBottom: 0.1, 
                        p: 2, 
                        backgroundColor: "#F9F9F9", 
                        borderRadius: "10px 10px 0px 0px"}}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography gutterBottom component="div" sx={{
                                    color: "#000",
                                    fontSize: "21px",
                                    fontWeight: "400",
                                    paddingLeft: "8px"
                                }}>
                                Query Resolver
                            </Typography>
                            <CloseButton height={"21px"} width={"21px"} onClick={handleClose}></CloseButton>
                        </Stack>
                    </Box>
                    <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                        {messages.map((message, index) => (
                        <Message key={index} message={message} />
                        ))}
                    </Box>
                    <Box sx={{ borderTop: 0.1, p: 2, backgroundColor: "#F9F9F9", borderRadius: "0px 0px 10px 10px"}}>
                        <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField
                            size="small"
                            fullWidth
                            placeholder="Ask your query here"
                            variant="standard"
                            value={messageInput}
                            InputProps={{ disableUnderline: true }}
                            onChange={(e) => setMessageInput(e.target.value)} 
                            disabled={isWaiting}
                            sx={{
                                fontSize: "20px",
                                bgcolor: "#E1E1E1",
                                borderRadius: "10px",
                                marginLeft: "2px",
                                paddingLeft: "8px",
                                paddingRight: "2px"
                            }}/>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                color="primary"
                                onClick={sendMessage} 
                                disabled={isWaiting}
                            >
                                <SendIcon style={{
                                    color: "#0072EF", 
                                    fontSize: "27px", 
                                    fontWeight: "700"}}>
                                </SendIcon>
                            </IconButton>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </div>
      );
};

const Message = ({ message } : {message : MessageDto}) => {
    const isBot = !message.isUser;
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: isBot ? "flex-start" : "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isBot ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              ml: isBot ? 1 : 0,
              mr: isBot ? 0 : 1,
              backgroundColor: isBot ? "#0072EF" : "#E1E1E1",
              borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
            }}
          >
            {message.content.split("\n").map((text, index) => (
                <Typography key={index} variant="body1" sx={{
                    color: isBot ? "#FFF" : "#000"
                }}>
                    {text}
                </Typography>
            ))}
          </Paper>
        </Box>
      </Box>
    );
};