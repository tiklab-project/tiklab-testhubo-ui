import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class VariableStore {
	@observable variableList = [];

	@action
	findVariablePage = async (param) => {
		const params = {
			orderParams: [{
				name:'createTime',
				orderType:'desc'
			}],
			...param
		}

		const res = await Axios.post("/variable/findVariablePage",params);
		if(res.code === 0) {
			this.variableList = res.data.dataList;
			return res.data;
		}
	}

	@action
	deleteVariable = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/variable/deleteVariable",param);
	}

    @action
	createVariable =async (values) => await Axios.post("/variable/createVariable",values);

	@action
	updateVariable = async (values) => await Axios.post("/variable/updateVariable",values)

	@action
	findVariable =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await Axios.post("/variable/findVariable",param);

		if( res.code === 0){
			return res.data;
		}
	}


}

export default new VariableStore();


