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
			return  this.appEnvInfo = res.data;
		}
	}


	@action
	createAppEnv = async (values) => {
		values.http = {id: this.categoryId}

		const res = await createAppEnv(values)
		if( res.code === 0){
			return this.findAppEnvPage(t);
		}
	}

	@action
	updateAppEnv = async (values) => {
		const res = await updateAppEnv(values)

		if( res.code === 0){
			return this.findAppEnvPage();
		}
	}

	@action
	deleteAppEnv = async (id) => {
		const param = new FormData();
		param.append('id', id);

		const res = await deleteAppEnv(param)
		if( res.code === 0){
			this.findAppEnvPage();
		}
	}

}

export const APP_ENV_STORE = 'appEnvStore';
