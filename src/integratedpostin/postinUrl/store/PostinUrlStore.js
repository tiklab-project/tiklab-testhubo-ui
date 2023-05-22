import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class PostinUrlStore {
	@observable postinUrlList = [];

	@action
	findPostinUrlList = async (values) => {
		const params = {
			...values,
			orderParams: [{
				name:'createTime',
				orderType:'desc'
			}],
		}

		const res = await Axios.post("/postinUrl/findPostinUrlList",params);
		if(res.code === 0) {
			this.postinUrlList = res.data;
			return res.data;
		}
	}

	@action
	deletePostinUrl = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/postinUrl/deletePostinUrl",param);
	}

    @action
	createPostinUrl =async (values) => await Axios.post("/postinUrl/createPostinUrl",values);

	@action
	updatePostinUrl = async (values) => await Axios.post("/postinUrl/updatePostinUrl",values)

	@action
	findPostinUrl =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await Axios.post("/postinUrl/findPostinUrl",param);

		if( res.code === 0){
			return res.data;
		}
	}


}

export const POSTIN_URL_STORE = 'postinUrlStore';

