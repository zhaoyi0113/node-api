const spawn = require('child_process').spawn;
const console = require('console')


module.exports = (function(){

  let mongo

  const on = (data)=>{
    console.log(`stdout: ${data}`);
  }

  const error = (data) => {
    console.log(`stderr: ${data}`);
  }

  return {

     connect: function(hostname, port){
      console.log('hostname '+hostname+',port '+port)
      mongo = spawn('mongo', ['--host',hostname,'--port',port])

      mongo.stdout.on('data', (data) => {

        on(data)
      });

      mongo.stderr.on('data', (data) => {
        error(data)
      });

      mongo.stdin.write('show dbs\n')
    },



    command: function(command){
      mongo.stdin.write(`${command}\n`)
    }
  }
}())
