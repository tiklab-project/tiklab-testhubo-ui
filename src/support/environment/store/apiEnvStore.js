import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class ApiEnvStore {
	@observable apiEnvList = [];
	@observable  apiEnvSourceList = [];
	@observable	totalRecord = "";
	@observable envUrl;
	@observable dataLength;
	@action
	getTestEnvUrl = (data) =>{
		this.envUrl = data;
	}

	/**
	 * 设置环境列表
	 */
	@action
	setList = (values) => {
		this.apiEnvList = [...values]
	}

	/**
	 * 添加接口环境
	 */
	@action
	addNewList = (list) => {
		this.apiEnvList = [...list];
	}

	@action
	findApiEnvPage = async (name) => {
		const params = {
			name: name,
			orderParams: [{name:'name',orderType:'asc'}],
		}

		const res = await Axios.post("/apxEnv/findApiEnvPage",params)
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

		let newRow = [{id:"apiEnvInitRow"}]

		const res = await Axios.post("/apxEnv/findApiEnvList",params)
		if(res.code === 0) {
			this.dataLength = res.data.length
			this.apiEnvSourceList=res.data
			if(res.data.length===0){
				this.apiEnvList=newRow
			}else {
				this.apiEnvList=res.data;
			}

			return res.data;
		}
	}
	
	@action
	deleteApiEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("apxEnv/deleteApiEnv",param)
	}

    @action
	createApiEnv = async (values) => await Axios.post("apxEnv/createApiEnv",values)


	@action
	updateApiEnv = async (values) =>  await Axios.post("apxEnv/updateApiEnv",values)

	
	@action
	findApiEnv = async (id) => {

		const param = new FormData();
		param.append('id', id);
		
		const res = await Axios.post("apxEnv/findApiEnv",param)
		if( res.code === 0){
			return res.data;
		}
	}
}

export default new ApiEnvStore()


