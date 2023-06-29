import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

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

        const res = await Axios.post("/testPlanInstance/findTestPlanInstancePage",this.params );
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

        const res = await Axios.post("/testPlanInstance/findTestPlanInstanceList",param);
        if(res.code===0){
            this.testPlanInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findTestPlanInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/testPlanInstance/findTestPlanInstance",param)
        if(res.code === 0){

            return res.data;
        }
    }


    @action
    deleteTestPlanInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/testPlanInstance/deleteTestPlanInstance",param)
    }


}


let testPlanInstanceStore = new TestPlanInstanceStore();
export default testPlanInstanceStore;