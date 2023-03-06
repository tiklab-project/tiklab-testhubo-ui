import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class RepositoryRecentStore {
	@observable recentList = [];


	@action
	repositoryRecent = async (values) => {
		let params = {
			orderParams:[{name:'updateTime', orderType:'desc'}],
			...values
		}
		const res = await Axios.post("/repositoryRecent/repositoryRecent",params);
		if(res.code === 0 ) {
			return res.data;
		}
	}


	@action
	findRepositoryRecentList = async (userId) => {
		let params = {
			userId:userId,
			orderParams:[{name:'updateTime', orderType:'desc'}],
		}
		const res = await Axios.post("/repositoryRecent/findRepositoryRecentList",params)
		if(res.code === 0 ) {
			this.recentList = res.data;
			this.length = res.data.length;
			return res.data;
		}
	}


}

export const REPOSITORY_RECENT_STORE = 'repositoryRecentStore';

