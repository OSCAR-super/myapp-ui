/**
 * TCP/IP 通信
 * 描述：跟所有相同网段的 ip 进行socket 连接
 * 例如：当前ip:192.168.1.100，则与192.168.1.1 ~ 192.168.1.254的设备建立通信连接
 */
// 引入nodejs os模块
var os = require("os");

//存储 Websocket 对象数组
var websoketArray = [];

//在Electron中直接使用JQuery
if (typeof module === 'object') {window.jQuery = window.$ = module.exports;};

$(function(){
	start();
});

/**
 * 与相同网段建立通信连接
 */
function start(){
	var ip = getIp();
	if(ip != "localhost"){
		//ip = ip.substring(0,10);
		//在线 websoket 测试服务：可直接使用

		websoketArray.push(new createWebsocket("ws://127.0.0.1:8996/socket/1/123/"+localStorage.getItem('token')));
	}
}

/**
 * 获取本机IP
 */
function getIp(){
	var ip = "";
	try{
		//已分配网络地址的网络接口
		var networkArr = os.networkInterfaces();
		for(var network in networkArr){
			var ifaces = networkArr[network];
			for (var i = 0; i < ifaces.length; i++) {
				if(ifaces[i].family === "IPv4" && ifaces[i].address != "127.0.0.1" && !ifaces[i].internal){
					//IPv4地址
					ip = ifaces[i].address;
				}
			}
		}
	}catch(e){
		//TODO handle the exception
		ip = "localhost"
	}
	return ip;
}

/**
 * 定义websocket 对象
 */
function createWebsocket(url){
	
	var ws = new WebSocket(url);
	
	//连接成功回调
	ws.onopen = (evt) => {
		console.log("Conenection open ...");
		$("#chartRoom").append(
			$("<p></p>").text("与 " + url + " 建立连接--成功")
		);
	}
	
	//消息监听
	ws.onmessage = (evt) => {
		console.log("msg");
		document.getElementById('receivedMsg').innerHTML = event.data;
        $("#chartRoom").append(
			$("<p></p>").text(event.data)
		);
	}
	
	//连接失败
	ws.onerror = function(evt){
		$("#chartRoom").append(
			$("<p></p>").text("与 " + url + " 建立连接--失败")
		);
		//关闭连接
		ws.close();
		//移除失败的ws
		websoketArray.splice(websoketArray.indexOf(ws),1);
		console.log("移除 " + url + " 连接");
	}
	return ws;
	
}

/**
 * 消息发送
 * 给所有建立成功的连接发送消息
 */
function sendMsg(){
	//消息内容
	var msg = document.getElementById("sendMsg").value;
	if(msg !== "" && msg !== undefined){
		for(var i = 0; i < websoketArray.length; i++){
			websoketArray[i].send(msg);
			document.getElementById("sendMsg").value = null;
		}
	}
}
