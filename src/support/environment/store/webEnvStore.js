import { observable,  action } from "mobx";

import {Axios} from "tiklab-core-ui";

export class WebEnvStore {

	@observable webEnvList = [];
	@observable webEnv;

	@action
	getWebEnv = (data) =>{
		this.webEnv = data;
	}

	@action
	findWebEnvPage = async (id) => {
		const params = {
			repositoryId:id,
			orderParams:[{name:'name', orderType:'asc'}],
		}
		const res = await Axios.post("/webEnv/findWebEnvPage",params);

		if(res.code === 0) {
			this.webEnvList = res.data.dataList;
			return res.data
		}
	}

	@action
	findWebEnvList = async (id) => {
		const params = {
			repositoryId:id,
			orderParams:[{name:'name', orderType:'asc'}],
		}
		const res = await Axios.post("/webEnv/findWebEnvList",params);

		if(res.code === 0) {
			this.webEnvList = res.data;
			return res.data
		}
	}

	@action
	findWebEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		const res = await Axios.post("/webEnv/findWebEnv",param);
		if( res.code === 0){
			return  res.data;
		}
	}


	@action
	createWebEnv = async (values) =>  await Axios.post("/webEnv/createWebEnv",values)


	@action
	updateWebEnv = async (values) =>  await Axios.post("/webEnv/updateWebEnv",values)



	@action
	deleteWebEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/webEnv/deleteWebEnv",param)
	}

}

export const WEB_ENV_STORE = 'webEnvStore';
