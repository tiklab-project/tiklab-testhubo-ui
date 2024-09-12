import React, {useEffect, useState} from "react";
import {Form, Row, Col, TreeSelect, Select, Button, Tag} from "antd";
import Input from "antd/es/input/Input";
import {inject, observer} from "mobx-react";
import {Axios} from "thoughtware-core-ui";
import CaseDesc from "./CaseDesc";
import {showCaseTypeInList} from "./CaseCommonFn";
import IconCommon from "../IconCommon";

const {Option} = Select
const tailLayout = {
    labelCol:{span: 6}
};

/**
 * 用于详情
 */
const DetailCommon = (props) =>{
    const {categoryStore,updateCase,form,demand,detailInfo} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;
    const [userList, setUserList] = useState([]);

    const repositoryId = sessionStorage.getItem("repositoryId")
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


    return(
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

                        <Col span={12}>
                            <Form.Item label={"名称"} name="name" >
                                <Input placeholder={"名称"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={"用例类型"} >
                                <div style={{margin:"0 0 0 10px"}}>{showCaseTypeInList(detailInfo?.testCase?.caseType)}</div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        <Col span={12}>
                            <Form.Item label={"状态"} name="status" >
                                <Select placeholder={"未设置"}>
                                    <Option value={0}><Tag color="#bfc4c6">未开始</Tag></Option>
                                    <Option value={1}><Tag color="#76b6f1">进行中</Tag></Option>
                                    <Option value={2}><Tag color="#f29e9ee8">结束</Tag></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        <Col span={12}>
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

                        <Col span={12}>
                            <Form.Item label={"创建时间"} name="createTime" >
                                <Input disabled={true} placeholder={"创建时间"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={"更新时间"} name="updateTime" >
                                <Input disabled={true}  placeholder={"更新时间"}/>
                            </Form.Item>
                        </Col>
                        {
                            demand
                                ?<Col span={12}>
                                        <Form.Item label={"关联需求"} name="updateTime" >
                                            {demand}
                                        </Form.Item>
                                </Col>
                                :null
                        }
                    </Row>
                </Form>
            </div>
            <Row >
                <Col span={24}>
                    <CaseDesc form={form} updateCase={updateCase}/>
                </Col>
            </Row>

        </div>
    )
}

export default inject("categoryStore")(observer(DetailCommon));