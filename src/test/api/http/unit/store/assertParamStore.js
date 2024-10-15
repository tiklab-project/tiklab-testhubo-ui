import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class AssertParamStore {

    @observable assertParamList = [];
    @observable assertParamInfo;
    @observable assertParamDataSource = [];
    @observable apiUnitId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.assertParamList = [...values]
    }



    //处理list
    @action
    processList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'InitNewRowId'}];

        this.assertParamDataSource = data;
        this.assertParamList=[...data,...newRow];
    }



    @action
    findAssertParamList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'source', orderType:'asc' }],
        }
        
        const res = await Axios.post("/assertParam/findAssertParamList",params)
        if(res.code === 0) {
            this.dataLength = res.data.length;
            this.processList(res.data);
            return res.data;
        }
    }

    @action
    findAssertParam = async (id) => {
        const param = new FormData();
        param.append('id', id);
        
        const res = await Axios.post("/assertParam/findAssertParam",param);
        if( res.code === 0){
            this.assertParamInfo = res.data;
            return res.data;
        }
    }


    @action
    createAssertParam = async (values) => {
        values.apiUnit = { id: this.apiUnitId }

        const res = await Axios.post("/assertParam/createAssertParam",values)
        if( res.code === 0){
            return this.findAssertParamList(this.apiUnitId);
        }
    }

    @action
    updateAssertParam = async (values) => {
        const res = await Axios.post("/assertParam/updateAssertParam",values)
        if( res.code === 0){
            return this.findAssertParamList(this.apiUnitId);
        }
    }


    @action
    deleteAssertParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/assertParam/deleteAssertParam",param)
        if( res.code === 0){
            this.findAssertParamList(this.apiUnitId);
        }
    }
}

let assertParamStore = new AssertParamStore();
export default assertParamStore;