import React, { useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Col, Form, Input, Row, Select, Tag, TreeSelect} from 'antd';
import Request from './request';
import {dictionary} from "../../../../../common/dictionary/dictionary";
import MethodType, {TextMethodType} from "../../common/methodType";
import Response from "./response";
import "../../../../common/styles/testcaseStyle.scss"
import "../../../../common/styles/caseContantStyle.scss"
import "../../../../common/styles/unitcase.scss"
import {showCaseTypeInList} from "../../../../../common/caseCommon/CaseCommonFn";
import IconCommon from "../../../../../common/IconCommon";
import {Axios} from "thoughtware-core-ui";

const {Option} = Select;

const tailLayout = {
    labelCol:{span: 6}
};

const ApiUnitEditPageCommon = (props) => {
    const { apiUnitStore,categoryStore } = props;
    const { findApiUnit,updateApiUnit } = apiUnitStore;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    const apiUnitId = sessionStorage.getItem('apiUnitId');
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [form] = Form.useForm()
    const [apiUnitData, setApiUnitData] = useState();
    const [userList, setUserList] = useState([]);

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setApiUnitData(res)
        let testCase = res.testCase

        form.setFieldsValue({
            methodType:res.methodType,
            path:res.path,
            name: testCase.name,
            category:testCase.category?.id,
            updateTime:testCase.updateTime,
            createTime:testCase.createTime,
            status:testCase.status,
            priorityLevel:testCase.priorityLevel,
            director:testCase.director?.id,
            desc: testCase.desc,

        })
    },[apiUnitId])


    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[])

    useEffect(async ()=>{
        const params = {domainId:repositoryId};
        const res = await Axios.post("/dmUser/findDmUserPage",params);
        if(res.code===0){
            setUserList(res.data.dataList)
        }
    },[])


    const updateCase = async () =>{
        let newData = await form.getFieldsValue()
        const params = {
            id:apiUnitData.id,
            path:newData.path,
            methodType:newData.methodType,
            testCase: {
                ...apiUnitData.testCase,
                name:newData.name,
                category:{id:newData.category||"nullstring"},
                status:newData.status,
                priorityLevel:newData.priorityLevel,
                director: {id:newData.director},
                desc:newData.desc
            }
        }
        updateApiUnit(params).then(()=>{
            findApiUnit(apiUnitId)
        })
    }

    return(
        <div>
            <div className={"detail-box"}>
                <div style={{padding:"15px 0 "}}>
                    <div className={"title-bold"}>基本信息:</div>
                    <Form
                        form={form}
                        layout="inline"
                        onValuesChange={updateCase}
                        className={"base-info-form"}
                        {...tailLayout}
                    >
                        <Row gutter={[0,10]}>
                            <Col span={9}>
                                <Form.Item label={"名称"} name="name" labelCol={{span:6}}>
                                    <Input placeholder={"名称"} />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"用例类型"} labelCol={{span:6}}>
                                    <div style={{margin:"0 0 0 10px"}}>{showCaseTypeInList(apiUnitData?.testCase?.caseType)}</div>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"路径"} name="path" labelCol={{span:6}}>
                                    <Input placeholder={"路径"} />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"模块"} name="category" >
                                    <TreeSelect
                                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                        style={{  width: '100%'}}
                                        dropdownStyle={{
                                            maxHeight: 400,
                                            overflow: 'auto',
                                        }}
                                        placeholder="未设置"
                                        allowClear
                                        treeDefaultExpandAll
                                        treeData={categoryTableList}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"请求类型"} labelCol={{span:6}} name="methodType" >
                                    <Select placeholder={"未设置"}>
                                        {
                                            dictionary.requestType.map(item=>{
                                                return <Option value={item}  key={item}>
                                                    <TextMethodType type={item} />
                                                </Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"状态"} name="status" >
                                    <Select placeholder={"未设置"}>
                                        <Option value={0}><Tag color="cyan">未开始</Tag></Option>
                                        <Option value={1}><Tag color="processing">进行中</Tag></Option>
                                        <Option value={2}><Tag color="success">结束</Tag></Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"优先级"} name="priorityLevel" >
                                    <Select placeholder={"未设置"}>
                                        <Option value={0}>
                                            <div className={"display-flex-gap"}>
                                                <IconCommon
                                                    className={"icon-s"}
                                                    icon={"icon_level1"}
                                                    style={{cursor:"pointer"}}
                                                />
                                                <div>低</div>
                                            </div>
                                        </Option>
                                        <Option value={1}>
                                            <div className={"display-flex-gap"}>
                                                <IconCommon
                                                    className={"icon-s"}
                                                    icon={"icon_level2"}
                                                    style={{cursor:"pointer"}}
                                                />
                                                <div>中</div>
                                            </div>
                                        </Option>
                                        <Option value={2}>
                                            <div className={"display-flex-gap"}>
                                                <IconCommon
                                                    className={"icon-s"}
                                                    icon={"icon_level3"}
                                                    style={{cursor:"pointer"}}
                                                />
                                                <div>高</div>
                                            </div>
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"责任人"} name="director">
                                    <Select placeholder={"未设置"}>
                                        {
                                            userList&&userList.map(item=>{
                                                return <Option key={item?.user?.id} value={item?.user?.id}>{item?.user?.nickname}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"创建时间"} name="createTime" >
                                    <Input disabled={true} placeholder={"创建时间"} />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={"更新时间"} name="updateTime" >
                                    <Input disabled={true}  placeholder={"更新时间"}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

            <div className="header-title ex-title">请求</div>
            <div className={"white-bg-box"}>
                <Request apiUnitId={apiUnitId}/>
            </div>

            <div className='header-title ex-title'> 响应</div>
            <Response apiUnitId={apiUnitId} />

        </div>
    )
}

export default inject('apiUnitStore',"categoryStore")(observer(ApiUnitEditPageCommon));