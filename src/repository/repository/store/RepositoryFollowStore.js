import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 仓库关注 stepAssertCommon
 */
class RepositoryFollowStore {
	@observable followList = [];
	@observable totalRecord;

	/**
	 * 查询关注的仓库列表
	 */
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

	/**
	 * 查询关注的仓库列表
	 */
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

	/**
	 * 删除仓库关注
	 */
	@action
	deleteRepositoryFollow = async (id) => {
		const param = new FormData();
		param.append('id', id)
		const res = await Axios.post("/repositoryFollow/deleteRepositoryFollow",param)

		if(res.code === 0){
			return res.data
		}

	}

	/**
	 * 创建仓库关注
	 */
	@action
	createRepositoryFollow = async (values) => await Axios.post("/repositoryFollow/createRepositoryFollow",values);

	/**
	 * 更新仓库关注
	 */
	@action
	updateRepositoryFollow = async (values) => await Axios.post("/repositoryFollow/updateRepositoryFollow",values);

}

let repositoryFollowStore = new RepositoryFollowStore();
export default repositoryFollowStore;

