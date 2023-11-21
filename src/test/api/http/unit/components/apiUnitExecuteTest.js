import React, {useState} from "react";
import ResponseCommon from "../../common/response/responseCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import apiUnitTestDispatchStore from "../store/apiUnitTestDispatchStore";
import {Drawer, Form} from "antd";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";

const ApiUnitExecuteTest = (props) =>{
    const {apiEnvStore,apiUnitId } = props;
    const {apiUnitExecute} = apiUnitTestDispatchStore;
    const { envUrl } = apiEnvStore;

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = async () => {
        let values = await form.validateFields()

        //测试环境为空提示
        if(!envUrl&&!values.host){
            return messageFn("error","请填写测试地址")
        }

        //执行测试
        let res = await apiUnitExecute(apiUnitId,envUrl?envUrl:values.host)
        if(res.code===0){
            setData(res.data)
        }

        if(res.code===60000){
            messageFn("error","Agent错误")
        }

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:data?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:data?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:data?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:data?.result ? '成功' : '失败',
            key:"result"
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

                    <span className={"history-detail-item-box-value"}>{item.value}</span>

                </div>
            )
        })
    }


    return(
        <>
            <a onClick={showDrawer}>
                <IconBtn
                    className="important-btn"
                    icon={"fasong-copy"}
                    name={"测试"}
                />
            </a>
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
                    icon={"jiekou1"}
                    title={"接口测试"}
                    setOpen={setOpen}
                />
                <ResponseCommon
                    detail={showDetail(detail)}
                    resBody={data?.responseInstance?.responseBody}
                    resHeader={processResHeader(data?.responseInstance?.responseHeader)}
                    reqHeader={processResHeader(data?.requestInstance?.requestHeader)}
                />
            </Drawer>
        </>

    )
}

export default inject("apiEnvStore",)(observer(ApiUnitExecuteTest));