import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class ApiEnvStore {
	@observable apiEnvList = [];
	@observable	totalRecord = "";
	@observable envUrl;

	@action
	getTestEnvUrl = (data) =>{
		this.envUrl = data;
	}

	@action
	findApiEnvPage = async (name) => {
		const params = {
			name: name,
			orderParams: [{name:'name',orderType:'asc'}],
		}
		
		const res = await Axios.post("/apiEnv/findApiEnvPage",params)
		if(res.code === 0) {
			this.apiEnvList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
			return res.data.dataList;
		}
	}

	@action
	findApiEnvList = async (id) => {
		const params = {
			repositoryId:id,
			orderParams: [{name:'name',orderType:'asc'}],
		}

		const res = await Axios.post("/apiEnv/findApiEnvList",params)
		if(res.code === 0) {
			this.apiEnvList = res.data;

			return res.data;
		}
	}
	
	@action
	deleteApiEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/apiEnv/deleteApiEnv",param)
	}

    @action
	createApiEnv = async (values) => await Axios.post("/apiEnv/createApiEnv",values)


	@action
	updateApiEnv = async (values) =>  await Axios.post("/apiEnv/updateApiEnv",values)

	
	@action
	findApiEnv = async (id) => {

		const param = new FormData();
		param.append('id', id);
		
		const res = await Axios.post("/apiEnv/findApiEnv",param)
		if( res.code === 0){
			return res.data;
		}
	}


}

export const API_ENV_STORE = 'apiEnvStore';

