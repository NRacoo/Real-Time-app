import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'


dotenv.config()
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3001

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],
        credentials: true
    }
})

app.use(cors())
app.use(express.json())

const users = new Map()

io.on("connection", (socket) => {
    console.log("User Terhubung: ", socket.id)

    socket.on("join", (data)=> {
        const {username} = data
        users.set(socket.id, {
            id: socket.id,
            username: username,
            joinedAt: new Date(),
        })
    
        socket.join("general")
    
        socket.to("general").emit("userJoined", {
            username: username,
            users : Array.from(users.values()),
        })
    
        socket.emit("users", Array.from(users.values()))
    
        console.log(`${username} joined chat`)
    })

    socket.on("message", (data)=>{
        const user = users.get(socket.id)

        if(user){
            const messageData = {
                id: Date.now().toString(),
                username: user.username,
                message: data.message,
                timestamp: new Date(),
            }

            io.to("general").emit("message", messageData)

            console.log(`Message from ${user.username}: ${data.message}`)
        }
    })

    socket.on("disconnected", () => {
        const user = users.get(socket.id)

        if(user){
            users.delete(socket.id)

            socket.to("general").emit("userLeft", {
                username: user.username,
                users : Array.from(users.values())
            })

            console.log (`${user.username} has left the chat`)
        }
    })

    socket.on("error", (error) => {
        console.error("Socket Error : ", error)
    })
})

app.get('/api/lobby', (req, res) => {
    res.json(
        {
            status: "OK",
            timestamp: new Date(),
            connectedUsers : users.size,
        })
})

app.get('/api/users', (req, res)=> {
    res.json(
        {
            users: Array.from(users.values()),
            count: users.size
        })
    
})

app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).json({error: "something went wrong"})
})





server.listen(PORT, () => {
    console.log(`Server listen to ${PORT}`)
})  


process.on("SIGTERM", () => {
    console.log("SIGTERM Received, shutting down gracefully")
    server.close(() =>{
        console.log ("server closed")
        process.exit(0)
    })
})