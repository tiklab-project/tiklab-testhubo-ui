import { observable,  action } from "mobx";

import {Axios} from "tiklab-core-ui";

export class WebEnvStore {

	@observable webEnvList = [];
	@observable webEnvInfo;
	@observable webEnv;

	@action
	getWebEnv = (data) =>{
		this.webEnv = data;
	}

	@action
	findWebEnvPage = async (id) => {
		const params = {
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
			return  this.webEnvInfo = res.data;
		}
	}


	@action
	createWebEnv = async (values) => {
		values.http = {id: this.categoryId}

		const res = await Axios.post("/webEnv/createWebEnv",values)
		if( res.code === 0){
			return this.findWebEnvPage(t);
		}
	}

	@action
	updateWebEnv = async (values) => {
		const res = await Axios.post("/webEnv/updateWebEnv",values)

		if( res.code === 0){
			return this.findWebEnvPage();
		}
	}

	@action
	deleteWebEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		const res = await Axios.post("/webEnv/deleteWebEnv",param)
		if( res.code === 0){
			this.findWebEnvPage();
		}
	}

}

export const WEB_ENV_STORE = 'webEnvStore';
