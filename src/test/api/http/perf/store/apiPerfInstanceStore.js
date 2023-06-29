import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class ApiPerfInstanceStore {

    @observable apiPerfInstanceList = [];
    @observable apiPerfInstanceInfo;
    @observable apiPerformId;

    @action
    findApiPerfInstancePage = async (value) => {
        const params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/apiPerfInstance/findApiPerfInstancePage",params);

        if(res.code === 0) {
            this.apiPerfInstanceList = res.data.dataList;
        }

        return res
    }


    @action
    findApiPerfInstanceList = async (id) => {
        this.apiPerformId = id;
        const params = {
            apiPerfId: id,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/apiPerfInstance/findApiPerfInstanceList",params);

        if(res.code === 0) {
            this.apiPerfInstanceList = res.data;
            return res.data
        }
    }

    @action
    findApiPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiPerfInstance/findApiPerfInstance",param);
        if( res.code === 0){
            this.apiPerfInstanceInfo = res.data;

            return res.data;
        }
    }


    @action
    deleteApiPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);
        
        await Axios.post("/apiPerfInstance/deleteApiPerfInstance",param)
    }

}

let apiPerfInstanceStore = new ApiPerfInstanceStore();
export default apiPerfInstanceStore;
