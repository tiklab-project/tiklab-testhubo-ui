import React from "react";
import {Empty, Spin, Table} from "antd";
import { observer} from "mobx-react";

const ApiPerfInstanceDetail = (props) =>{
    const {result,loading} =props

    let columns= [
        {
            title: '名称',
            dataIndex: 'name',
            width: '10%',
        },
        {
            title: '总次数',
            width: '5%',
            dataIndex: 'totalRequests',
        },
        {
            title: '总耗时(s)',
            dataIndex: 'totalElapsedTime',
            width: '5%',
        },
        {
            title: 'Max(ms)',
            dataIndex: 'maxElapsedTime',
            width: '5%',
        },
        {
            title: 'Min(ms)',
            dataIndex: 'minElapsedTime',
            width: '5%',
        },
        {
            title: 'Avg(ms)',
            dataIndex: 'avgElapsedTime',
            width: '5%',
        },
        {
            title: 'TPS',
            dataIndex: 'tps',
            width: '5%',
        },
        {
            title: '90%',
            dataIndex: 'percentile90',
            width: '5%',
        },{
            title: '95%',
            dataIndex: 'percentile95',
            width: '5%',
        },
        {
            title: '99%',
            dataIndex: 'percentile99',
            width: '5%',
        },
        {
            title: '错误率',
            dataIndex: 'errorRate',
            width: '5%',
            render: (text, record) => (<span>{text}%</span>)
        },
    ]
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
                <div style={{fontWeight:"bold",padding:"6px"}}>接口列表</div>
                <div className='table-list-box  test-step-box'>
                    {
                        result?.apiPerfStepInstanceList&&result?.apiPerfStepInstanceList.map((item,index)=>{
                            return(
                                <div className={"perform-test-table"}>
                                    <Table
                                        columns={columns}
                                        dataSource={item?.apiPerfStepUnitCalcList}
                                        rowKey={(record, index) => index}
                                        pagination={false}
                                        locale={{
                                            emptyText: <Empty
                                                imageStyle={{ height: 100}}
                                                description={<span>暂无测试步骤</span>}
                                            />,
                                        }}
                                        showHeader={index === 0}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Spin>
    )
}

export default observer(ApiPerfInstanceDetail);