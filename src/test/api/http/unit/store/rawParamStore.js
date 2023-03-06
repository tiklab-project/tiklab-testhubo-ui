import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class RawParamStore {

    @observable rawParamInfo = [];
    @observable apiUnitId = '';
    @observable rawParamId = '';

    @action
    findRawParam = async (id) => {
        this.apiUnitId = id;
        this.rawParamId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/rawParam/findRawParam",param);
        if( res.code ===0){
            this.rawParamInfo = res.data;
            return res.data;
        }
    }

    @action
    createRawParam = async (values) => {
        values.apiUnit = {id:this.apiUnitId}
        values.id =  this.rawParamId;

        await Axios.post("/rawParam/createRawParam",values);
    }

    @action
    updateRawParam = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id= this.rawParamId;

        await Axios.post("/rawParam/updateRawParam",values)
    }


}

export const RAWPARAM_STORE = 'rawParamStore';
