import net from "net"
const server = net.createServer();

const port = 3434
const host = "127.0.0.1"

server.listen(port, host, ()=>{
    console.log("Servidor activo");
});

server.on("connection", (user)=>{
    console.log(user.remoteAddress);
});

