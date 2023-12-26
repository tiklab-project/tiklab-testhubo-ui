import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class ApiPerfInstanceStore {

    @observable apiPerfInstanceList = [];
    @observable apiPerfInstanceInfo;
    @observable apiPerformId;

    @action
    findApiPerfInstancePage = async (value) => {
        const params = {
            ...value,
            type:"api-perform",
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/instance/findInstancePage",params);

        if(res.code === 0) {
            this.apiPerfInstanceList = res.data.dataList;
        }

        return res
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
        
        await Axios.post("/instance/deleteInstance",param)
    }

}

let apiPerfInstanceStore = new ApiPerfInstanceStore();
export default apiPerfInstanceStore;
