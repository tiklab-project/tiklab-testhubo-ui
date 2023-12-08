import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


export class IfVariableStore {

    @observable ifVariableList = [];


    @action
    setList = (list) => {
        this.ifVariableList = [...list]
    }


    @action
    findIfVariableList = async (stepId) => {
        let param = {stepId:stepId}
        const res = await Axios.post("/ifVariable/findIfVariableList",param);

        let newRow = [{id:"InitRow"}]

        if(res.code === 0) {
            this.dataLength = res.data.length

            if(res.data.length===0){
                this.ifVariableList=newRow
            }else {
                this.ifVariableList=res.data;
            }

            return res.data
        }
    }

    @action
    findIfVariable = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/ifVariable/findIfVariable",param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createIfVariable = async (values) =>  await Axios.post("/ifVariable/createIfVariable",values)

    @action
    updateIfVariable = async (values) => await Axios.post("/ifVariable/updateIfVariable",values)

    @action
    deleteIfVariable = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/ifVariable/deleteIfVariable",param)
    }
}

const ifVariableStore = new IfVariableStore();
export default ifVariableStore
