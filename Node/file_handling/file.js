const fs=require("fs")

fs.writeFileSync("./test.txt","helo world")
fs.writeFile("./text2.txt","hello there",(err,result)=>{
    if(err) console.log(err)
    else{
        console.log("The result is: ",result)
    }
})
fs.appendFileSync("./test.txt","\nhello")
console.log(fs.readFileSync("./test.txt","utf-8"))
fs.copyFileSync("./test.txt","./test.cp")
fs.unlinkSync(`./test.txt`)
fs.mkdirSync("sample/01/",{recursive:true})
console.log(fs.statSync("./test.cp"))

// default thread size=4
// max= depends on CPU coderes eg: 8 cores=8 threads