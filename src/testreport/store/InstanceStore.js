import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class InstanceStore {
    @observable instanceList = [];

    @action
    findInstancePage = async (value) => {
        const params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/instance/findInstancePage",params);
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
        }

        return res
    }

    @action
    deleteInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);
        
        await Axios.post("/instance/deleteInstance",param)
    }

}

let instanceStore = new InstanceStore();
export default instanceStore;
