/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findAppUnitStepList,
    findAppUnitStep,
    createAppUnitStep,
    deleteAppUnitStep,
    updateAppUnitStep,
    findAllLocation,
    findActionTypeList
} from '../api/appUnitStepApi';

export class AppUnitStepStore {
    @observable appUnitStepList = [];
    @observable appUnitStepInfo = {};
    @observable appUnitId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findAppUnitStepList = async (id) => {
        this.appUnitId=id;
        const params = {
            appUnitId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }
        const res = await findAppUnitStepList(params)
        if(res.code === 0) {
            this.appUnitStepList=res.data;
        }
        return res.data
    }

    @action
    findAppUnitStep =async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res =  await  findAppUnitStep(param)
        if(res.code === 0){
            this.appUnitStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppUnitStep =async (values) => await createAppUnitStep(values)


    @action
    updateAppUnitStep = async (values) => await updateAppUnitStep(values)


    @action
    deleteAppUnitStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        return await deleteAppUnitStep(param)
    }
    
    
    //添加框中，下拉选择框获取所有定位器
    @action
    findAllLocation = () => {
        findAllLocation().then(res => {
            if(res.code === 0) {
                this.locationList = res.data;
            }
        })
    }

    //添加框中，下拉选择框获取所有方法
    @action
    findActionTypeList = (data) => {
        return findActionTypeList(data).then(res => {
            if(res.code === 0) {
                this.fuctionList = res.data;
            }
        })
    }

    @action
    getSelectItem = (data) => {
        this.selectItem = data
    }




}

export const APP_UNITSTEP_STORE = 'appUnitStepStore';
