import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class ApiEnvStore {
	@observable apiEnvList = [];
	@observable apiEnvId ='';
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
		const res = await Axios.post("/apiEnv/deleteApiEnv",param)
		if(res.code === 0) {
			this.findApiEnvPage();
		}
		
	}

    @action
	createApiEnv = async (values) => {
		const res = await Axios.post("/apiEnv/createApiEnv",values)
		if(res.code === 0) {
			this.findApiEnvPage()
		}
        
	}

	@action
	updateApiEnv = async (values) => {
		values.id = this.apiEnvId;
		const res = await Axios.post("/apiEnv/updateApiEnv",values)
		if(res.code === 0) {
			this.findApiEnvPage()
		}
     
	}
	
	@action
	findApiEnv = async (id) => {
		this.apiEnvId = id;
		const param = new FormData();
		param.append('id', id);
		
		const res = await Axios.post("/category/findCategory",param)
		if( res.code === 0){
			return res.data;
		}
		
	}
	


}

export const API_ENV_STORE = 'apiEnvStore';

