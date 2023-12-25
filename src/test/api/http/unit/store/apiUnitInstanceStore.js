import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

class ApiUnitInstanceStore {

    @observable apiUnitInstanceList = [];
    @observable apiUnitInstanceId = '';
    @observable	totalRecord = "";
    @observable params

    @action
    findApiUnitInstancePage = async (value) => {
        value.type="api-unit"
        const res = await Axios.post("/instance/findInstancePage",value);
        if(res.code === 0) {
            this.apiUnitInstanceList = res.data.dataList;
        }
        return res
    }


    @action
    findApiUnitInstance = async (id) => {
        this.apiUnitInstanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiUnitInstance/findApiUnitInstance",param)
        if(res.code === 0){
            return res.data;
        }
    }

    @action
    deleteApiUnitInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/instance/deleteInstance",param)
    }


}

let apiUnitInstanceStore = new ApiUnitInstanceStore()
export default apiUnitInstanceStore;