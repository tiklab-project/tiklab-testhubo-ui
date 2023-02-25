/*
 * @Description: 空间store
 * @Author: sunxiancheng
 * @LastEditTime: 2023-01-4 15:53:09
 */

import { observable,  action } from "mobx";
import { 
	deleteRepositoryFollow,
	createRepositoryFollow,
	updateRepositoryFollow,
	findRepositoryFollowList,
	findRepositoryFollowPage
} from '../api/repositoryFollowApi';

export class RepositoryFollowStore {
	@observable followList = [];
	@observable totalRecord;
	
	@action
	findRepositoryFollowPage = async (value) => {
		this.pageParams = {
			orderParams:[{name:'createTime', orderType:'desc'}],
			...value
		}
		const res = await findRepositoryFollowPage(this.pageParams)
		if(res.code === 0 ) {
			this.followList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
			return res;
		}
	}

	@action
	findRepositoryFollowList = async (value) => {
		this.params = {
			...value,
			orderParams:[{name:'createTime', orderType:'desc'}],
		}
		const res = await findRepositoryFollowList(this.params)
		if(res.code === 0 ) {
			this.followList = res.data;

			return res;
		}
	}


	// 删除
	@action
	deleteRepositoryFollow = async (id) => {
		const param = new FormData();
		param.append('id', id)
		const res = await deleteRepositoryFollow(param)

		if(res.code === 0){
			return res.data
		}

	}

	// 新建
	@action
	createRepositoryFollow = async (values) => await createRepositoryFollow(values);

	//更新
	@action
	updateRepositoryFollow = async (values) => await updateRepositoryFollow(values);

}

export const REPOSITORY_FOLLOW_STORE = 'repositoryFollowStore';

