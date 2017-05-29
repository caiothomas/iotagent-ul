'use strict';

var mqtt = require('mqtt');
var path = require('path');
var fs = require('fs');

//var CERT = fs.readFileSync(path.join(__dirname, 'mqtt_client.crt'));
//var KEY = fs.readFileSync(path.join(__dirname,  'mqtt_client2.key'));
    
//var cafile = fs.readFileSync('/etc/mosquitto/easy/ca.crt');
var CERT = fs.readFileSync('/etc/mosquitto/easy/localhost.server.crt');
var KEY = fs.readFileSync('/etc/mosquitto/easy/localhost.server.key');
var PORT = 1883;

var options = {
  port:  PORT || 8883,
//  key: KEY,
// cert: CERT,
  //cafile: cafile,
  //username: 'figuardian',
  //password: 'ufu',  
  rejectUnauthorized: false
}

var client = mqtt.connect('mqtt://'+"localhost", options);
console.log('MQTT');

client.on('connect', function () {
  console.log('Connected')
});
 

client.subscribe('/apikeyDevice1/sensor01/attrs');
client.subscribe('/apikeyDevice1/sensor01/cmd');

client.on('message', function (topic, message) {  
  console.log("mensagem: [%s]", message);
  if(message){
    var re = new RegExp(/^(.*)+(\@+[a-zA-Z0-9\._-]+)+((\|+[a-zA-Z0-9\._-]+)*)$/);
    var r  = String(message).match(re);     
    if(r){
      if(r[2]=='@turn')
        client.publish("/apikeyDevice1/sensor01/cmdexe", 'sensor01@turn|'+Date.now())
    }    
  }
});

client.on('error', function (err) {
  console.log(err);
  client.end();
})

function send(){
  client.publish('/apikeyDevice1/sensor01/attrs', 'a|'+Math.floor((Math.random() * 100) + 1)+'#t|'+Math.floor((Math.random() * 100) + 1)+"#b|on", {qos: 0, retain: false});  
}

function send2(){
  client.publish('/apikey-mqtt/sensor02/attrs/a', ""+Math.floor((Math.random() * 100) + 1)+"");
}


function send3(){
  client.publish('/apikeyDevice2/sensor03/attrs', 'a|'+Math.floor((Math.random() * 100) + 1)+'#t|'+Math.floor((Math.random() * 100) + 1)+"#b|on", {qos: 0, retain: false});  
}

  

//setTimeout(send, 1000);
//setTimeout(send2, 5000);

setInterval(send,  10000);
setInterval(send3, 7000);

/*
var clienteSimples = mqtt.connect("mqtt://localhost:1883");

clienteSimples.on('connect', function () {
  console.log('[clienteSimples] Connected ')
});

clienteSimples.subscribe('/apikey4/sensor01/attrs');
clienteSimples.publish('/apikey4/sensor01/attrs', 't|'+Math.floor((Math.random() * 100) + 1)+'#p|'+Math.floor((Math.random() * 100) + 1));


clienteSimples.on('message', function (topic, message) {
  console.log("[clienteSimples] msg: [%s]", message);
})

clienteSimples.on('error', function (err) {
  console.log("[clienteSimples]"+err);
  clienteSimples.end();
})

function send2(value){
  clienteSimples.publish('/apikey4/sensor01/attrs', 't|'+Math.floor((Math.random() * 100) + 1)+'#p|'+Math.floor((Math.random() * 100) + 1));
}
setInterval(send2, 1000);
*/

