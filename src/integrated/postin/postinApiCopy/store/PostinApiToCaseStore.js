import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class PostInApiToCaseStore {
	@observable postInApiList = [];

	/**
	 * 查询绑定的空间
	 */
	@action
	findPostInApiList = async (repositoryId) => {
		const param = new FormData();
		param.append('repositoryId', repositoryId);
		const res = await Axios.post("/postInApi/findPostInApiList",param);
		if(res.code === 0) {
			this.postInApiList = res.data;
			return res.data;
		}
	}


    @action
	createPostInApiToCase =async (values) => await Axios.post("/postInApi/createPostInApiToCase",values);


}

let postInApiToCaseStore = new PostInApiToCaseStore();
export default postInApiToCaseStore;

