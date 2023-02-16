const http = require("http");
const fs = require("fs")
const path = require("path")



const server = http.createServer((req, res) => {
  let filepath;

  const requrl = path.extname(req.url);

  if (requrl == ".js") {
    
    res.writeHead(200, { "Content-type": "text/javascript" });
    filepath = path.join(__dirname, "static", req.url);
  } 
  else {
    
    res.writeHead(200, { "Content-type": "text/html" });
    
    // console.log(res.getHeader("Content-type"))
    filepath = path.join(__dirname, "static", "index.html");
  }
  res.on('finish' , ()=>{
    // console.log("i am finished ")
  })

  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error : File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(3200, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server is running on the port 3200");
  }
});

