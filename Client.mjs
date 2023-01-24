import net from 'net'
const client = new net.Socket();

const port = 3434
const host = "127.0.0.1"

client.connect(port, host);

client.on('data', (data)=>{
    console.log(data.toString().trim());
});

client.on('connect',()=>{
    process.stdin.on('data',(data)=>{
        client.write(data.toString().trim());
    });
});

client.on('error', (err)=>{
    console.log("SERVER ERROR");
});

client.on('close',()=>{
    console.log("SERVER EXIT");
    process.exit(0);
});
