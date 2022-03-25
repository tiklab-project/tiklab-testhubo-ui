/**
 * @description：APP测试详情页
 * @date: 2021-09-7 11:13
 */
import React, {useState} from 'react';
import {Drawer} from 'antd'
import {inject, observer} from "mobx-react";

const PerformanceHistoryDetail= (props) => {
    const {performanceStatisticsStore,itemId} = props;
    const {findPerformanceStatistics} = performanceStatisticsStore;

    const [visible, setVisible] = useState(false);
    const [testResultInfo,setTestResultInfo] = useState({})
    //弹窗显示
    const showDrawer = () => {
        setVisible(true);
        findPerformanceStatistics(itemId).then(res=>{
            setTestResultInfo(res)
        })
    };

    // 关闭弹框
    const onClose = () => {
        setVisible(false);
        
    }

    //汇总的信息数据
    const testResultInfoObj = [
        {
            title:'总耗时',
            value:testResultInfo?.allResponseTime,
            key:'allResponseTime',
        },{
            key:'averageResponseTime',
            title:'平均响应时间',
            value:testResultInfo?.averageResponseTime
        },{
            key:'errorRate',
            title:'错误率',
            value:testResultInfo?.errorRate
        },{
            key:'maxuimumResponseTime',
            title:'最大响应时间',
            value:testResultInfo?.maxuimumResponseTime
        },{
            key:'middleResponseTime',
            title:'中位数',
            value:testResultInfo?.middleResponseTime
        },{
            key:'minimumResponseTime',
            title:'最小响应时间',
            value:testResultInfo?.minimumResponseTime
        },{
            key:'requestData',
            title:'执行次数',
            value:testResultInfo?.requestData
        },{
            key:'result',
            title:'结果',
            value:testResultInfo?.result
        }
    ]

    //汇总信息的每项界面
    const resultView = (data) => {
        return data&&data.map(item=>{
            return(
                <div className={'history-info-item'}>
                    <div>{item.title}</div>
                    <div>{item.value}</div>
                </div>
            )
        })
    }

    return (
        <>
            <a style={{marginRight:10}}  onClick={showDrawer}>测试详情</a>
            <Drawer
                title="测试详情"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={900}
                destroyOnClose={true}
            >
                <div className='test-detail-contant'>
                    <div className={'history-info'}>
                        {
                            resultView(testResultInfoObj)
                        }
                    </div>

                </div>
            </Drawer>
        </>
    );
}

export default inject('performanceStatisticsStore')(observer(PerformanceHistoryDetail));
