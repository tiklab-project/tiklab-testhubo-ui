import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class WorkspaceBindStore {
	@observable workspaceBindList = [];
	@observable workspaceName = "未设置";

	/**
	 * 查看postin空间列表
	 * @param values
	 * @returns {Promise<*>}
	 */
	@action
	findWorkspaceList = async (values) => {
		const res = await Axios.post("/workspaceBind/findWorkspaceList",values);
		if(res.code === 0) {
			return res.data;
		}
	}

	/**
	 * 查询绑定的空间
	 */
	@action
	findWorkspaceBindList = async (values) => {
		const params = {
			...values,
			orderParams: [{
				name:'createTime',
				orderType:'desc'
			}],
		}

		const res = await Axios.post("/workspaceBind/findWorkspaceBindList",params);
		if(res.code === 0) {
			this.workspaceBindList = res.data;
			this.workspaceName = res.data.length > 0? res.data[0].workspace?.workspaceName : "未设置";
			return res.data;
		}
	}

	@action
	deleteWorkspaceBind = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/workspaceBind/deleteWorkspaceBind",param);
	}

    @action
	bindWorkspace =async (values) => await Axios.post("/workspaceBind/bindWorkspace",values);

	@action
	updateWorkspaceBind = async (values) => await Axios.post("/workspaceBind/updateWorkspaceBind",values)

	@action
	findWorkspaceBind =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await Axios.post("/workspaceBind/findWorkspaceBind",param);

		if( res.code === 0){
			return res.data;
		}
	}



}

let workspaceBindStore = new WorkspaceBindStore();
export default workspaceBindStore;

