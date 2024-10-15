import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class IfJudgmentStore {

    @observable ifJudgmentList = [];


    @action
    findIfJudgmentList = async (value) => {
        const res = await Axios.post("/ifJudgment/findIfJudgmentList",value);

        if(res.code === 0) {
            this.ifJudgmentList = res.data;
            return res.data
        }
    }

    @action
    findIfJudgment = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/ifJudgment/findIfJudgment",param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createIfJudgment = async (values) =>  await Axios.post("/ifJudgment/createIfJudgment",values)

    @action
    updateIfJudgment = async (values) => await Axios.post("/ifJudgment/updateIfJudgment",values)

    @action
    deleteIfJudgment = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/ifJudgment/deleteIfJudgment",param)
    }
}

const ifJudgmentStore = new IfJudgmentStore();
export default ifJudgmentStore
