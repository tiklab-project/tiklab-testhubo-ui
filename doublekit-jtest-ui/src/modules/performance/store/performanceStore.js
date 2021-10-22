/**
 * @description：
 * @date: 2021-08-24 15:21
 */
import {observable, action, toJS} from "mobx";
import {
    findPerformancePage,
    findPerformance,
    createPerformance,
    deletePerformance,
    updatePerformance,
    findTestCaseByType,
    executeTest,
    taskResult,
    endOrPauseTest
}from '../api/performanceApi';


export class PerformanceStore {
    @observable performanceList = [];
    @observable performanceInfo = {};
    @observable repositoryId;
    @observable param;
    @observable totalRecord;
    @observable testcaseList;
    @observable testRecord;
    @observable testcaseInfo;
    @observable testcaseResData;
    @observable testcaseReqData;
    @observable testList;
    @observable executeType;
    @observable mergeList;
    @observable testResultList;
    @observable testcaseId

    @action
    findPerformancePage = async (id,param) => {
        this.repositoryId = id;
        this.param = param;
        const params = {
            repositoryId:id,
            ...param,
            orderParams: [{name:'name', orderType:'asc'}],
        }
        const res = await  findPerformancePage(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            return this.performanceList = res.data.dataList;
        }
    }

    @action
    findPerformance = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findPerformance(param)
        if(res.code === 0){
            this.performanceInfo = res.data;
            this.testcaseId = res.data.testCase.id
        }
    }

    @action
    createPerformance = async (values) => {
        const res = await createPerformance(values)
        if(res.code === 0){
            return this.findPerformancePage(this.repositoryId,this.param)
        }
    }

    @action
    updatePerformance = async (values) => {
        const res = await updatePerformance(values)
        if(res.code === 0){
            this.findPerformancePage(this.repositoryId,this.param)
        }
    }

    @action
    deletePerformance =  async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deletePerformance(param)
        if(res.code === 0){
            this.findPerformancePage(this.repositoryId,this.param)
        }
    }

    @action
    findTestCaseByType = async (id,testType) => {
        const param = {
            repositoryId: id,
            testType:testType
        }
        const res = await findTestCaseByType(param);
        if(res.code === 0){
            this.testcaseList = res.data;
            this.testRecord = null
        }
    }

    //获取关联用例数据
    @action
    getTestcase = (data) => this.testcaseInfo = data;

    //执行性能测试
    @action
    executeTest = (param) => {
        //executeType: 开始:start
        this.executeType = param.executeType
        executeTest(param)
    }

    //停止或暂停
    @action
    endOrPauseTest = (param) => {
        //executeType: 暂停:pause,结束:end,继续:continue
        this.executeType = param.executeType
        endOrPauseTest(param)
    }

    //测试结果
    @action
    taskResult = (id) => {
        const param = new FormData();
        param.append('testCaseId', id);
        return taskResult(param).then(res=> {
            if(res.code===0){
                if(res.data.executeType){
                    this.executeType = res.data.executeType
                }else {
                    this.testList = res.data.performanceTestList;

                    if(res.data.performanceStatistics){
                        this.testResultList = [res.data.performanceStatistics]
                    }

                    this.merge(res.data.performanceTestList)
                    return res.data
                }


            }
        })
    }
    //保存之前结果 合并
    @action
    merge = (data) => {
        debugger
        if(this.mergeList&&data.length>0){
            this.mergeList = [...data,...this.mergeList]
        }else {
            this.mergeList = data
        }

        console.log(this.mergeList)
    }

    //测试步骤信息
    @action
    getTestData = (data) => {
        this.testcaseReqData = data.requestInstance
        this.testcaseResData = data.responseInstance
    }



}

export const PERFORMANCE_STORE = 'performanceStore';
