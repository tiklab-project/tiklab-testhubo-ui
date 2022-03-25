import {observable,action} from "mobx";
import {
    findStepPage,
    findStep,
    createStep,
    deleteStep,
    updateStep
}from '../api/stepApi';


export class StepStore {
    @observable stepList = [];
    @observable stepInfo = {};
    @observable totalRecord ;
    @observable testcaseId=''
    @observable selectItem=[]

    @action
    findStepPage = (id) => {
        this.testcaseId=id;
        const params = {
            testCaseId: id,
            orderParams: [{ name:'name', orderType:'asc' }],
        }

        const that = this;
        return new Promise(function(resolve, reject){
            findStepPage(params).then(res => {
                if(res.code === 0) {
                    that.stepList = res.data.dataList;
                    resolve(res);
                }
            })
        })
    }

    @action
    findStep = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findStep(param).then((res) => {
                if(res.code === 0){
                    that.stepInfo = res.data;
                    resolve(res.data)
                }
            })
        })
    }

    @action
    createStep = (values) => {
        createStep(values).then((res) => {
            if(res.code === 0){
                this.findStepPage(this.testcaseId)
            }
        })
    }

    @action
    updateStep = (values) => {
        updateStep(values).then((res) => {
            if(res.code === 0){
                this.findStepPage(this.testcaseId);
            }
        })
    }

    @action
    deleteStep = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteStep(param).then((res) => {
            this.findStepPage(this.testcaseId);
        })
    }

    @action
    getSelectItem = (data) => {
        this.selectItem = data
    }

}

export const STEP_STORE = 'stepStore';
