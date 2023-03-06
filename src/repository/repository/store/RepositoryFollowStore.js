import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class RepositoryFollowStore {
	@observable followList = [];
	@observable totalRecord;
	
	@action
	findRepositoryFollowPage = async (value) => {
		this.pageParams = {
			orderParams:[{name:'createTime', orderType:'desc'}],
			...value
		}
		const res = await Axios.post("/repositoryFollow/findRepositoryFollowPage",this.pageParams)
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
		const res = await Axios.post("/repositoryFollow/findRepositoryFollowList",this.params)
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
		const res = await Axios.post("/repositoryFollow/deleteRepositoryFollow",param)

		if(res.code === 0){
			return res.data
		}

	}

	// 新建
	@action
	createRepositoryFollow = async (values) => await Axios.post("/repositoryFollow/createRepositoryFollow",values);

	//更新
	@action
	updateRepositoryFollow = async (values) => await Axios.post("/repositoryFollow/updateRepositoryFollow",values);

}

export const REPOSITORY_FOLLOW_STORE = 'repositoryFollowStore';

