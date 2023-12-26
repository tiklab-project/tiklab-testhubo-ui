import React, {useEffect, useState} from "react";
import {Drawer, Spin} from "antd";
import { observer} from "mobx-react";
import PerformInstanceCommon from "../../../../../common/caseCommon/PerformInstanceCommon";
import apiPerfInstanceStore from "../store/apiPerfInstanceStore";
import CaseBread from "../../../../../common/CaseBread";

const ApiPerfInstanceSinglePage = ({apiPerfInstanceId,name}) =>{
    const {findApiPerfInstance} = apiPerfInstanceStore;

    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        let res = await findApiPerfInstance(apiPerfInstanceId)
        setLoading(false)
        setResult(res)
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


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
        <>
            <span className={"link-text"} onClick={showDrawer} >{name}</span>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <CaseBread
                    breadItem={["历史详情"]}
                    icon={"api1"}
                    setOpen={setOpen}
                />
                <div  className={"result-spin-box"} style={{margin:"0 10px",overflow: "hidden",height: "calc( 100% - 52px )"}} >
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
            </div>
            </Drawer>
        </>

    )
}

export default observer(ApiPerfInstanceSinglePage);