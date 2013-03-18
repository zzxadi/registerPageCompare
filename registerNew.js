/************************* 页面js运行入口 ****************************/
$(document).ready(function() {	
	$('.register_from').delegate('#username', 'blur', validate.usernameBlur)
					   .delegate('#password', 'blur', validate.passwordBlur)
					   .delegate('#repassword', 'blur', validate.repasswordBlur)
					   .delegate('#mobile', 'blur', validate.mobileBlur)
					   .delegate('#email', 'blur', validate.emailBlur)
					   .delegate('#registerButton', 'click', registerSubmit);
    $('.register_tab').delegate('#buyer,#seller', 'click', swithTab);					   
});

var swithTab = function(){
  $(this).attr('class', 'cur').siblings('li').attr('class', '');	
}
	
var validate = (function(){
	 var usernameReg = /^\w{5,25}$/;
	 var passwordReg = /^\w{6,26}$/;	
	 var mobileReg = /^13[0-9]{9}|14[57]\d{8}|15[012356789]\d{8}|18[01256789]\d{8}$/;
	 var emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;	
	 	 	 	
   return {
	   usernameBlur : function(){
			 var username = $('#username').val();
			 var usernameMsg = $('#usernameMsg');	
			 
			 if(usernameReg.test(username)){
				 usernameMsg.attr('class','success');
			 }
			 else{
				 usernameMsg.attr('class','error');
				 return false;
			 }
			 return true;
		  },
	   passwordBlur : function(){
			 var password = $('#password').val();
			 var passwordMsg = $('#passwordMsg');		 
			 
			 if(passwordReg.test(password)){
				 passwordMsg.attr('class','success');
			 }
			 else{
				 passwordMsg.attr('class','error');
				 return false;			 
			 }
			 return true;
		  },
	   repasswordBlur : function(){
			 var repassword = $('#repassword').val();
			 var repasswordMsg = $('#repasswordMsg');		 
			 var password = $('#password').val();
			 
			 if(passwordReg.test(repassword)){
				 repasswordMsg.html('6-26个字符，请使用字母、数字、符号的组合密码').attr('class','success');
			 }
			 else{
				 repasswordMsg.html('6-26个字符，请使用字母、数字、符号的组合密码').attr('class','error');
				 return false;			 
			 }
			 if(repassword == password){
				 repasswordMsg.html('6-26个字符，请使用字母、数字、符号的组合密码').attr('class','success');
			 }
			 else{
				 repasswordMsg.html('确认密码与原始密码不一致！').attr('class','error');
				 return false;			 
			 }		 
			 return true;		 
		  },
	   mobileBlur : function(){
			 var mobile = $('#mobile').val();
			 var mobileMsg = $('#mobileMsg');		 
			 
			 if(mobileReg.test(mobile)){
				 mobileMsg.attr('class','success');
			 }
			 else{
				 mobileMsg.attr('class','error');
				 return false;			 
			 }
			 return true;			 
		  },
	   emailBlur : function(){
			 var email = $('#email').val();
			 var emailMsg = $('#emailMsg');		 
			 
			 if(emailReg.test(email)){
				 emailMsg.attr('class','success');
			 }
			 else{
				 emailMsg.attr('class','error');
				 return false;			 
			 }
			 return true;			 
		  }
   };
})();

var registerSubmit = function(){
   if(!validate.usernameBlur()){
	   return false;
   }
   else if(!validate.passwordBlur()){
	   return false;
   }
   else if(!validate.repasswordBlur()){
	   return false;
   }
   else if(!validate.mobileBlur()){
	   return false;
   }
   else if(!validate.emailBlur()){
	   return false;
   }
   else if($('#treaty').attr('checked') != 'checked'){
	   alert('您必须已阅读，理解并接受佰供网会员注册协议才能注册成为会员！');
	   return false;
   }
 
   showBox('短信获取验证码','register-mng2.html?width=480&height=200&mobile='+($('#mobile').val()));
} 