//update
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	
server.listen(3000);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
	
});

//Module thời gian
function PRO_TIMES(time) {
	var d = new Date();
	switch(time) {
		case 'giay' : {
			// do some thing
			return d.getSeconds();
			break;
		}
		case 'phut' : {
			// do some thing
			return d.getMinutes();
			break;
		}
		case 'gio' : {
			// do some thing
			return d.getHours();
			break;
		}
		case 'ngay' : {
			// do some thing
			return d.getDay();
			break;
		}
		
	}
}
//File and time

var fs = require('fs');

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
	//console.log('Tinh trang');
	//console.log(client.connected);
	//Hẹn giờ pub
	setInterval(function(){
		sec=PRO_TIMES('giay');
		if(sec==10) {
			console.log('Đến giây rồi '+sec);
			client.publish('available', '*1')
		}
	},1000);

})

client.on('message', function(topic, message) {
	console.log(message.toString())
	//Ghi message
	//
	
	/* var date = new Date();
	savemsg=message.toString()+" - "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	console.log(savemsg);
	if(message.toString()[0]=='!') {
		fs.writeFile('message.json', savemsg);
	} */
	
	//io.sockets.emit('new message', message.toString());
	//client.end()
})


console.log("Đang chạy server")




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