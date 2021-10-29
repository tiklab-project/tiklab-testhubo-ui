/**
 * @description：
 * @date: 2021-08-24 15:21
 */
import {observable, action} from "mobx";
import {
    findPerformanceStatisticsPage,
    findPerformanceStatistics,
    createPerformanceStatistics,
    deletePerformanceStatistics,
    updatePerformanceStatistics,
    findPerformanceStatisticsList
}from '../api/performanceStatisticsApi';


export class PerformanceStatisticsStore {
    @observable performanceStatisticsList = [];
    @observable performanceStatisticsInfo = {};
    @observable param;
    @observable totalRecord;
    @observable performanceTestId;


    @action
    findPerformanceStatisticsPage = async (id,param) => {
        this.performanceTestId = id;
        this.param = param;
        const params = {
            performanceTestId:id,
            ...param,
            // orderParams: [{name:'name', orderType:'asc'}],
        }
        const res = await  findPerformanceStatisticsPage(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            return this.performanceStatisticsList = res.data.dataList;
        }
    }

    @action
    findPerformanceStatisticsList = async (id) => {
        const params = {
            performanceTestId:id,
            orderParams: [{name:'name', orderType:'asc'}],
        }
        const res = await  findPerformanceStatisticsList(params)
        if(res.code === 0) {
            return this.performanceStatisticsList = res.data;
        }
    }

    @action
    findPerformanceStatistics = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findPerformanceStatistics(param)
        if(res.code === 0){
            return  this.performanceStatisticsInfo = res.data;
        }
    }

    @action
    createPerformanceStatistics = async (values) => {
        const res = await createPerformanceStatistics(values)
        if(res.code === 0){
            return this.findPerformanceStatisticsPage(this.performanceTestId,this.param)
        }
    }

    @action
    updatePerformanceStatistics = async (values) => {
        const res = await updatePerformanceStatistics(values)
        if(res.code === 0){
            this.findPerformanceStatisticsPage(this.performanceTestId,this.param)
        }
    }

    @action
    deletePerformanceStatistics =  async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deletePerformanceStatistics(param)
        if(res.code === 0){
            this.findPerformanceStatisticsPage(this.performanceTestId,this.param)
        }
    }

}

export const PERFORMANCESTATISTICS_STORE = 'performanceStatisticsStore';
