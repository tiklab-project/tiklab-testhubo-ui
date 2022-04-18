import { observable,  action } from "mobx";
import {
    findWebUnitPage,
    createWebUnit,
    findWebUnit,
    updateWebUnit,
    deleteWebUnit,
    findWebUnitCaseListByTestCase
} from '../api/webUnitApi'

export class WebUnitStore {

    @observable webUnitList = [];
    @observable webUnitInfo;
    @observable categoryId;

    @action
    findWebUnitPage = async (value) => {
        // this.categoryId = id;
        // const params = {
        //     categoryId: id,
        //     orderParams:[{name:'name', orderType:'asc'}],
        // }

        const res = await findWebUnitCaseListByTestCase(value);

        if(res.code === 0) {
            this.webUnitList = res.data;
            return res.data
        }
    }

    @action
    findWebUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebUnit(param);
        if( res.code === 0){
            this.webUnitInfo = res.data;
            return  res.data;
        }
    }


    @action
    createWebUnit = async (values) => await createWebUnit(values)

    @action
    updateWebUnit = async (values) => await updateWebUnit(values)

    @action
    deleteWebUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteWebUnit(param)
    }

}

export const WEB_UNIT_STORE = 'webUnitStore';
