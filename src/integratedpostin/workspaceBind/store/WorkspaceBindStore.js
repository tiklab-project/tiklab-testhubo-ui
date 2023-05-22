import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class WorkspaceBindStore {
	@observable workspaceBindList = [];

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
	createWorkspaceBind =async (values) => await Axios.post("/workspaceBind/createWorkspaceBind",values);

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

export const WORKSPACE_BIND_STORE = 'workspaceBindStore';

