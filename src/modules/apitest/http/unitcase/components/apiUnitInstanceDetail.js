import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Tabs } from 'antd';
import {TextMethodType} from "../../common/methodType";
import ResponseBodyCommon from "../../common/response/responseBodyCommon";
import ResHeaderCommon from "../../common/response/resHeaderCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";

const { TabPane } = Tabs;

const ApiUnitInstanceDetail = (props) => {
    const { apiUnitInstanceStore, apiUnitInstanceId } = props;
    const { findApiUnitInstance } = apiUnitInstanceStore;

    const [visible, setVisible] = useState(false);

    const [allData, setAllData] = useState();
    const [requestInstance,setRequestInstance]=useState({})
    const [statusCode, setStatusCode] = useState("");
    const [result, setResult] = useState();
    const [testTime, setTestTime] = useState();

    //展示测试结果详情
    const showModal = async () => {
        let res = await findApiUnitInstance(apiUnitInstanceId);

        setAllData(res)
        setStatusCode(res.statusCode);
        setResult(res.result)
        setRequestInstance(res.requestInstance);
        setTestTime(res.createTime)

        setVisible(true);
    }

    const detail = [
        {
            title:"请求地址:",
            value:requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:result ? '成功' : '失败',
            key:"result"
        },{
            title:"测试时间:",
            value:testTime,
            key:"testTime"
        },
    ]

    const showDetail = (data) =>{
        return data.map(item=>{
            return(
                <div key={item.key} className={"history-detail-item-box"}>
                    <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                        <span className={"history-detail-item-box-title"}>{item.title}</span>
                    </div>

                    {
                        item.key==="methodType"
                            ? <TextMethodType type={requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }


    const handleCancel = () => {setVisible(false)};

    return(
        <>
            <div onClick={showModal}  className={"instance-list-item"}>{  props.item }</div>
            <Modal
                title='查看测试详情'
                destroyOnClose={true}
                visible={visible}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                {
                    showDetail(detail)
                }

                <Tabs defaultActiveKey="1"  >
                    <TabPane tab="响应体" key="1">
                        <div className={"history-res-height"}>
                            <ResponseBodyCommon responseBodyData={allData?.responseInstance?.responseBody} />
                        </div>

                    </TabPane>
                    <TabPane tab="响应头" key="2">
                        <div className={"history-res-height"}>
                            <ResHeaderCommon headers={processResHeader(allData?.responseInstance?.responseHeader)}/>
                        </div>
                    </TabPane>

                    <TabPane tab="请求头" key="3">
                        <div className={"history-res-height"}>
                            <ResHeaderCommon headers={processResHeader(allData?.requestInstance?.requestHeader)}/>
                        </div>
                    </TabPane>

                </Tabs>
            </Modal>
        </>
    )
}

export default inject('apiUnitInstanceStore')(observer(ApiUnitInstanceDetail));
