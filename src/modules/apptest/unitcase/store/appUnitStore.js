import { observable,  action } from "mobx";
import {
    findAppUnitPage,
    createAppUnit,
    findAppUnit,
    updateAppUnit,
    deleteAppUnit,
    findAppUnitCaseListByTestCase
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

}

export const APP_UNIT_STORE = 'appUnitStore';
