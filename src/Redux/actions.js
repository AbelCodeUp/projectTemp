import store from './store'
const actions = {
	ChangeYou(isYou,shareNum){
		let action = {
			type:'CHANGE_SHOW',
			isYou:isYou,
			shareNum:shareNum
		}
		store.dispatch(action)
	}
}

export default actions