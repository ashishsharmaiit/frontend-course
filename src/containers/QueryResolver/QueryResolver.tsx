import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';

export class MessageDto {
    isUser: boolean;
    content: string;
  
    constructor(isUser: boolean, content: string) {
      this.isUser = isUser;
      this.content = content;
    }
}

export function QueryResolver() {
    const { courseContent } = useAppSelector(state => state.courseReducer);

    const [messageInput, setMessageInput] = useState("")

    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const [messages, setMessages] = useState<Array<MessageDto>>(new Array<MessageDto>());

    const createNewMessage = (content: string, isUser: boolean) => {
        const newMessage = new MessageDto(isUser, content);
        return newMessage;
    };

    const sendMessage = async () => {
        setIsWaiting(true);

        messages.push(createNewMessage(messageInput, true));
        setMessages([...messages]);

        const response = await fetch('http://localhost:8083/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({course_content: courseContent, query: messageInput}), // body data type must match "Content-Type" header
        });

        if (response.ok) { // Checks if the response status is 2xx
            const jsonResponse = await response.json();
            console.log('Parsed JSON response:', jsonResponse);
            
            // Directly access courseContent without assuming an error field
            if (jsonResponse && jsonResponse.response) {
                console.log('Received response:', jsonResponse.response);
                messages.push(createNewMessage(messageInput, false));
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
        <ChatContainer>
            <ChatWrapper>
              {
                messages.length > 0 && messages.map((message, index) => (
                  <div key={index} style={{ background: message.isUser ? "FFFFFF" : "#000000", padding: "12px", marginBottom: "12px" }}>
                    {message.content.split("\n").map((text, index) => (
                      message.isUser ?
                        <div key={index}>
                          {text}
                          <br key={index} />
                        </div> :
                        <div key={index} className="assistant">
                          <pre>{text}</pre>
                        </div>
                    ))}
                  </div>
                ))}
            </ChatWrapper>
            <div className='inputWrapper'>
              <FormItem style={{ marginBottom: "0px", marginRight: "12px" }}>
                <input name="message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} disabled={isWaiting} />
                <SendButton onClick={sendMessage} disabled={isWaiting}>Send</SendButton>
              </FormItem>
            </div>
        </ChatContainer>
    );
}

const ChatContainer = styled.div`
  flex: 3;
  position: relative;
  height: calc(100vh - 60px);
  .inputWrapper {
    position: sticky;
    bottom: 0;
    right: 20px;
    width: 100%;
    left: 0;
  }
`

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  textarea, select, input {
    padding: 1rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
  }
`

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background-color: #d32f2f;
  }
`

const ChatWrapper = styled.div`
  height: calc(100vh - 170px);
  overflow-y: auto;
  .assistant {
    pre {
      color: #FFFFFF;
      white-space: pre-wrap;
    }
  }
  
`