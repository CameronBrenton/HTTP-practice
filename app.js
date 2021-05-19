const http = require('http');
const fs = require('fs');


port = 3000;
random = Math.floor(Math.random()*1000) + 1;

let server = http.createServer(function(request,response){
    if(request.url === "/"){
        let file = fs.readFileSync("./homepage.html");
        response.write('<h1>HOMEPAGE</h1>');
        response.write(file);
    }else if(request.url === "/about"){
        response.write("THIS IS THE ABOUT PAGE");
    }else if(request.url === "/newFile"){
        fs.writeFileSync(`File${random}.txt`, 'Hello World!', (err) => {
            if (err) throw err;
            console.log(err);
        });
        response.write("New file has been created");
    }else if(request.url === "/overWriteFile"){
        try{
            fs.writeFileSync(`testFile.txt`, 'Hello World!!!');
            response.write("File sucessfully written");
            console.log("File sucessfully written");
        }catch(err){
            if(err == true) {
                response.write("Failed to write file");
                console.log("Failed to write file");
            };
        };
    }else if(request.url.startsWith("/static")){
        try{
            let file = fs.readFileSync("." + request.url + '.txt', 'utf8');
            response.write(`This is the request url: ${request.url}, This is the contents of the file: ${file}`);
        }catch(err){
            if(err){
                response.write("404 File not found!");
                console.log("Error : File not found");
            };
        };
    }response.end();
})

server.listen(3000, (error)=>{
    if(error == true){
        console.log("There was an error");
    }else{
        console.log(`listening on http://localhost:${port}`);
    };
});