'use client'

import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
// import { cookies } from 'next/headers'

export default function ChatView() {
    const [socketio, setSocketIo] = useState(null)
    const [listchat, setListchat] = useState([])
    useEffect(() => {
        const socket = io("http://localhost:3001/");
        socket.on("send-message-response", (response) => {
            // TAMBAHAN
            const receiver = JSON.parse(localStorage.getItem('chat'))
            console.log(receiver);

            if (
                (receiver.username === response[0].sender) ||
                (receiver.username === response[0].receiver)
            ) {
                setListchat(response)
            }
        })
        setSocketIo(socket)
    }, []);


    const [message, setMessage] = useState()
    const onSubmitMessage = (e) => {
        e.preventDefault()
        // cookies().set('x-access-token', jsonResponse.access_token)
        // const user = cookies().get('x-access-token')
        const user = localStorage.setItem('chat', JSON.stringify(item));
        console.log(user);

        // TAMBAHAN
        const payload = {
            sender: user.sender,
            receiver: user.receiver,
            message,
        }

        setListchat([...listchat, payload])

        const data = {
            sender: user._id,
            receiver: activeReceiver.id,
            message,
        }

        socketio.emit('send-message', data);

        setMessage('')
    }

    const [listuser, setListUser] = useState([])
    const [login, setLogin] = useState({})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('chat'))
        setLogin(user)
        axios.get(`http://localhost:3001/getProfile`)
            .then((response) => {
                setListUser(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const [activeReceiver, setActiveReceiver] = useState({})
    const selectReceiver = (item) => {
        //TAMBAHAN MERESET CHAT
        setListchat([])

        setActiveReceiver(item)

        //TAMBAHAN
        localStorage.setItem('receiver', JSON.stringify(item));
        socketio.emit('join-room', login.data)

        const data = {
            sender: login.data.id,
            receiver: item.id
        }

        console.log(data)

        socketio.emit('chat-history', data)
    }


    return (
        <>

            {/* <h1>Halaman Chat {login.data && login.data.username} </h1> */}


            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', width: '80%' }}>
                    <div style={{ width: '20%', marginRight: '10px' }}>
                        {
                            listuser.map((item, index) => (
                                item.id !== login.id ? (
                                    <div key={index}>
                                        <button onClick={() => selectReceiver(item)} style={{ border: 'none', width: '100%', height: '30px', marginBottom: '4px' }} type="button">
                                            {
                                                item.username
                                            }
                                        </button>
                                    </div>
                                ) : null
                            ))
                        }
                    </div>
                    <div style={{ width: '80%', height: '400px', overflow: 'scroll', border: '1px solid #ccc' }}>
                        <div style={{ backgroundColor: 'blue', color: 'white' }}>
                            {activeReceiver.username}
                        </div>
                        {
                            listchat.map((item, index) => (
                                <div key={index}>
                                    {/* TAMBAHAN */}
                                    {
                                        item.sender == login.data.username ? (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <div style={{
                                                    padding: '10px',
                                                    backgroundColor: 'blue',
                                                    color: 'white'
                                                }}>
                                                    {item.message}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start'
                                            }}>
                                                {item.message}
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <form onSubmit={onSubmitMessage}>
                        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} style={{ width: '400px', height: '40px' }} />
                        <button style={{ height: '40px', width: '100px' }} type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}