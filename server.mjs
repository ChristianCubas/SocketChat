import express from 'express'
import { createServer } from 'node:http'
import { cwd } from 'node:process'
import { Server } from 'socket.io'

const puerto = process.env.PORT || 4000
const app = express()
app.use('/css',express.static(cwd()+"/css"))
const server = createServer(app)
const io = new Server(server)

io.on('connection',(socket)=>{
    console.log('usuario conectado')
    socket.on('chat message',(msg)=>{
        io.emit('chat message', msg)
    })
})

app.get('/',(req,res)=>{
    res.sendFile(cwd()+'/index.html')
})

server.listen(puerto,()=>{
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})