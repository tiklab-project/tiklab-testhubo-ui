import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class RequestBodyStore {
    @observable bodyType ;
    @observable apiUnitId = '';
    @observable requestBodyId = '';

    @action
    findRequestBody = async (id) => {
        this.apiUnitId = id;
        this.requestBodyId= id;

        const param = new FormData();
        param.append('id', id);

        const res  = await Axios.post("/requestBody/findRequestBody",param);
        if( res.code === 0){
            this.bodyType = res.data?.bodyType;
            return res.data;
        }
    }

    @action
    createRequestBody = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id = this.requestBodyId;

        await Axios.post("/requestBody/createRequestBody",values);
    }

    @action
    updateRequestBody = async (values) => await Axios.post("/requestBody/updateRequestBody",values);


}

let requestBodyStore = new RequestBodyStore();
export default requestBodyStore;
