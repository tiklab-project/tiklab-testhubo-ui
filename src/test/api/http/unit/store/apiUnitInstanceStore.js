import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

class ApiUnitInstanceStore {

    @observable apiUnitInstanceList = [];
    @observable apiUnitInstanceId = '';
    @observable	totalRecord = "";
    @observable params

    @action
    findApiUnitInstancePage = async (value) => {

        const res = await Axios.post("/apiUnitInstanceBind/findApiUnitInstanceBindPage",value);
        if(res.code === 0) {
            this.apiUnitInstanceList = res.data.dataList;
        }
        return res
    }

    @action
    findApiUnitInstanceList = async (id) =>{
        let param = {
            "apiUnitId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/apiUnitInstanceBind/findApiUnitInstanceBindList",param);
        if(res.code===0){
            this.apiUnitInstanceList = res.data;
            return res.data;
        }
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

        await Axios.post("/apiUnitInstanceBind/deleteApiUnitInstanceBind",param)
    }


}

let apiUnitInstanceStore = new ApiUnitInstanceStore()
export default apiUnitInstanceStore;