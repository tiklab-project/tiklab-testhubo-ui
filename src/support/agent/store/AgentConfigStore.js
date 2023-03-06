import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class AgentConfigStore {
	@observable agentConfigList = [];

	@action
	findAgentConfigList = async (id) => {
		const params = {
			repositoryId:id,
			orderParams: [{
				name:'id',
				orderType:'asc'
			}],
		}

		const res = await Axios.post("/agentConfig/findAgentConfigList",params);
		if(res.code === 0) {
			this.agentConfigList = res.data;
			return res.data;
		}
	}

	@action
	deleteAgentConfig = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/agentConfig/deleteAgentConfig",param);
	}

    @action
	createAgentConfig =async (values) => await Axios.post("/agentConfig/createAgentConfig",values);

	@action
	updateAgentConfig = async (values) => await Axios.post("/agentConfig/updateAgentConfig",values)

	@action
	findAgentConfig =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await Axios.post("/agentConfig/findAgentConfig",param);

		if( res.code === 0){
			return res.data;
		}
	}


}

export const AGENT_CONFIG_STORE = 'agentConfigStore';

