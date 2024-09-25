const path = require('path');
const config = require('./config');
const http = require('http');
const PORT = Number(process.env.PORT) || 8000
const { requireJS, retrivePlugins, client } = require('./lib');
async function initialize() {
 const s = http.createServer((req,res)=>{res.write("bot on");res.end()});
 s.listen(PORT, ()=>console.log("server on"));
 await requireJS(path.join(__dirname, '/lib/Client/database/'));
 console.log('Syncing Database');
 await config.DATABASE.sync();
 console.log('⬇  Installing Plugins...');
 await requireJS(path.join(__dirname, '/plugins/'));
 await retrivePlugins();
 return await client();
}

initialize();
