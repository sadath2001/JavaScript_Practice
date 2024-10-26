const http=require("http")
const fs=require("fs");
const url=require("url") // for query parameters


// this is my handler code if written in node js manually
// to solve lot of manual stuff we use express
function myHandler(req,res)
{

    if(req.url =="/favicon.ico" ) return res.end();
    const myUrl=url.parse(req.url,true);
    const value=`\n${Date.now()}: ${req.method} ${myUrl.pathname} ; Requested from ${req.headers["user-agent"]}`
    fs.appendFile("log.txt",value,(err)=>{})
    switch(req.url){
        case "/": res.end("Hello home");break;
        case "/": res.end("Hello home");break;
        case "/about":res.end("I am sadath");break;
        case "/signup":if(req.method=='GET'){
        res.end('signup form')
        } break;
        default:res.end("nothing found");
    }

}
const server=http.createServer(myHandler)

server.listen(8010,(failure,success)=>{
    if(failure) console.log("server start failed: ",failure)
    else console.log('Server Started')
})