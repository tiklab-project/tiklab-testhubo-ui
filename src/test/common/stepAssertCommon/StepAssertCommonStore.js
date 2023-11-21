import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class StepAssertCommonStore {

    @observable assertList = [];


    @action
    findStepAssertCommonList = async (value) => {
        const res = await Axios.post("/stepAssertCommon/findStepAssertCommonList",value);

        if(res.code === 0) {
            this.assertList = res.data;
            return res.data
        }
    }

    @action
    findStepAssertCommon = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/stepAssertCommon/findStepAssertCommon",param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createStepAssertCommon = async (values) =>  await Axios.post("/stepAssertCommon/createStepAssertCommon",values)

    @action
    updateStepAssertCommon = async (values) => await Axios.post("/stepAssertCommon/updateStepAssertCommon",values)

    @action
    deleteStepAssertCommon = async (id) => {
        const param = new FormData();
        param.append('id', id);

         await Axios.post("/stepAssertCommon/deleteStepAssertCommon",param)
    }

}

const stepAssertCommonStore = new StepAssertCommonStore();
export default stepAssertCommonStore;
