import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import {Drawer, Empty, Form, Select, Spin, Table, Tooltip} from "antd";
import emptyImg from "../../../../../assets/img/empty.png";
import apiPerfTestDispatchStore from "../store/apiPerfTestDispatchStore";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import {LoadingOutlined} from "@ant-design/icons";
import CaseTableQuickTest from "../../../../common/CaseTableQuickTest/CaseTableQuickTest";
import {testExecuteStatus} from "../../../../../common/dictionary/dictionary";
const {Option} = Select

const ApiPerfExecuteTestPage = (props) =>{
    const {type,apiEnvStore,apiPerfId} = props;

    const {apiPerfExecute,exeResult} = apiPerfTestDispatchStore;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;

    let ref = useRef(null)
    const [spinning, setSpinning] = useState(true);
    const [result, setResult] = useState();
    const [stepList, setStepList] = useState([]);
    const [start, setStart] = useState(false)
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    let columns= [
        {
            title: '步骤数',
            width: '18%',
            dataIndex: 'testNumber',
        },
        {
            title: '通过数',
            width: '18%',
            dataIndex: 'passNumber',
        },
        {
            title: '失败数',
            dataIndex: 'failNumber',
            width: '18%',
        }, {
            title: '通过率',
            dataIndex: 'passRate',
            width: '18%',
        },
        {
            title: '耗时',
            dataIndex: 'elapsedTime',
            width: '18%',
            render: (text, record) => (<div>{text}ms</div>)
        },
        {
            title: '是否通过',
            width: '10%',
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]

    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(async ()=>{
                //获取结果
                let res = await exeResult(apiPerfId,envUrl)

                if(res.code===0){
                    let data = res.data
                    setResult(data.apiPerfInstance)
                    setStepList(data.apiSceneInstanceList)

                    setSpinning(false)

                    if (data?.apiPerfInstance?.status !== testExecuteStatus.TEST_STATUS_START) {
                        clearInterval(ref.current);
                        setStart(false);
                        messageFn("success", "执行完成");
                    }
                } else {
                    clearInterval(ref.current); // 出错时清理定时器
                    setStart(false);
                    messageFn("error", "执行失败");
                }
            }, 2000);
        }
        // 组件卸载时的清理函数
        return () => {
            if (ref.current) {
                clearInterval(ref.current); // 清理定时器
            }
        };
    },[start])

    const showDrawer = async () => {
        if(envUrl){
            let res = await apiPerfExecute(apiPerfId,envUrl)
            if(res.code===10000){
                messageFn("error", "Agent is not found. check the agent");
                return;
            }
            if(res.code===10001){
                messageFn("error", "Agent execute test failed");
                return;
            }

            setOpen(true);
            setStart(true);
        }else {
            messageFn("error","请选择环境")
        }

    };

    const onClose = () => {
        setStepList([]);
        setResult(null)

        setSpinning(true)
        setOpen(false);
    };


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
                width={1000}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >

                <CaseBread
                    breadItem={["接口性能测试"]}
                    icon={"api1"}
                    setOpen={setOpen}
                />
                <div style={{height:"calc(100% - 50px)"}}>
                    <Spin spinning={spinning}>
                        <div className={"history-detail history-detail-box"}>
                            <div className={"history-detail-all"}>
                                <div className={"history-detail-all-box"}>
                                    <div className={"history-detail-all-item"}>
                                        {
                                            start
                                                ? <>
                                                    <div>状态</div>
                                                    <Spin indicator={<LoadingOutlined style={{fontSize: 24,margin:"15px 40px"}} spin/>} />
                                                </>

                                                : <>
                                                    <div>总数</div>
                                                    <div className={"history-detail-all-item-value"}>{result?.total}</div>
                                                </>
                                        }

                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>通过数</div>
                                        <div className={"history-detail-all-item-value"}>{result?.passNum}</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>未通过数</div>
                                        <div className={"history-detail-all-item-value"}>{result?.failNum}</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>通过率</div>
                                        <div className={"history-detail-all-item-value"}>{result?.passRate}</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>失败率</div>
                                        <div className={"history-detail-all-item-value"}>{result?.errorRate}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{fontWeight:"bold",padding:"6px"}}>场景列表</div>
                            <div className='table-list-box  test-step-box'>
                                <Table
                                    columns={columns}
                                    dataSource={stepList}
                                    rowKey={(record, index) => index}
                                    pagination={false}
                                    locale={{
                                        emptyText: <Empty
                                            imageStyle={{ height: 120}}
                                            description={<span>暂无测试步骤</span>}
                                            image={emptyImg}
                                        />,
                                    }}
                                />
                            </div>
                        </div>
                    </Spin>
                </div>

            </Drawer>
        </>
    )
}

export default inject('apiPerfStore',"apiEnvStore")(observer(ApiPerfExecuteTestPage))