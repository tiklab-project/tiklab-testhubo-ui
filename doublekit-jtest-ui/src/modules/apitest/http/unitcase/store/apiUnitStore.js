import {observable,action} from "mobx";
import {
    findApiUnitList,
    findApiUnit,
    createApiUnit,
    deleteApiUnit,
    updateApiUnit,
    findApiUnitListByTestCase
} from '../api/apiUnitApi';


export class ApiUnitStore {
    @observable apiUnitList = [];
    @observable apiUnitInfo = {};
    @observable totalRecord ;

    @action
    findApiUnitPage = async (value) => {

        const res = await  findApiUnitListByTestCase(value);
        if(res.code === 0) {
            this.apiUnitList = res.data;
        }
    }


    @action
    findApiUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiUnit(param)
        if(res.code === 0){
            this.apiUnitInfo = res.data;
            return res.data
        }
    }

    @action
    createApiUnit =async (values) =>  await createApiUnit(values)

    @action
    updateApiUnit = async (values) => await updateApiUnit(values);

    @action
    deleteApiUnit = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteApiUnit(param)
    }
    
}

export const API_UNIT_STORE = 'apiUnitStore';
