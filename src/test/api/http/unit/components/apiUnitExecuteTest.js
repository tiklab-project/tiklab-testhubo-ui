import React, {useState} from "react";
import ResponseCommon from "../../common/response/responseCommon/responseCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import apiUnitTestDispatchStore from "../store/apiUnitTestDispatchStore";
import {Drawer, Form, Select, Spin, Tooltip} from "antd";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import CaseTableQuickTest from "../../../../common/CaseTableQuickTest/CaseTableQuickTest";

const {Option} = Select

const ApiUnitExecuteTest = (props) =>{
    const {apiEnvStore,apiUnitId,type } = props;
    const {apiUnitExecute} = apiUnitTestDispatchStore;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;

    const [spinning, setSpinning] = useState(true);
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = async () => {

        let values = await form.validateFields()

        //测试环境为空提示
        if(!envUrl&&!values.host){
            return messageFn("error","请填写测试地址")
        }
        setTimeout(()=>{
            setOpen(true);
        },500)

        setSpinning(true)

        //执行测试
        let res = await apiUnitExecute(apiUnitId,envUrl?envUrl:values.host)
        if(res.code===0){
            setData(res.data)
            setSpinning(false)
        }else {
            let msg = res.msg
            let errorMsg
            if(msg) {
                errorMsg = msg.split(":")[1]
                if (errorMsg.includes("Could not connect")) {
                    errorMsg = "无法连接agent"
                } else {
                    errorMsg = "执行异常"
                }
            }else {
                errorMsg = "执行异常"
            }
            return messageFn("error",errorMsg)
        }
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
            value:data?.statusCode||"无",
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


    const findEnv = () =>{
        findApiEnvList(sessionStorage.getItem("repositoryId"))
        form.setFieldsValue({
            host:envUrl
        })
    }

    const showEnv = () =>{
        return  <Form.Item
            label="接口环境"
            rules={[{ required: true, message:"请选择环境"}]}
            name="host"
        >
            <Select
                bordered={false}
                className={"quartz-select-box"}
                placeholder={"未设置环境"}
                style={{width:"280px"}}
                dropdownStyle={{zIndex:1800}}
                onSelect={(value)=>getTestEnvUrl(value)}
                onClick={(e) => e.stopPropagation()}
            >
                {
                    apiEnvList&&apiEnvList.map(item=>{
                        return (
                            <Option key={item.id} value={item.preUrl}>
                                <Tooltip placement="leftTop" title={item.preUrl}> {item.name} </Tooltip>
                            </Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    }

    const showIcon=() =>{
        if(type==="quick"){
            return <CaseTableQuickTest
                form={form}
                findEnv={findEnv}
                clickTest={showDrawer}
                envSelect={showEnv}
            />
        }

        return<a onClick={showDrawer}>
            <IconBtn
                className="important-btn"
                icon={"fasong-copy"}
                name={"测试"}
            />
        </a>;
    }


    return(
        <>
            {showIcon()}
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
                className={"api-unit-drawer"}
            >
                <Spin spinning={spinning}>
                    <CaseBread
                        icon={"api1"}
                        breadItem={["接口测试"]}
                        setOpen={setOpen}
                    />
                    <ResponseCommon
                        detail={showDetail(detail)}
                        reqHeader={processResHeader(data?.requestInstance?.requestHeader)}
                        resBody={data?.responseInstance?.responseBody}
                        resHeader={processResHeader(data?.responseInstance?.responseHeader)}
                        assertList={data?.responseInstance?.assertInstanceList}
                        error={data?.errMessage}
                    />
                </Spin>
            </Drawer>
        </>

    )
}

export default inject("apiEnvStore",)(observer(ApiUnitExecuteTest));

