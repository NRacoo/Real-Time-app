'use client'

import { useState, useEffect, useRef, ReactElement } from "react";
import {io, type Socket} from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {Send, Users} from "lucide-react"

interface Message {
  id: string,
  username: string,
  message: string,
  timestamp: string,
}

interface user {
  id: string,
  username: string,
}


export default function Home() {
  const [socket, setSocket] = useState <Socket | null>(null)
  const [messages, setMessages] = useState <Message[]> ([])
  const [username, setUsername] = useState ("")
  const [message, setMessage] = useState ("")
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState<user []>([])
  const [hasJoined, setHasJoined] = useState(false)
  const messageHandRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messageHandRef.current?.scrollIntoView({behavior : "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  useEffect(() =>{
    if(hasJoined && username){
      const newSocket = io("http://localhost:3001", {
        transports: ["websocket", "polling"]
      })

      newSocket.on("connect", () => {
        setIsConnected(true)
        newSocket.emit("join", {username})
      })

      newSocket.on("disconnect", () => {
        setIsConnected(false)
      })

      newSocket.on("message", (data : Message) => {
        setMessages((prev) => [...prev, data])
      })

      newSocket.on("UserJoined", (data: {username : string, users: user[]}) =>{
        setUser(data.users)
        setMessages((prev) => [
          ...prev, 
          {
            id: Date.now().toString(),
            username: "System",
            message: `${data.username} joined the chat` ,
            timestamp: new Date().toISOString(),
          },
        ])
      })

      newSocket.on("userLeft", (data : {username : string, users: user[]}) => {
        setUser(data.users)
        setMessages((prev)=> [
          ...prev,{
            id: Date.now().toString(),
            username: "System",
            message: `${data.username} left the chat`,
            timestamp: new Date().toISOString()

          }

        ])
      })

      newSocket.on("users", (user : user[])=>{
        setUser(user)
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }
  }, [hasJoined, username])

  const handleJoin = (e : React.FormEvent) => {
    e.preventDefault()
    if(username.trim()){
      setHasJoined(true)
    }
  }

  const handleSendMessage = (e : React.FormEvent) => {
    e.preventDefault()
    if(message.trim() && socket){
      socket.emit("message", {
        username,
        message: message.trim(),
        timestamp: new Date()
      })  
      setMessage("")
    }
  }

  const formTime = (timestamp : string) =>{
    return new Date(timestamp).toLocaleDateString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

if(!hasJoined){
  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-lime-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary font-bold">
              Join Chat Room
            </CardTitle>
            <p className=" text-gray-600">Enter username to start</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleJoin} className= "space-y-4">
            <Input 
            type = "text"
            placeholder="Masukan username anda"
            value={username}
            onChange={(e : any)=> setUsername(e.target.value)}
            className="text-center"
            maxLength={20}
            required/>
            <Button type="submit" className="w-full"> Join Chat</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-lime-50 p-4">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="p-0 ">
            <CardHeader className="flex px-2 pt-2 items-center gap-2 text-lg">
              <Users className="w-5 h-5">
                Online Users ({user.length})
              </Users>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-2rem)]">
                  <div className="p-4 space-y-2">
                    {user.map((user) => (
                      <div key={user.id}
                      className={`flex items-center gap-3 p-2 rounded-lg
                       ${user.username === username ? "bg-blue-100 border border-blue-200" : "hover:bg-gray-50"}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {user.username}
                          {user.username === username && <span className="text-blue-600 ml-1">(You)</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3  flex flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span>ChatRoom</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-500"}`}/>
                            <span className={`w-2 h-2 rounded-full ${isConnected ? "Connected" : "Disconnected"}`}></span>
                        </div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col p-0">
                      <ScrollArea className="flex-1 p-4">
                          <div className="space-y-4">
                              {messages.map((msg)=>(
                                <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.username === username ? "justify-end" : "justify-start"}`}>
                                   {msg.username !== username && msg.username !== "System" &&(
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className="p-0">{msg.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                   )}

                                   <div
                                   className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.username === "System" ? "bg-gray-100 text-gray-600 text-center text-sm text-italic" : msg.username === username ? "bg-blue-500 text-white" : "bg-white border border-gray-200"}`}>
                                      {msg.username !== "System" && msg.username !== username && (
                                        <div className="text-xs font-semibold text-primary mb-1">
                                          {
                                            msg.username
                                          }
                                        </div>
                                      ) }
                                      <div className="break-words">{msg.message}</div>
                                      <div className={`text-xs mt-1 ${msg.username === username ? "text-blue-100" : "text-gray-500"}`}>
                                        {formTime(msg.timestamp)}
                                      </div>
                                   </div>
                                   {msg.username === username && (
                                    <Avatar>
                                      <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                   )}
                                </div>
                              ))}
                              <div ref={messageHandRef}/>
                          </div>
                      </ScrollArea>
                      <div className="border-t p-4">
                              <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e: any) => setMessage(e.target.value)}
                                className="flex-1"
                                disabled={!isConnected}
                                maxLength={500}/>
                                <Button type="submit" disabled={!message.trim() || !isConnected} size="icon">
                                  <Send className="w-4 h-4"/>
                                </Button>
                              </form> 
                      </div>
                    </CardContent>
          </Card>
          
        </div>
    </div>
  );
}
