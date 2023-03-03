import { observable,  action } from "mobx";
import {
	deleteAgentConfig,
	createAgentConfig,
	findAgentConfig,
	updateAgentConfig,
	findAgentConfigPage,
	findAgentConfigList
} from '../api/agentConfigApi';

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

		const res = await findAgentConfigList(params);
		if(res.code === 0) {
			this.agentConfigList = res.data;
			return res.data;
		}
	}

	@action
	deleteAgentConfig = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await deleteAgentConfig(param);
	}

    @action
	createAgentConfig =async (values) => await createAgentConfig(values);

	@action
	updateAgentConfig = async (values) => await updateAgentConfig(values)

	@action
	findAgentConfig =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await findAgentConfig(param);

		if( res.code === 0){
			return res.data;
		}
	}


}

export const AGENT_CONFIG_STORE = 'agentConfigStore';

