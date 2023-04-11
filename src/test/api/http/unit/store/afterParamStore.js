
import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class AfterParamStore {
    @action
    findAfterScript = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/afterScript/findAfterScript",param);
        if( res.code === 0 ){
            return res.data;
        }
    }

    @action
    createAfterScript = async (values) =>  await Axios.post("/afterScript/createAfterScript",values);


    @action
    updateAfterScript = async (values) =>  await Axios.post("/afterScript/updateAfterScript",values);

}

export const AFTERPARAM_STORE = 'afterParamStore';
