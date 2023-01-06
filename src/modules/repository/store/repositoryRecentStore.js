/*
 * @Description: 空间store
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-24 09:53:09
 */

import { observable,  action } from "mobx";
import {
	deleteRepositoryRecent,
	createRepositoryRecent,
    findRepositoryRecent,
	updateRepositoryRecent,
	repositoryRecent,
	findRepositoryRecentList,
} from '../api/repositoryRecentApi';

export class RepositoryRecentStore {
	@observable recentList = [];


	@action
	repositoryRecent = async (values) => {
		let params = {
			orderParams:[{name:'updateTime', orderType:'desc'}],
			...values
		}
		const res = await repositoryRecent(params);
		if(res.code === 0 ) {
			return res.data;
		}
	}


	@action
	findRepositoryRecentList = async (userId) => {
		this.params = {
			userId:userId,
			orderParams:[{name:'updateTime', orderType:'desc'}],
		}
		const res = await findRepositoryRecentList(this.params)
		if(res.code === 0 ) {
			this.recentList = res.data;
			this.length = res.data.length;
			return res.data;
		}
	}


}

export const REPOSITORY_RECENT_STORE = 'repositoryRecentStore';

