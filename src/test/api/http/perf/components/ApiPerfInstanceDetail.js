import React from "react";
import {Drawer, Spin} from "antd";
import { observer} from "mobx-react";
import PerformInstanceCommon from "../../../../../common/caseCommon/PerformInstanceCommon";
const ApiPerfInstanceDetail = (props) =>{
    const {result,loading} =props

    let option = {

        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    {name:"通过率",value:result?.passNum},
                    {name:"失败率",value:result?.failNum},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return(
        <Spin spinning={loading}>
            <div className={"history-detail history-detail-box"}>
                <div className={"history-detail-all"}>
                    <div className={"history-detail-all-box"}>
                        <div className={"history-detail-all-item"}>
                            <div>通过率</div>
                            <div className={"history-detail-all-item-value"}>{result?.passRate}</div>
                        </div>
                        <div className={"history-detail-all-item"}>
                            <div>失败率</div>
                            <div className={"history-detail-all-item-value"}>{result?.errorRate}</div>
                        </div>
                        <div className={"history-detail-all-item"}>
                            <div>总数</div>
                            <div className={"history-detail-all-item-value"}>{result?.total}</div>
                        </div>
                        <div className={"history-detail-all-item"}>
                            <div>通过数</div>
                            <div className={"history-detail-all-item-value"}>{result?.passNum}</div>
                        </div>

                        <div className={"history-detail-all-item"}>
                            <div>未通过数</div>
                            <div className={"history-detail-all-item-value"}>{result?.failNum}</div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", height: "100%"}} >

                    <PerformInstanceCommon option={option} data={result}/>
                </div>
            </div>
        </Spin>
    )
}

export default observer(ApiPerfInstanceDetail);