import net from 'net'
const server = net.createServer()
const users = []
const port = 3434
const host = "192.168.100.246";
const nickname = {};

server.on('connection', (client) => {
    users.push(client) 
    client.write("Bienvenido al chat para conversar")
    if(nickname [client.remoteAddress]=== undefined){
        nickname[client.remoteAddress] = client.remoteAddress;
    }
    client.write("\nPor favor escribe un apodo");
    console.log("\x1b[32m"+`${nickname[client.remoteAddress]} ha entrado al servidor`+"\x1b[0m") 
    client.on('data', (data) => {
        if(nickname[client.remoteAddress]=== client.remoteAddress){
            for(const key in nickname){
                if(nickname[key]=== data.toString().trim()){
                    client.write("El usuario ya está en uso");
                    return;
                }
            }
            nickname[client.remoteAddress] = data.toString().trim();
            client.write("\x1b[34mHola \x1b[33m"+nickname[client.remoteAddress]+ "\x1b[34m bienvenido.\x1b[0m");
            console.log("\x1b[33m"+nickname[client.remoteAddress]+ "\x1b[34m ha cambiado su apodo.\x1b[0m");
            return;
        }
        const remitente = nickname[client.remoteAddress];
        const mensaje = data.toString().trim()
        users.map((un_usuario) => { 
            if(un_usuario.remoteAddress=== client.remoteAddress){
                return;
            }
            un_usuario.write("\x1b[34m"+remitente + ":"+ "\x1b[0m"+"\x1b[1m"+mensaje+ "\x1b[0m")
        })

        console.log("\x1b[33m"+ remitente + ":" + "\x1b[0m"+"\x1b[1m"+mensaje+ "\x1b[0m")

    })

    client.on('close', (err) => {
        if(err){
            return
        }
        users.map((un_usuario) => {
            un_usuario.write("\x1b[31m"+nickname[client.remoteAddress] + " ha salido del servidor"+"\x1b[0m")
        });
        console.log("\x1b[31m"+ nickname[client.remoteAddress] + " ha salido del servidor"+"\x1b[0m")
        delete users[client.remoteAddress];
    })

    client.on('error', (err) => {
            users.map((un_usuario) => {
                un_usuario.write("\x1b[31m"+nickname[client.remoteAddress] + " ha salido del servidor"+"\x1b[0m")
            })
            console.log("\x1b[31m"+ nickname[client.remoteAddress] + " ha salido del servidor"+"\x1b[0m")
            console.error(err)
    })

})

server.on('error', (err) => {
    console.log(err)
})

server.listen(port, host, () => {
    console.log("Servidor a la escucha")
})

server.listen(port, host, () => {
    console.info(`
[Servidor activo en:]
  ip del servidor: ${server.address().address}
  puerto del servidor: ${server.address().port}
`)
})