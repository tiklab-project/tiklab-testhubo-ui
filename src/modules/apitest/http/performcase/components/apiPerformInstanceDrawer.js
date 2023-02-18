import React, { useState} from "react";
import {Button, Drawer, Empty, Spin, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./performanceStyle.scss"
import emptyImg from "../../../../../assets/img/empty.png";
import PerformInstanceCommon from "../../../../common/caseCommon/performInstanceCommon";

const ApiPerformInstanceDrawer = (props) =>{
    const {apiPerfInstanceStore,apiPerfInstanceId} = props;
    const {findApiPerfInstance} = apiPerfInstanceStore;


    const [result, setResult] = useState();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const showDrawer = async () =>{
        let res = await findApiPerfInstance(apiPerfInstanceId)
        setLoading(false)
        setResult(res)

        setVisible(true)
    }


    const onClose = () => {
        setVisible(false);
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
            <a style={{fontWeight:"bold"}} onClick={showDrawer}>{props.name}</a>

            <Drawer
                title="测试结果"
                placement={"right"}
                onClose={onClose}
                visible={visible}
                width={960}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
                <div  className={"result-spin-box"}>
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

export default inject("apiPerfInstanceStore")(observer(ApiPerformInstanceDrawer));