import { observable,  action } from "mobx";
import { 
	deleteApiEnv,
	createApiEnv, 
    findApiEnv, 
	updateApiEnv, 
	findApiEnvPage ,
	findApiEnvList
} from '../api/apiEnvApi';

export class ApiEnvStore {
	@observable apiEnvList = [];
	@observable apiEnvId ='';
	@observable	totalRecord = "";


	@action
	findApiEnvPage = async (name) => {
		const params = {
			name: name,
			orderParams: [{name:'name',orderType:'asc'}],
		}
		
		const res = await findApiEnvPage(params)
		if(res.code === 0) {
			this.apiEnvList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
		}
	}

	@action
	findApiEnvList = async (id) => {
		const params = {
			repositoryId:id,
			orderParams: [{name:'name',orderType:'asc'}],
		}

		const res = await findApiEnvList(params)
		if(res.code === 0) {
			this.apiEnvList = res.data;

			return res.data;
		}
	}
	
	@action
	deleteApiEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await deleteApiEnv(param)
		if(res.code === 0) {
			this.findApiEnvPage();
		}
		
	}

    @action
	createApiEnv = async (values) => {
		const res = await createApiEnv(values)
		if(res.code === 0) {
			this.findApiEnvPage()
		}
        
	}

	@action
	updateApiEnv = async (values) => {
		values.id = this.apiEnvId;
		const res = await updateApiEnv(values)
		if(res.code === 0) {
			this.findApiEnvPage()
		}
     
	}
	
	@action
	findApiEnv = async (id) => {
		this.apiEnvId = id;
		const param = new FormData();
		param.append('id', id);
		
		const res = await  findApiEnv(param)
		if( res.code === 0){
			return res.data;
		}
		
	}
	


}

export const API_ENV_STORE = 'apiEnvStore';

