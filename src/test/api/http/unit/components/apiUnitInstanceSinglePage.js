import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {TextMethodType} from "../../common/methodType";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import ResponseCommon from "../../common/response/responseCommon";
import apiUnitInstanceStore from "../store/apiUnitInstanceStore";
import CaseBread from "../../../../../common/CaseBread";
import {Drawer} from "antd";

const ApiUnitInstanceSinglePage = (props) =>{
    const {apiUnitInstanceId,name} = props
    const {findApiUnitInstance} = apiUnitInstanceStore;

    const [allData, setAllData] = useState();
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        findApiUnitInstance(apiUnitInstanceId).then(res=>{
            setAllData(res)
        })
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
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
        <>
            <a onClick={showDrawer} >{name}</a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <CaseBread
                    title={"历史详情"}
                    icon={"jiekou1"}
                    setOpen={setOpen}
                />
                <ResponseCommon
                    detail={showDetail(detail)}
                    resBody={allData?.responseInstance?.responseBody}
                    resHeader={processResHeader(allData?.responseInstance?.responseHeader)}
                    reqHeader={processResHeader(allData?.requestInstance?.requestHeader)}
                />
            </Drawer>
        </>
    )

}

export default observer(ApiUnitInstanceSinglePage);