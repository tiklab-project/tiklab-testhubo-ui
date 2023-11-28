import React, {useEffect, useState} from "react";
import {Form, Row, Col, TreeSelect, Select, Button} from "antd";
import Input from "antd/es/input/Input";
import {inject, observer} from "mobx-react";
import {Axios} from "tiklab-core-ui";
import CaseDesc from "./CaseDesc";

const { TextArea } = Input;
const {Option} = Select
const tailLayout = {
    labelCol:{span: 6}
};

/**
 * 用于详情
 */
const DetailCommon = (props) =>{
    const {categoryStore,updateCase,form,demand } = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;
    const [userList, setUserList] = useState([]);


    const repositoryId = sessionStorage.getItem("repositoryId")
    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[])

    useEffect(async ()=>{
        const params = {
            domainId:repositoryId,
        };
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
                        <Col span={18}>
                            <Form.Item label={"名称"} name="name" labelCol={{span:3}}>
                                <Input placeholder={"名称"} />
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
                                    placeholder="选择模块"
                                    allowClear
                                    treeDefaultExpandAll
                                    treeData={categoryTableList}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label={"状态"} name="status" >
                                <Select placeholder={"无"}>
                                    <Option value={0}>未开始</Option>
                                    <Option value={1}>进行中</Option>
                                    <Option value={2}>结束</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label={"责任人"} name="director">
                                <Select placeholder={"无"}>
                                    {
                                        userList&&userList.map(item=>{
                                            return <Option key={item.user.id} value={item.user.id}>{item.user.nickname}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label={"优先级"} name="priorityLevel" >
                                <Select placeholder={"无"}>
                                    <Option value={0}>低</Option>
                                    <Option value={1}>中</Option>
                                    <Option value={2}>高</Option>
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
                {
                    demand&&demand
                }
            </div>

            <CaseDesc form={form} updateCase={updateCase}/>

        </div>
    )
}

export default inject("categoryStore")(observer(DetailCommon));