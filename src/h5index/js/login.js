		var isPhone=false;
		var isPs=false;
		var isYan=false;
		var flag1=true;
		var flag2=true;
		var daojishit1=0;
		var daojishit2=0;
		var num1=60;
		var num2=60;
		//var urls = 'http://learnapi.gogo-talk.com:8333/'//正式
		var urls = 'http://49.4.128.115:803/'//测试
		
		$('.qiangbao').click(function(){			
			$(".denlvbox").css('height',$(window).height()).show();
			$(".registerbox").show();
			$(".loginbox").hide();
			$(".resetbox").hide();
			$(".confirmBox").hide();
			formYan('#regPhone','#regPs','#registerBtn','#regYanzhen','#yanzhenNum')
		})		

		$(".loginShow").click(function(){//切换到登录
			$(".registerbox").hide();
			$(".loginbox").show();
			$(".resetbox").hide();
			$(".confirmBox").hide();
			formYan('#logPhone','#logPs','#loginBtn');
			cleanFn('#regPhone','#regPs','#registerBtn','#regYanzhen');
		})
		$(".registerShow").click(function(){// 切换到注册
			$(".registerbox").show();
			$(".loginbox").hide();
			$(".resetbox").hide();
			$(".confirmBox").hide();
			cleanFn('#logPhone','#logPs','#loginBtn');
			formYan('#resetPhone','#resetPs','#resetBtn','#resetYan');			
		})
		$(".resetShow").click(function(){//切换到重置密码
			$(".loginbox").hide();
			$(".resetbox").show();
			$(".confirmBox").hide();
			formYan('#resetPhone','#resetPs','#resetBtn','#resetYan','#yanzhenNum2');
			cleanFn('#logPhone','#logPs','#loginBtn');
		})
		$(".denlvbox").on('click',function(e){//弹层的关闭
			if($(e.target).hasClass('denlvbox')){
				$(this).hide();
				$(".registerbox").show();
			}
		})
		$(".confirmWord").click(function(){//切换到确认订单
			$(".confirmBox").hide();
			$(".loginbox").show();
		})
		//倒计时
		function daojishi(phone,obj,type){
		    $(phone).prop('disabled',true).css({'background':'#fff'});
		    if(type==1){
		    	daojishit1 = setInterval(function(){
			        num1--;
			        $(obj).html(num1+'s后重新获取').removeClass("yanzhenma-active");
			        //$(".yanzhenma").unbind('click');
			        if(num1<=0){
			            clearInterval(daojishit1);
			            num1 = 60;
			            $(obj).html('获取验证码').addClass("yanzhenma-active");
			            $(phone).prop('disabled',false).css({'background':'#fff'});
			     		flag1 = true;
			        }
			    },1000)
		    }else if(type==2){
		    	daojishit2 = setInterval(function(){
			        num2--;
			        $(obj).html(num2+'s后重新获取').removeClass("yanzhenma-active");
			        //$(".yanzhenma").unbind('click');
			        if(num2<=0){
			            clearInterval(daojishit2);
			            num2 = 60;
			            $(obj).html('获取验证码').addClass("yanzhenma-active");
			            $(phone).prop('disabled',false).css({'background':'#fff'});
			     		flag2 = true;
			        }
			    },1000)
		    }
		    
		}

		function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }

		//清空
		function cleanFn(phone,ps,queren,regyan){
			var argumentsObj = arguments;
			$(phone).val('');
			$(phone).parent('.formbox').removeClass('formbox_active');
			$(phone).nextAll('.error').hide().html('');
			$(ps).val('');
			$(ps).parent('.formbox').removeClass('formbox_active');
			$(ps).nextAll('.error').hide().html('');
			if(argumentsObj.length==4){
				$(regyan).val('');
				$(regyan).parent('.formbox').removeClass('formbox_active');
				$(regyan).nextAll('.error').hide().html('');
			}			
			$(queren).removeClass('register_active')
		}
		function formYan(phone,ps,queren,regYan,huoqu){//表单验证
		    var argumentsObj = arguments;
		    $(phone).blur(function(){
		        var reg = /^1[0-9]{10}$/;
		        var val = $(this).val();
		        if(val == ""){
		        	$(phone).parent('.formbox').addClass('formbox_active');
		        	$(phone).nextAll('.error').show().html('手机号不能为空!');
		        }else{
		            if(!reg.test(val)){
		            	isPhone=false;
		                $(phone).parent('.formbox').addClass('formbox_active');
			        	$(phone).nextAll('.error').show().html('手机号只能是11位的数字!');
		            }else{
		            	isPhone=true;
		                $(phone).parent('.formbox').removeClass('formbox_active');
			        	$(phone).nextAll('.error').hide().html('');
		            }
		        }
		    })
		    $(phone).keyup(function(){
		    	var reg = /^1[0-9]{10}$/;
		        var val = $(this).val();
		        if(reg.test(val)){
		        	isPhone=true;
		        }else{
		        	isPhone=false;
		        }
		        if(isPhone){
		        	$(huoqu).addClass('yanzhenNum')
		        }else{
		        	$(huoqu).removeClass('yanzhenNum')
		        }

		        if(argumentsObj.length >= 4){
		        	if(isPhone && isPs && isYan){
		        		$(queren).addClass('register_active')
		        	}else{
		        		$(queren).removeClass('register_active')
		        	}
		        }else{
		        	if(isPhone && isPs){
		        		$(queren).addClass('register_active')
		        	}else{
		        		$(queren).removeClass('register_active')
		        	}
		        }
		    })

		    $(ps).blur(function(){
		        var reg = /^[0-9a-zA-Z]{6,}$/;
		        var val = $(this).val();
		        if(val == ""){
		        	isPs=false;
		            $(ps).parent('.formbox').addClass('formbox_active');
		        	$(ps).nextAll('.error').show().html('密码不能为空!');
		        }else{
		            if(!reg.test(val)){
		            	isPs=false;
		                $(ps).parent('.formbox').addClass('formbox_active');
			        	$(ps).nextAll('.error').show().html('密码只能是数字或字母!');
		            }else{	
		            	isPs=true;	
		            	$(ps).parent('.formbox').removeClass('formbox_active');
			        	$(ps).nextAll('.error').hide().html('');
		            }
		        }
		    })
		    $(ps).keyup(function(){
		    	var reg = /^[0-9a-zA-Z]{6,}$/;
		        var val = $(this).val();
		        if(reg.test(val)){
		        	isPs=true;
		        }else{
		        	isPs=false;
		        }
		        if(argumentsObj.length >= 4){
		        	if(isPhone && isPs && isYan){
		        		$(queren).addClass('register_active')
		        	}else{
		        		$(queren).removeClass('register_active')
		        	}
		        }else{
		        	if(isPhone && isPs){
		        		$(queren).addClass('register_active')
		        	}else{
		        		$(queren).removeClass('register_active')
		        	}
		        }
		    })

		    $(regYan).blur(function(){
		        var reg = /^[0-9]{4}$/;
		        var val = $(this).val();
		        if(val == ""){
		        	isYan=false
		            $(regYan).parent('.formbox').addClass('formbox_active');
		        	$(regYan).nextAll('.error').show().html('验证码不能为空!');
		        }else{
		            if(!reg.test(val)){
		            	isYan=false;
		                $(regYan).parent('.formbox').addClass('formbox_active');
			        	$(regYan).nextAll('.error').show().html('验证码只能是4位的数字!');
		            }else{	
		            	isYan=true;	
		            	$(regYan).parent('.formbox').removeClass('formbox_active');
			        	$(regYan).nextAll('.error').hide().html('');
		            }
		        }
		    })
		    $(regYan).keyup(function(){
		    	var reg = /^[0-9]{4}$/;
		        var val = $(this).val();
		        if(reg.test(val)){
		        	isYan=true;
		        }else{
		        	isYan=false;
		        }
		        if(argumentsObj.length >= 4){
		        	if(isPhone && isPs && isYan){
		        		$(queren).addClass('register_active')
		        	}else{
		        		$(queren).removeClass('register_active')
		        	}
		        }else{
		        	if(isPhone && isPs){
		        		$(queren).addClass('register_active')
		        	}else{
		        		$(queren).removeClass('register_active')
		        	}
		        }
		    })
		}

		
		$("#yanzhenNum").click(function(){//注册 
			if(flag1){
				flag1=false;
				if($(this).hasClass('yanzhenNum')){
					num1=60;
					daojishi('#regPhone','#yanzhenNum',1);
					$.get(urls+'api/Register/GOgotalk_SendPhoneCode',{
						Phone:$('#regPhone').val()+"code="+GetCookie("openId")
					},function(data){
						if(data.result == 1){
							$("#yanzhenNum").html("获取验证码").removeClass("yanzhenNum");

						}
					})
					
				}
			}
		})
		$("#yanzhenNum2").click(function(){//重置密码
			if(flag2){
				flag2=false;
				if($(this).hasClass('yanzhenNum')){
					num2=60;
					daojishi('#resetPhone','#yanzhenNum2',2);
					$.get(urls+'api/Register/SendPhoneCodeByPwd',{
						Phone:$('#regPhone').val()
					},function(data){
						if(data.result == 1){
							$(".yanzhenNum2").html("获取验证码").removeClass("yanzhenNum");
						}
					})
				}
			}
			
		})



		function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)return unescape(r[2]);
			return null;
		}
		var access_code = GetQueryString('code');
		if (access_code != null && access_code != "") {
			jQuery.get(urls+"api/User/LoginByWeChat?code=" + access_code, data => {
				if (data.result == 1) {//新用户
					var openid = data.msg;
					document.cookie = "openId=" + openid;
				}
				else if (data.result == 2) {//已注册的用户
					document.cookie = "Tonken=" + data.data.userToken;
				}else if(data.result>=1000){//tonken过期
					document.cookie = "Tonken="+'';
					window.location.reload();
				}
			})
		} else {
			var curUrl = location.href;
			var url = "https://open.weixin.qq.com/connect/oauth2/authorize";
			url += "?appid=wxcd96ac91c795045f&redirect_uri=" + encodeURIComponent(curUrl) + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
			location.href = url;
		}
		//注册
		$("#registerBtn").click(function(){			
			$.get(urls+'api/Register/UserRegister',{
				Phone:$('#regPhone').val(),
				Code:$('#regYanzhen').val(),
				OpenId:GetCookie('openId'),
				Password:$('#regPs').val()
			},data=>{
				if(data.result==2){
					$(".registerbox").hide();
					$(".confirmBox").show();
				}else{
					alert(data.msg);
				}
			})
		})

		//登录
		$("#loginBtn").click(function(){
			$.post(urls+'api/Register/Login',{
				UserName:$('#logPhone').val(),
				Password:$('#logPs').val()
			},data=>{
				if(data.result==2){
					$(".loginbox").hide();
					$(".confirmBox").show();
				}else{
					alert(data.msg);
				}
			})
		})
