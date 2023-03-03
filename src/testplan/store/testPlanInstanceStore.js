import { observable,  action } from "mobx";
import {
    findTestPlanInstancePage,
    createTestPlanInstance,
    findTestPlanInstance,
    updateTestPlanInstance,
    deleteTestPlanInstance,
    findTestPlanInstanceList
} from '../api/testPlanInstanceApi'

export class TestPlanInstanceStore {

    @observable testPlanInstanceList = [];
    @observable	totalRecord = "";
    @observable params


    @action
    findTestPlanInstancePage = async (value) => {
        this.params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findTestPlanInstancePage(this.params );
        if(res.code === 0) {
            this.testPlanInstanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
        }
        return res
    }

    @action
    findTestPlanInstanceList = async (id) =>{
        let param = {
            "testPlanId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findTestPlanInstanceList(param);
        if(res.code===0){
            this.testPlanInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findTestPlanInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findTestPlanInstance(param)
        if(res.code === 0){

            return res.data;
        }
    }


    @action
    deleteTestPlanInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteTestPlanInstance(param)
    }


}


export const TEST_PLAN_INSTANCE_STORE = 'testPlanInstanceStore';