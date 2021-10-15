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
    findTestCaseAll,
    executeTest,
    taskResult,
    endOrPauseTest
}from '../api/performanceApi';


export class PerformanceStore {
    @observable performanceList = [];
    @observable performanceInfo = {};
    @observable totalRecord ;
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
    findPerformancePage = (id,param) => {
        const params = {
            repositoryId:id,
            ...param,
            orderParams: [{
                name:'name',
                orderType:'asc'
            }],
        }

        const that = this;
        return new Promise(function(resolve, reject){
            findPerformancePage(params).then(res => {
                if(res.code === 0) {
                    that.performanceList = res.data.dataList;
                    that.totalRecord = res.data.totalRecord;
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findPerformance = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findPerformance(param).then((res) => {
                if(res.code === 0){
                    that.performanceInfo = res.data;
                    that.testcaseId = res.data.testCase.id;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    createPerformance = (values) => {
        return createPerformance(values).then((res) => {
            if(res.code === 0){
                this.findPerformancePage()
            }
            return res
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updatePerformance = (values) => {
        updatePerformance(values).then((res) => {
            if(res.code === 0){
                this.findPerformancePage();
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deletePerformance = (id) => {
        const param = new FormData();
        param.append('id', id);
        deletePerformance(param).then((res) => {
            this.findPerformancePage();
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    findTestCaseAll = () => {
        const that =this;
        return new Promise(function(resolve, reject){
            findTestCaseAll().then((res) => {
                if(res.code === 0){
                    that.testcaseList = res.data;
                    that.testRecord = null
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
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
