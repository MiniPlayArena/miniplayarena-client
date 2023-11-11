'use client'

import { useEffect, useState } from 'react';

import Image from 'next/image'
import Pusher from 'pusher-js';

export default function Home() {
  const [clientId, setClientId] = useState(0)
  const [username, setUsername] = useState('Kush')
  const [chats, setChats] = useState([])

  function updateChats(data) {
    console.log(data)
    setChats([...chats, data])
  }

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      encrypted: true
    })

    const channel = pusher.subscribe('test-uno')
    console.info('Connected to test-uno')

    channel.bind('init', data => {
      updateChats(data)
      channel.trigger('')
    });

    return () => {
      // pusher.disconnect();
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Username: {username}</h1>
      {/* {chats.forEach(element => {
        <p>{element}</p>
      })} */}
    </main>
  )
}
