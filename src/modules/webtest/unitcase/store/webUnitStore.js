import { observable,  action } from "mobx";
import {
    findWebUnitPage,
    createWebUnit,
    findWebUnit,
    updateWebUnit,
    deleteWebUnit,
    findWebUnitCaseListByTestCase,
    findAllLocation,
    findActionTypeList
} from '../api/webUnitApi'

export class WebUnitStore {

    @observable webUnitList = [];
    @observable webUnitInfo;
    @observable locationList;
    @observable functionList;

    @action
    findWebUnitList = async (value) => {

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


    //添加框中，下拉选择框获取所有定位器
    @action
    findAllLocation = async () => {
        const res = await findAllLocation()
        if(res.code === 0) {
            this.locationList = res.data;
        }
    }

    //添加框中，下拉选择框获取所有方法
    @action
    findActionTypeList = async (data) => {
        const res = await findActionTypeList(data)

        if(res.code === 0) {
            this.functionList = res.data;
            return res.data;
        }
    }



}

export const WEB_UNIT_STORE = 'webUnitStore';
