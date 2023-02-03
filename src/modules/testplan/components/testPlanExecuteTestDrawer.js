import React, {useState} from "react";
import IconBtn from "../../common/iconBtn/IconBtn";
import {Drawer, Empty, Form, Input, Spin, Table} from "antd";
import {testPlanTestDispatch} from "../api/testPlanDetailApi";
import {inject, observer} from "mobx-react";
import {messageFn} from "../../common/messageCommon/messageCommon";
import emptyImg from "../../../assets/img/empty.png";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/caseCommonFn";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

const TestPlanExecuteTestDrawer = (props) =>{
    const {apiEnvStore,appEnvStore,webEnvStore,testPlanId} = props;
    const {envUrl} = apiEnvStore
    const {appEnv} = appEnvStore
    const {webEnv} = webEnvStore


    const [visible, setVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [caseList, setCaseList] = useState();

    const [form] = Form.useForm();

    let columns= [
        {
            title: '名称',
            width: '25%',
            dataIndex: 'name',
        },
        {
            title: '测试类型',
            width: '25%',
            dataIndex: 'testType',
            render: (text) =>(showTestTypeView(text))
        },
        {
            title: '用例类型',
            dataIndex: 'caseType',
            width: '25%',
            render: (text) =>(showCaseTypeView(text))
        },
        {
            title: '是否通过',
            width: 150,
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]



    const showModal = async () =>{
        if(envUrl) {
            setVisible(true)

            let params = {
                apiEnv: envUrl,
                testPlanId:testPlanId,
                appEnv:appEnv,
                webEnv:webEnv
            }

            let res = await testPlanTestDispatch(params)
            if(res.code===0){
                let data = res.data

                form.setFieldsValue({
                    result:data.result===1?"成功":"失败",
                    total:data.total,
                    passNum:data.passNum,
                    failNum:data.failNum,
                    passRate:data.passRate,
                })

                setCaseList(data?.testPlanCaseInstanceList)

                setSpinning(false)
            }
        }else {
            messageFn("error","请选择环境")
        }
    }

    const onClose = () => {
        setVisible(false);
        setCaseList([])
        setSpinning(true)
    };

    return(
        <>
            <IconBtn
                className="important-btn"
                name={"执行测试"}
                onClick={showModal}
            />
            <Drawer
                title="测试"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={1240}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
                <Spin spinning={spinning}>
                    <div className={"unit-instance-detail"}>
                        <div className={"header-item"}>测试详情</div>
                        <div style={{padding:"10px 0 "}}>
                            <Form
                                form={form}
                                preserve={false}
                                {...layout}
                                labelCol={{ style: { width: '100%', height: '30px' } }} //label样式
                                labelAlign="left" //label样式
                            >
                                <div className='test-detail-from'>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>测试结果</span>
                                        <Form.Item name="result"><Input /></Form.Item>
                                    </div>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>用例数</span>
                                        <Form.Item name="total"><Input /></Form.Item>
                                    </div>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>测试通过率</span>
                                        <Form.Item name="passRate"><Input /></Form.Item>
                                    </div>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>通过步骤数</span>
                                        <Form.Item name="passNum"><Input /></Form.Item>
                                    </div>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>未通过步骤数</span>
                                        <Form.Item name="failNum"><Input /></Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className={"header-item"}>用例列表</div>
                        <div className='table-list-box' style={{margin: "10px"}}>
                            <Table
                                columns={columns}
                                dataSource={caseList}
                                rowKey={record => record.id}
                                pagination={false}
                                locale={{
                                    emptyText: <Empty
                                        imageStyle={{ height: 120}}
                                        description={<span>暂无测试用例</span>}
                                        image={emptyImg}
                                    />,
                                }}
                            />
                        </div>
                    </div>
                </Spin>
            </Drawer>
        </>
    )
}

export default inject("apiEnvStore","appEnvStore","webEnvStore")(observer(TestPlanExecuteTestDrawer));