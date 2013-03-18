/************************* 验证注册用户名是否符合规定 ****************************/
function loginMobileBlur(){
	var loginMobile = $('#loginMobile').val();
	var loginTel = $("#loginTel");
	var loginMobileReg = /^13[0-9]{9}|14[57]\d{8}|15[012356789]\d{8}|18[01256789]\d{8}$/;
	if(loginMobile == ""){
		loginTel.html("手机号码不能为空!");
		loginTel.removeClass("zhengque");
		loginTel.addClass("error");
	}
	else if((loginMobile.length != 11) || (!loginMobileReg.test(loginMobile))){
		loginTel.html("请输入有效的手机号码!");	
		loginTel.removeClass("zhengque");
		loginTel.addClass("error");
	}
	else{
		ajax({
			url:TERMINAL_URL+'/jsonweb/user/register/0/validateTel',
			type:'post',//非必须.默认get
			data:{loginTel:loginMobile},
			dataType:'json',//非必须.默认text
			async:true,//非必须.默认true
			cache:false,//非必须.默认false
			timeout:30000,//非必须.默认30秒
			error:loginMobileBlurError, //非必须
			success:loginMobileBlurSuccess//非必须		
		});
	}
}

function loginMobileBlurError(returnData){}

function loginMobileBlurSuccess(returnData){
	var loginTel = $("#loginTel");
	var validateCode = $("#validateCode");
	if(returnData.msgCode == "2"){
		loginTel.html("手机号码已被注册,如忘记密码可致电客服!");
		loginTel.removeClass("zhengque");
		loginTel.addClass("error");
		validateCode.val("");	
		validateCode.removeClass("error");
		validateCode.addClass("zhengque");					
		refreshimg();					
      }
      else if(returnData.msgCode == "1"){
   	   loginTel.html("手机号码填写正确。");
   	   loginTel.removeClass("error");	
   	   loginTel.addClass("zhengque");
      }
      else if(returnData.msgCode == "2"){
   	   loginTel.html("请求超时，请稍后重试！");
   	   loginTel.removeClass("zhengque");	
   	   loginTel.addClass("error");
      }
}
/************************* 验证注册密码是否符合规定 ****************************/
function loginPasswordBlur(){
	var loginPassword = $('#loginPassword').val();
	var pwdMsg = $("#pwdMsg");

	if(loginPassword.length < 6){
		pwdMsg.html("密码不能小于6位!");	
		pwdMsg.removeClass("zhengque");
		pwdMsg.addClass("error");
	}
	else if(loginPassword == ''){
		$('#password1').val("");
		pwdMsg.html("密码不能为空!");
		pwdMsg.removeClass("zhengque");
		pwdMsg.addClass("error");	
	}
	else{
		pwdMsg.html("密码格式填写正确。");
		pwdMsg.removeClass("error");	
		pwdMsg.addClass("zhengque");
	}				
}
/************************* 验证确认密码是否符合规定 ****************************/
function confirmPasswordBlur(){
	var loginPassword = $('#loginPassword').val();
	var confirmPassword = $('#confirmPassword').val();
	var userPwds = $("#userPwds");
	if(confirmPassword == ''){
		userPwds.html("确认密码不能为空!");	
		userPwds.removeClass("zhengque");
		userPwds.addClass("error");	
	}
	else if(loginPassword != confirmPassword){
		userPwds.html("确认密码与原密码不一致!");	
		userPwds.removeClass("zhengque");
		userPwds.addClass("error");	
	}
	else{
		userPwds.html("确认密码正确。");
		userPwds.removeClass("error");
		userPwds.addClass("zhengque");	
	}
}
/************************* 验证确认密码是否符合规定 ****************************/
function loginEmailBlur(){
	var loginEmail = $('#loginEmail').val();;
	var emlMsg = $('#emlMsg');
	var loginEmailReg=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;				
	if(loginEmail == ""){
		emlMsg.html("邮箱地址不能为空!");	
		emlMsg.removeClass("zhengque");
		emlMsg.addClass("error");
	}
	if(!loginEmailReg.test(loginEmail)){
		emlMsg.html("请输入正确的邮箱格式!");
		emlMsg.removeClass("zhengque");	
		emlMsg.addClass("error");
	}
	else{
		ajax({
			url:TERMINAL_URL+'/jsonweb/user/register/0/validateEmail',
			type:'post',//非必须.默认get
			data:{loginEmail:loginEmail},
			dataType:'json',//非必须.默认text
			async:true,//非必须.默认true
			cache:false,//非必须.默认false
			timeout:30000,//非必须.默认30秒
			error:loginEmailBlurError, //非必须
			success:loginEmailBlurSuccess//非必须					
		});				
	}				
}

function loginEmailBlurSuccess(returnData){
	 var emlMsg = $('#emlMsg');
	 var validateCode = $('#validateCode');
	 if(returnData.msgCode == "2"){
      	emlMsg.html("邮箱已被注册!");
		emlMsg.removeClass("zhengque");	
		emlMsg.addClass("error");
		validateCode.val("");
		validateCode.removeClass("error");
		validateCode.addClass("zhengque");	
		refreshimg();
      }
      else if(returnData.msgCode == "1"){								      	
		emlMsg.html("邮箱填写正确。");	
		emlMsg.removeClass("error");
		emlMsg.addClass("zhengque");
      }
      else if(returnData.msgCode == "3"){								      	
		emlMsg.html("请求超时，请稍后重试！");	
		emlMsg.removeClass("zhengque");
		emlMsg.addClass("error");
	  }
}

function loginEmailBlurError(returnData){}

/************************* 验证码是否正确 ****************************/
function validateCodeBlur(){
	var validateCode = $.trim($("#validateCode").val());
	var codeMsg = $("#codeMsg");
	if(validateCode == ""){
		codeMsg.html("请输入验证码!");
		codeMsg.removeClass("zhengque");
		codeMsg.addClass("error");
	}
	else if(validateCode != getCookie("_truevc")){
		codeMsg.html("验证码错误!");
		codeMsg.removeClass("zhengque");
		codeMsg.addClass("error");
	}
	else{
		codeMsg.html("验证码填写正确!");
		codeMsg.removeClass("error");
		codeMsg.addClass("zhengque");
	}
	
}
/********************************************** 验证登录函数  ***************************************************/
function validateLoginUser(formData, jqForm, options){
	var loginMobile = $.trim($("#loginMobile").val());
	var loginPassword = $.trim($("#loginPassword").val());
	var confirmPassword = $.trim($("#confirmPassword").val());
	var loginEmail = $.trim($("#loginEmail").val());
	var validateCode = $.trim($("#validateCode").val());
	
	var loginTel = $("#loginTel");
	var pwdMsg = $("#pwdMsg");
	var userPwds = $("#userPwds");
	var codeMsg = $("#codeMsg");
	
	var loginEmailReg=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var loginMobileReg = /^13[0-9]{9}|14[57]\d{8}|15[012356789]\d{8}|18[01256789]\d{8}$/;
	if(loginMobile == ""){
		loginTel.html("请输入手机号码!");
		loginTel.removeClass("zhengque");
		loginTel.addClass("error");
		return false;
	}
	if((loginMobile.length != 11) || (!loginMobileReg.test(loginMobile))){
		loginTel.html("请输入有效的手机号码!");	
		loginTel.removeClass("zhengque");
		loginTel.addClass("error");
		return false;
	}
	if(loginPassword == ""){
		pwdMsg.html("请输入密码!");
		pwdMsg.removeClass("zhengque");
		pwdMsg.addClass("error");
		return false;
	}
	if(loginPassword.length < 6){
		pwdMsg.html("密码不能小于6位!");	
		pwdMsg.removeClass("zhengque");
		pwdMsg.addClass("error");
		return false;
	}
	if(confirmPassword == ""){
		userPwds.html("请输入密码!");
		userPwds.removeClass("zhengque");
		userPwds.addClass("error");
		return false;
	}
	if(confirmPassword != loginPassword){
		userPwds.html("确认密码与原密码不一致!");	
		userPwds.removeClass("zhengque");
		userPwds.addClass("error");
		return false;
	}
	if(loginEmail == ""){
		emlMsg.html("请输入邮箱地址!");
		emlMsg.removeClass("zhengque");
		emlMsg.addClass("error");
		return false;
	}
	if(!loginEmailReg.test(loginEmail)){
 		emlMsg.html("请输入正确的邮箱格式!");
 		emlMsg.removeClass("zhengque");	
 		emlMsg.addClass("error");
 		return false;
 	}
	if(validateCode == ""){
		codeMsg.html("请输入验证码!");
		codeMsg.removeClass("zhengque");
		codeMsg.addClass("error");
		return false;
	}
 	if(validateCode != getCookie("_truevc")){
		codeMsg.html("验证码错误!");
		codeMsg.removeClass("zhengque");
		codeMsg.addClass("error");
		return false;
	} 
	if($("#agreen").attr("checked")!="checked"){
		alert('您必须已阅读，理解并接受佰供网会员注册协议才能注册成为会员！');
		return false;
	}
	_divShowAndHide(2);
	_curShow(2);
	_loadProvince();
}

	
/********************************************** 验证码上刷新 ***************************************************/
function refreshimg(){
	var img = document.getElementById("imgValidatecode");
	img.src = TERMINAL_URL+"/jsonweb/common/validatecode?t=" + new Date();
}
