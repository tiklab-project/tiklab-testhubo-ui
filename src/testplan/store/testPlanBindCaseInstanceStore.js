import { observable,  action } from "mobx";
import {
    findTestPlanBindCaseInstancePage,
    createTestPlanBindCaseInstance,
    findTestPlanBindCaseInstance,
    updateTestPlanBindCaseInstance,
    deleteTestPlanBindCaseInstance,
    findTestPlanBindCaseInstanceList
} from '../api/testPlanBindCaseInstanceApi'

export class TestPlanBindCaseInstanceStore {

    @observable testPlanBindCaseInstanceList = [];
    @observable	totalRecord = "";
    @observable params


    @action
    findTestPlanBindCaseInstancePage = async (value) => {
        this.params = {
            ...value,
            orderParams:[{name:'id', orderType:'desc' }]
        }

        const res = await findTestPlanBindCaseInstancePage(this.params );
        if(res.code === 0) {
            this.testPlanBindCaseInstanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
        }
        return res
    }

    @action
    findTestPlanBindCaseInstanceList = async (id) =>{
        let param = {
            "testPlanId":id,
            orderParams:[{name:'id', orderType:'desc' }]
        }

        const res = await findTestPlanBindCaseInstanceList(param);
        if(res.code===0){
            this.testPlanBindCaseInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findTestPlanBindCaseInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findTestPlanBindCaseInstance(param)
        if(res.code === 0){

            return res.data;
        }
    }


    @action
    deleteTestPlanBindCaseInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteTestPlanBindCaseInstance(param)
    }


}


export const TEST_PLAN_BIND_CASE_INSTANCE_STORE = 'testPlanBindCaseInstanceStore';