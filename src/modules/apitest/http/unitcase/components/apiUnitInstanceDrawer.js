import React, { useState} from "react";
import {inject, observer} from "mobx-react";
import {Drawer} from "antd";
import "./apiUnitInstanceStyle.scss"
import IconCommon from "../../../../common/iconCommon";
import {TextMethodType} from "../../common/methodType";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import ResponseCommon from "../../common/response/responseCommon";

const ApiUnitInstanceDrawer = (props) =>{
    const {apiUnitInstanceStore,apiUnitInstanceId} = props;
    const {findApiUnitInstance} = apiUnitInstanceStore;


    const [visible, setVisible] = useState(false);
    const [allData, setAllData] = useState();

    const showDrawer = () => {
        findApiUnitInstance(apiUnitInstanceId).then(res=>{
            setAllData(res)
        })

        setVisible(true);
    };


    const onClose = () => {
        setVisible(false);
    };


    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:allData?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:allData?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:allData?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:allData?.result ? '成功' : '失败',
            key:"result"
        },{
            title:"测试时间:",
            value:allData?.createTime,
            key:"testTime"
        },
    ]

    //响应结果基础信息展示
    const showDetail = (data) =>{
        return data.map(item=>{
            return(
                <div key={item.key} className={"history-detail-item-box"}>
                    <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                        <span className={"history-detail-item-box-title"}>{item.title}</span>
                    </div>

                    {
                        item.key==="methodType"
                            ? <TextMethodType type={allData?.requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }


    return(
        <div className={"case-history-box"}>
            <a onClick={showDrawer} style={{fontWeight:"bold"}}>{props.name}</a>
            <Drawer
                title="测试结果"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={860}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
                <ResponseCommon
                    detail={showDetail(detail)}
                    resBody={allData?.responseInstance?.responseBody}
                    resHeader={processResHeader(allData?.responseInstance?.responseHeader)}
                    reqHeader={processResHeader(allData?.requestInstance?.requestHeader)}
                />
            </Drawer>
        </div>
    )

}

export default inject("apiUnitInstanceStore")(observer(ApiUnitInstanceDrawer));