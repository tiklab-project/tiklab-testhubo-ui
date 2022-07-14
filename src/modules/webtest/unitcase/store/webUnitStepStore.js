/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findWebUnitStepList,
    findWebUnitStep,
    createWebUnitStep,
    deleteWebUnitStep,
    updateWebUnitStep,
    findAllLocation,
    findActionTypeList,
} from '../api/webUnitStepApi';

export class WebUnitStepStore {
    @observable webUnitStepList = [];
    @observable webUnitStepInfo = {};
    @observable webUnitId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findWebUnitStepList = async (id) => {
        this.webUnitId=id;
        const params = {
            webUnitId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }
        const res = await findWebUnitStepList(params)
        if(res.code === 0) {
            this.webUnitStepList=res.data;
        }
        return res.data
    }


    @action
    findWebUnitStep =async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res =  await  findWebUnitStep(param)
        if(res.code === 0){
            this.webUnitStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebUnitStep =async (values) => await createWebUnitStep(values)


    @action
    updateWebUnitStep = async (values) => await updateWebUnitStep(values)


    @action
    deleteWebUnitStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        return await deleteWebUnitStep(param)
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
            this.fuctionList = res.data;
            return res.data;
        }
    }

    @action
    getSelectItem = (data) => {
        this.selectItem = data
    }




}

export const WEB_UNITSTEP_STORE = 'webUnitStepStore';
