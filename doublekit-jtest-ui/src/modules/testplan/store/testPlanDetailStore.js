import {observable,action} from "mobx";
import {
    findReleTestCase,
    findTestPlanDetail,
    createTestPlanDetaillList,
    deleteTestPlanDetail,
    updateTestPlanDetail,
    findTesCase
}from '../api/testPlanDetailApi';

export class TestPlanDetailStore {
    @observable testPlanDetailList = [];
    @observable testPlanDetailInfo = {};
    @observable totalRecord ;
    @observable testPlanTestcaseList=[];
    @observable tcTotalRecord;

    @action
    findReleTestCase = async (id,param) => {
        this.testPlanId = id;
        this.param = param;
        const params = {
            testPlanId:id,
            ...param,
            orderParams: [{name:'id', orderType:'asc'}],
        };
        const res = await findReleTestCase(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            return this.testPlanDetailList = res.data.dataList;
        }
    }

    @action
    findTestPlanDetail = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findTestPlanDetail(param)
        if(res.code === 0){
            return this.testPlanDetailInfo = res.data;
        }
    }

    //点击添加用例，弹框中的查询
    @action
    findTesCase = async (id,param) =>{
        const params = {
            testPlanId:id,
            ...param,
        };
        const res = await findTesCase(params)
        if(res.code === 0) {
            this.tcTotalRecord = res.data.totalRecord;
            return this.testPlanTestcaseList = res.data.dataList;
        }
    }

    @action
    createTestPlanDetaillList = async (values) => {
        const res = await createTestPlanDetaillList(values)
        if (res.code === 0) {
            this.findReleTestCase(this.testPlanId,this.param)
        }
    }

    @action
    updateTestPlanDetail = (values) => {
        return updateTestPlanDetail(values).then((res) => {
            if(res.code === 0){
                this.findReleTestCase(this.testPlanId,this.param)
            }
        })
    }

    @action
    deleteTestPlanDetail = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteTestPlanDetail(param)
        if(res.code === 0){
            this.findReleTestCase(this.testPlanId,this.param)
        }
    }

}

export const TESTPLANDETAIL_STORE = 'testPlanDetailStore';
