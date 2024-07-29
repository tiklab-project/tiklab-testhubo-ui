import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class InstanceStore {
    @observable instanceList = [];
    @observable totalPage;
    @observable tableLoading=true;
    @observable totalRecord

    @action
    findInstancePage = async (value) => {
        this.tableLoading=true;
        const params = {
            ...value,
        }
        const res = await Axios.post("/instance/findInstancePage",params);
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalPage= res.data.totalPage;
            this.totalRecord= res.data.totalRecord;
            this.tableLoading=false
        }

        return res.data
    }

    @action
    deleteInstance = async (id,caseType) => {
        const param = new FormData();
        param.append('id', id);
        param.append('caseType', caseType);
        await Axios.post("/instance/deleteInstance",param)
    }



}

let instanceStore = new InstanceStore();
export default instanceStore;
