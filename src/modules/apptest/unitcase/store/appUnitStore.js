import { observable,  action } from "mobx";
import {
    findAppUnitPage,
    createAppUnit,
    findAppUnit,
    updateAppUnit,
    deleteAppUnit,
    findAppUnitCaseListByTestCase,
    findAllLocation,
    findActionTypeList
} from '../api/appUnitApi'

export class AppUnitStore {

    @observable appUnitList = [];
    @observable appUnitInfo;

    @action
    findAppUnitList = async (values) => {

        const res = await findAppUnitCaseListByTestCase(values);

        if(res.code === 0) {
            this.appUnitList = res.data;
            return res.data
        }
    }

    @action
    findAppUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppUnit(param);
        if( res.code === 0){
            this.appUnitInfo = res.data;

            return res.data;
        }
    }


    @action
    createAppUnit = async (values) =>  await createAppUnit(values)

    @action
    updateAppUnit = async (values) =>  await updateAppUnit(values)

    @action
    deleteAppUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteAppUnit(param)
    }


    //添加框中，下拉选择框获取所有定位器
    @action
    findAllLocation = async () => {
        const res = await findAllLocation()
        if(res.code === 0) {
            this.locationList = res.data;
            return res.data;
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

export const APP_UNIT_STORE = 'appUnitStore';
