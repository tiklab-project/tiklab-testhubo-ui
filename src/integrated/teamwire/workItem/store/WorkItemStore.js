import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * teamWire 查询
 */
export class WorkItemStore {
	@observable demandInfo ;

	@action
	getDemandInfo = (value) =>{
		this.demandInfo = value
	}

	/**
	 * 项目查询
	 * @param values
	 * @returns {Promise<*>}
	 */
	@action
	findProjectList = async (values) => {
		const res = await Axios.post("/teamWire/findProjectList",values);
		if(res.code === 0) {
			return res.data;
		}
	}

	/**
	 * 需求查询
	 * @param values
	 * @returns {Promise<*>}
	 */
	@action
	findWorkItemList = async (values) => {
		const res = await Axios.post("/teamWire/findWorkItemList",values);
		if(res.code === 0) {
			return res.data;
		}
	}

	@action
	findWorkItem = async (id) => {
		const param = new FormData();
		param.append("id",id)
		const res = await Axios.post("/teamWire/findWorkItem",param);
		if(res.code === 0) {
			return res.data;
		}else {
			return null
		}
	}

	/**
	 * 创建缺陷
	 * @param values
	 * @returns {Promise<unknown>}
	 */
	@action
	createWorkItem =async (values) => await Axios.post("/teamWire/createWorkItem",values);


}

export default new WorkItemStore();

