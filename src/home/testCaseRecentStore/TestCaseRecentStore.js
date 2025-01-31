import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 最近访问的用例 stepAssertCommon
 */
export class TestCaseRecentStore {
	@observable recentList = [];


	/**
	 * 设置最近访问的用例
	 */
	@action
	testCaseRecent = async (values) => {
		const res = await Axios.post("/testCaseRecent/testCaseRecent",values);
		if(res.code === 0 ) {
			return res.data;
		}
	}

	/**
	 * 查询最近访问的用例列表
	 */
	@action
	findTestCaseRecentList = async (value) => {
		this.params = {
			...value,
			orderParams:[{name:'updateTime', orderType:'desc'}],
			pageParam:{
				pageSize:10,
				currentPage:1
			}
		}
		const res = await Axios.post("/testCaseRecent/findTestCaseRecentPage",this.params)

		if(res.code === 0 ) {
			this.recentList = res.data.dataList;

			return res.data.dataList;
		}
	}




}

let testCaseRecentStore = new TestCaseRecentStore();
export default testCaseRecentStore;

