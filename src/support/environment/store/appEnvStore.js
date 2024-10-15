import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class AppEnvStore {

	@observable appEnvList = [];
	@observable appEnvInfo;
	@observable appEnv;

	@action
	getAppEnv = (data) =>{
		this.appEnv = data;
	}

	@action
	findAppEnvPage = async (id) => {
		const params = {
			repositoryId:id,
			orderParams:[{name:'name', orderType:'asc'}],
		}
		const res = await Axios.post("/appEnv/findAppEnvPage",params);

		if(res.code === 0) {
			this.appEnvList = res.data.dataList;
			return res.data
		}
	}

	@action
	findAppEnvList = async (id) => {
		const params = {
			repositoryId:id,
			orderParams:[{name:'name', orderType:'asc'}],
		}
		const res = await Axios.post("/appEnv/findAppEnvList",params);

		if(res.code === 0) {
			this.appEnvList = res.data;
			return res.data
		}
	}


	@action
	findAppEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		const res = await Axios.post("/appEnv/findAppEnv",param);
		if( res.code === 0){
			this.appEnvInfo = res.data;
			return res.data;
		}
	}


	@action
	createAppEnv = async (values) => await Axios.post("/appEnv/createAppEnv",values)

	@action
	updateAppEnv = async (values) => await Axios.post("/appEnv/updateAppEnv",values)

	@action
	deleteAppEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/appEnv/deleteAppEnv",param)
	}

}

export default new AppEnvStore()
