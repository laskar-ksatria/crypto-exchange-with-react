import React from 'react';
import ChatBot from 'react-simple-chatbot';

const Chat = () => {

    const [steps, setSteps] = React.useState([
        {
            id: '0',
            message: 'Welcome to chat bot',
            trigger: '1'
        },
        {
            id: '1',
            message: 'Bye!',
            end: true
        }
    ])

    return (
        <div>
            <ChatBot steps={steps} />
        </div>
    )
};

export default Chat;