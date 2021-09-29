const {ipcRenderer}  = require('electron')
const {net} = require('electron').remote
//要用到的数据是手机号、密码
var username = document.getElementById('id');
var password = document.getElementById('password');

//登录成功
var sign = document.getElementById('sign_button')
sign.onclick = function (){

	var id = username.value;
	var pwd = password.value;
    let request=net.request({
		method: 'POST',
		protocol: 'http:',
		hostname: '127.0.0.1',
		port: 8996,
		path: '/login/adminLogin',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	  request.on('response',(response)=>{  //监听响应
	
	      response.on('data',(chunk)=>{  //获取返回数据
              var data = JSON.parse(chunk.toString());
              if(data.code) {
				//console.log(data.data.token);
                localStorage.setItem('token',data.data.token);
				localStorage.setItem('username',id);
                //console.log(localStorage.getItem('token'));
				ipcRenderer.send("changepage","to home_page");
              }
              else {
                  alert('密码错误');
              }
	      })
		  
		 // 监听结束
	      response.on('end',()=>{
	        console.log('end');        
	      })
	      
	  })
	  request.write("{'username': "+id+",'password': '"+pwd+"'}");
 	  request.end();
}
