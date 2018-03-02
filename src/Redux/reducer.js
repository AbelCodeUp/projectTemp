
//第一个参数可以设置状态的默认值，主要需要返回状态,返回值是什么，状态就是什么

const reducer = (state={shareNum:0,isYou:false,isShow:false},action)=>{
	switch(action.type){
		case 'CHANGE_SHOW':
			if(action.isYou){
				state.isShow=true;
				state.shareNum = action.shareNum;
			}else{
				state.isShow=false;
				state.shareNum = action.shareNum;
			}
			return state;
			break;
		default :
			return state;
			break;		
	}
	
}

export default reducer;