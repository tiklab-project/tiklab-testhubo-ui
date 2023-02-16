import {observable,action} from "mobx";
import {
    findBindTestCaseList,
    createTestPlanDetailList,
    deleteTestPlanDetail,
    findTesCaseList,
    updateTestPlanDetail
}from '../api/testPlanDetailApi';

export class TestPlanDetailStore {
    @observable testPlanDetailList = [];
    @observable testPlanDetailInfo = {};
    @observable totalRecord ;
    @observable testPlanTestcaseList=[];
    @observable tcTotalRecord;

    @action
    findBindTestCaseList = async (param) => {
        const params = {
            ...param,
            orderParams: [{name:'id', orderType:'desc'}],
        };
        const res = await findBindTestCaseList(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            this.testPlanDetailList = res.data.dataList;
            return  res.data
        }
    }


    //点击添加用例，弹框中的查询
    @action
    findTesCaseList = async (values) =>{

        const res = await findTesCaseList(values)

        if(res.code === 0) {
            this.tcTotalRecord = res.data.totalRecord;
            this.testPlanTestcaseList = res.data.dataList;
        }

        return res;
    }

    @action
    createTestPlanDetailList = async (values) => await createTestPlanDetailList(values)

    @action
    updateTestPlanDetail = async (values) => await updateTestPlanDetail(values)

    @action
    deleteTestPlanDetail = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteTestPlanDetail(param)
    }

}

export const TESTPLANDETAIL_STORE = 'testPlanDetailStore';
