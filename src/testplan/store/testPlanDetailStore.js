import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


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
        const res = await Axios.post("/testPlanCase/findBindTestCaseList",params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            this.testPlanDetailList = res.data.dataList;
            return  res.data
        }
    }


    //点击添加用例，弹框中的查询
    @action
    findTesCaseList = async (values) =>{

        const res = await Axios.post("/testPlanCase/findTestPlanCaseList",values)

        if(res.code === 0) {
            this.tcTotalRecord = res.data.totalRecord;
            this.testPlanTestcaseList = res.data.dataList;
        }

        return res;
    }

    @action
    planBindCase = async (values) => await Axios.post("/testPlanCase/planBindCase",values)

    @action
    updateTestPlanDetail = async (values) => await Axios.post("/testPlanCase/updateTestPlanCase",values)

    @action
    deleteTestPlanDetail = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/testPlanCase/deleteTestPlanCase",param)
    }

}

let testPlanDetailStore = new TestPlanDetailStore();
export default testPlanDetailStore;
