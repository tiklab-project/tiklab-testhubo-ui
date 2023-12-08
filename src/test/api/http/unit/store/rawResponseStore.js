import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

class RawResponseStore {

    @observable rawResponseInfo = [];
    @observable apiUnitId = '';
    @observable rawResponseId = '';

    @action
    findRawResponse = async (id) => {
        this.apiUnitId = id;
        this.rawResponseId = id;

        const param = new FormData();
        param.append('id', id)

        const res = await Axios.post("/rawParam/findRawParam",param);
        if( res.code === 0){
            return this.rawResponseInfo = res.data
        }
    }

    @action
    createRawResponse = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id =  this.rawResponseId;

        let res = await Axios.post("/rawParam/createRawParam",values)
        if( res.code === 0){
            this.findRawResponse(this.apiUnitId);
        }

    }

    @action
    updateRawResponse = (values) => {
        values.apiUnit = { id: this.apiUnitId}
        values.id =  this.rawResponseId;

        let res = Axios.post("/rawParam/updateRawParam",values)
        if( res.code === 0){
            this.findRawResponse(this.apiUnitId);
        }

    }

}

let rawResponseStore = new RawResponseStore();
export default rawResponseStore;
