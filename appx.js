var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	
server.listen(3000);

app.get('/FW.BIN', function(req, res) {
	res.sendfile(__dirname + '/fw.bin');
	
});
app.get('/', function(req, res) {
	res.send('OK');
	
});



//MQTT
var mqtt = require('mqtt')
var option = {
	port: 18622,
	username: "available",
	password: "available",
}
var client = mqtt.connect('mqtt://m12.cloudmqtt.com', option)

client.on('connect', function() {
	client.subscribe('available'); //sub topic
	//client.publish('test', 'HELLO OOO')
	console.log('Tinh trang');
	console.log(client.connected);
})

//client.on

//console.log('Trang thai connect:');
//console.log(client.connected);


client.on('message', function(topic, message) {
	console.log(message.toString())
	io.sockets.emit('new message', message.toString());
	//client.end()
})

/* io.sockets.on('connection', function(socket_x) { //lang nghe neu thay connnection thi chay
	socket_x.on('send message', function(data) { //khi nao nhan duoc bien "send message" thi gan vao bien "new message"
		io.sockets.emit('new message', data);
	});
	
	
}) */;


/* var i=0;

//io.sockets.on('connection', function() {
	setInterval(function() {
		i=i+1;
		io.sockets.emit('new message', i);
	}, 3000); */
//});