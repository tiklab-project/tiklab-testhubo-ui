import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class IntegratedUrlStore {
	@observable integratedUrlList = [];

	@action
	findIntegratedUrlList = async (values) => {
		const params = {
			...values,
			orderParams: [{
				name:'createTime',
				orderType:'desc'
			}],
		}

		const res = await Axios.post("/integratedUrl/findIntegratedUrlList",params);
		if(res.code === 0) {
			this.integratedUrlList = res.data;
			return res.data;
		}
	}

	@action
	deleteIntegratedUrl = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/integratedUrl/deleteIntegratedUrl",param);
	}

    @action
	createIntegratedUrl =async (values) => await Axios.post("/integratedUrl/createIntegratedUrl",values);

	@action
	updateIntegratedUrl = async (values) => await Axios.post("/integratedUrl/updateIntegratedUrl",values)

	@action
	findIntegratedUrl =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await Axios.post("/integratedUrl/findIntegratedUrl",param);

		if( res.code === 0){
			return res.data;
		}
	}


}

let integratedUrlStore = new IntegratedUrlStore();
export default integratedUrlStore;

