import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form,  Button, Input,  Row, Col, Select} from 'antd';
import {Axios, getUser} from "thoughtware-core-ui";

const {TextArea} = Input
const {Option} = Select;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24},
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

/**
 * 项目 新增
 */
const RepositoryEdit = (props) => {
    const { repositoryStore,findList,selectItem } = props;
    const {
        repositoryRecent,
        createRepository,
    } = repositoryStore;
    const [form] = Form.useForm();

    const [visibility, setVisibility] = useState(1);
    const [memberList, setMemberList] = useState([]);
    const [memberSelectList, setMemberSelectList] = useState([]);

    /**
     * 弹框展示
     */
    useEffect( async () => {

        let param ={ }

        let res = await Axios.post('/user/user/findUserList',param);
        if(res.code===0){

            setMemberList(res.data)
        }
    },[])

    /**
     * 去往项目公共配置
     */
    const toRepositoryConfig= (id) =>{
        sessionStorage.setItem("repositoryId",id);

        //最近项目
        let params = {
            repository: {id:id},
            userId:getUser().userId
        }
        repositoryRecent(params)

        props.history.push(`/repository/detail/${id}`);
    }

    /**
     * 提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();
        values.visibility=visibility
        values.userList = memberSelectList;
        values.iconUrl=iconRandom();

        createRepository(values).then((res)=> {
            toRepositoryConfig(res.data)
            findList({}, selectItem)
        });
    };



    /**
     * 随机获取一张图片
     */
    const iconRandom = () =>{
        let arr = [
            "/images/pi1.png",
            "/images/pi2.png",
            "/images/pi3.png",
            "/images/pi4.png",
            "/images/pi5.png",
        ]

        let index = Math.floor(Math.random()*arr.length)

        return arr[index]
    }


    /**
     * 成员下拉框选项
     */
    const showOption = (list) =>{
        return  list&&list.map((item) => <Option key={item.id} value={item.id}>
                <div className={"ws-edit-box-select"}>
                    {item.name}
                </div>
            </Option>
        )
    }

    //成员选择
    const selectChange = (memberList) =>{
        if(memberList&&memberList.length>0){
            let newList=memberList.map(item=>({
                id:item,
                adminRole:item === "111111"     //如果是等于true 管理员，false 普通成员
            }))
            setMemberSelectList(newList)
        }
    }


    /**
     * 关闭
     */
    const onCancel = () => {
        props.history.push("/repository-page")
    };



    return (
        <div className="ws-edit-modal" style={{height:"calc(100% - 40px)",overflow:"auto"}}>
            <Row>
                <Col
                    lg={{ span: "18", offset: "3" }}
                    xl={{ span: "14", offset: "5" }}
                    xxl={{ span: "10", offset: "7" }}
                    style={{ height: "100%" }}
                >
                    <div className={"ws-edit-box"}>
                        <div className={"ws-edit-box-header"}>
                            <div className={"ws-edit-box-header-title"}>添加项目</div>
                        </div>

                        <Form
                            className='ws-edit-modal-form'
                            form={form}
                            preserve={false}
                            layout={"vertical"}
                            {...layout}
                        >
                            <div className={"ws-edit-form-input"}>
                                <Form.Item
                                    label="项目名称"
                                    rules={[{ required: true, message: '添加目录名称!' }]}
                                    name="name"
                                >
                                    <Input  placeholder="项目名称"/>
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="可见范围"
                                name="visibility"
                            >
                                <div className={"ws-edit-visibility"}>
                                    <div className={`ws-edit-visibility-item ${visibility===0?"ws-edit-visibility-action":null}`} onClick={()=>setVisibility(0)}>
                                        <div style={{"display":"flex","alignItems":"center"}}>
                                            <svg style={{width:20,height:20}} aria-hidden="true">
                                                <use xlinkHref= {`#icon-suoding`} />
                                            </svg>
                                            <span>公共</span>
                                        </div>
                                        <div className={"ws-edit-visibility-item-desc"}>公共项目，全部成员可见</div>
                                    </div>

                                    <div className={`ws-edit-visibility-item  ${visibility===1?"ws-edit-visibility-action":null}`}  onClick={()=>setVisibility(1)}>
                                        <div style={{"display":"flex","alignItems":"center"}} >
                                            <svg style={{width:20,height:20}} aria-hidden="true">
                                                <use xlinkHref= {`#icon-jiesuo`} />
                                            </svg>
                                            <span>私密</span>
                                        </div>
                                        <div className={"ws-edit-visibility-item-desc"}>私密项目，只有项目成员可见</div>
                                    </div>
                                </div>
                            </Form.Item>
                            {
                                visibility===1
                                    ? <div className={"ws-edit-form-input"}>
                                        <Form.Item  label="成员选取" {...tailLayout} >
                                            <Select
                                                mode="multiple"
                                                style={{   width: '100%'}}
                                                showArrow
                                                onChange={selectChange}
                                                placeholder={"成员选取"}
                                            >
                                                {showOption(memberList)}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    :null
                            }

                            <Form.Item
                                label="描述"
                                name="desc"
                            >
                                <TextArea  rows={4}  placeholder="项目的描述"/>
                            </Form.Item>
                        </Form>
                        <div className={"ws-edit-box-footer"}>
                            <Button  onClick={onCancel} style={{margin:"0 10px 0 0"}} className={"ws-edit-box-footer-btn"}> 取消 </Button>
                            <Button type="primary" onClick={onFinish}  className={"ws-edit-box-footer-btn important-btn"}> 提交 </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default inject('repositoryStore')(observer(RepositoryEdit));
