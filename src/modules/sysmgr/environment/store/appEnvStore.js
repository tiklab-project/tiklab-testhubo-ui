import { observable,  action } from "mobx";
import {
	findAppEnvPage,
	createAppEnv,
	findAppEnv,
	updateAppEnv,
	deleteAppEnv,
	findAppEnvList
} from '../api/appEnvApi'

export class AppEnvStore {

	@observable appEnvList = [];
	@observable appEnvInfo;

	@action
	findAppEnvPage = async (id) => {
		const params = {
			repositoryId:id,
			orderParams:[{name:'name', orderType:'asc'}],
		}
		const res = await findAppEnvPage(params);

		if(res.code === 0) {
			this.appEnvList = res.data.dataList;
			return res.data
		}
	}

	@action
	findAppEnvList = async (id) => {
		const params = {
			repositoryId:id,
			orderParams:[{name:'name', orderType:'asc'}],
		}
		const res = await findAppEnvList(params);

		if(res.code === 0) {
			this.appEnvList = res.data;
			return res.data
		}
	}


	@action
	findAppEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		const res = await findAppEnv(param);
		if( res.code === 0){
			this.appEnvInfo = res.data;
			return res.data;
		}
	}


	@action
	createAppEnv = async (values) => await createAppEnv(values)

	@action
	updateAppEnv = async (values) => await updateAppEnv(values)

	@action
	deleteAppEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await deleteAppEnv(param)
	}

}

export const APP_ENV_STORE = 'appEnvStore';
