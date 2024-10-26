const http=require("http")
const fs=require("fs");
const url=require("url")

const server=http.createServer((req,res)=>{
    if(req.url =="/favicon.ico" ) return res.end();
    const myUrl=url.parse(req.url,true);
    console.log(myUrl)
    const value=`\n${Date.now()}: ${myUrl.pathname} ; Requested from ${req.headers["user-agent"]}`
    fs.appendFile("log.txt",value,(err)=>{})
    switch(req.url){
        case "/": res.end("Hello home");break;
        case "/": res.end("Hello home");break;
        case "/about":res.end("I am sadath");break;
        default:res.end("nothing found");
    }
})

server.listen(8010,(failure,success)=>{
    if(failure) console.log("server start failed: ",failure)
    else console.log('Server Started')
})