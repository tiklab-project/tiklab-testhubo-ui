import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


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

        const res = await Axios.post("/testPlanCaseInstanceBind/findTestPlanCaseInstanceBindPage",this.params );
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

        const res = await Axios.post("/testPlanCaseInstanceBind/findTestPlanCaseInstanceBindList",param);
        if(res.code===0){
            this.testPlanBindCaseInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findTestPlanBindCaseInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/testPlanCaseInstanceBind/findTestPlanCaseInstanceBind",param)
        if(res.code === 0){

            return res.data;
        }
    }


    @action
    deleteTestPlanBindCaseInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/testPlanCaseInstanceBind/deleteTestPlanCaseInstanceBind",param)
    }


}


let testPlanBindCaseInstanceStore = new TestPlanBindCaseInstanceStore();
export default testPlanBindCaseInstanceStore;