import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


class ApiUnitStore {
    @observable apiUnitList = [];
    @observable apiUnitInfo = {};
    @observable totalRecord ;
    @observable testCaseInfo;

    @action
    findApiUnitList = async (value) => {

        let res = await Axios.post("/apiUnitCase/findApiUnitCaseListByTestCase",value);
        if(res.code === 0) {
            this.apiUnitList = res.data;
        }
    }


    @action
    findApiUnit = async (id) => {
        let param = new FormData();
        param.append('id', id);

        let res = await Axios.post("/apiUnitCase/findApiUnitCase",param)
        if(res.code === 0){
            this.apiUnitInfo = res.data;
            this.testCaseInfo = res.data.testCase
            return res.data
        }
    }

    @action
    createApiUnit =async (values) =>  await Axios.post("/apiUnitCase/createApiUnitCase",values)

    @action
    updateApiUnit = async (values) => await Axios.post("/apiUnitCase/updateApiUnitCase",values);

    @action
    deleteApiUnit = async (id) => {
        let param = new FormData();
        param.append('id', id)

        return await Axios.post("/apiUnitCase/deleteApiUnitCase",param)

    }
    
}

export default new ApiUnitStore();
