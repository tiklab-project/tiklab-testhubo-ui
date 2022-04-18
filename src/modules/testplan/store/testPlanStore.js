import {observable,action} from "mobx";
import {
    findTestPlanPage,
    findTestPlan,
    createTestPlan,
    deleteTestPlan,
    updateTestPlan
}from '../api/testPlanApi';

export class TestPlanStore {
    @observable testPlanList = [];
    @observable testPlanInfo = {};
    @observable totalRecord ;

    @action
    findTestPlanPage = async (id,param) => {
        this.repositoryId = id;
        this.param = param;
        const params = {
            repositoryId:id,
            ...param,
            orderParams: [{name:'name', orderType:'asc'}],
        };
        const res = await findTestPlanPage(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            return this.testPlanList = res.data.dataList;
        }
    }

    @action
    findTestPlan = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findTestPlan(param)
        if(res.code === 0){
            return this.testPlanInfo = res.data;
        }
    }

    @action
    createTestPlan = async (values) => {
        const res = await createTestPlan(values)
        if (res.code === 0) {
            this.findTestPlanPage(this.repositoryId,this.param)
        }
    }

    @action
    updateTestPlan = (values) => {
        return updateTestPlan(values).then((res) => {
            if(res.code === 0){
                this.findTestPlanPage(this.repositoryId,this.param)
            }
        })
    }

    @action
    deleteTestPlan = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteTestPlan(param)
        if(res.code === 0){
            this.findTestPlanPage(this.repositoryId,this.param)
        }
    }

}

export const TESTPLAN_STORE = 'testPlanStore';
