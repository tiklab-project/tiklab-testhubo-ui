import React, {useEffect, useRef, useState} from "react";
import {Button, Empty, Form, Popconfirm, Select, Space,} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import webSceneStepStore from "../store/webSceneStepStore";
import "./webStyle.scss"
import emptyImg from "../../../../assets/img/empty.png";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import Input from "antd/es/input/Input";
import {Option} from "antd/es/mentions";
import {Axios} from "tiklab-core-ui";

const {
    findWebSceneStepList,
    deleteWebSceneStep,
    findWebSceneStep,
    updateWebSceneStep,
    createWebSceneStep
} = webSceneStepStore;

const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 16,
    },
};
const WebSceneStepList = (props) => {

    const [form] = Form.useForm();
    const listRef = useRef();
    const [isCreate, setIsCreate] = useState(false);
    const [stepSelect, setStepSelect] = useState();
    const [stepList, setStepList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [actionTypeList, setActionTypeList] = useState([]);

    let webSceneId = sessionStorage.getItem("webSceneId");
    useEffect(async ()=>{
        await findPage()

    },[webSceneId])

    useEffect(async ()=>{
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }

        let actionTypeRes= await Axios.post("/actionType/findActionTypeList",{"type": "WEB"});
        if(actionTypeRes.code===0){
            setActionTypeList(actionTypeRes.data)
        }

    },[])

   const findPage = async () =>{
       let list = await findWebSceneStepList(webSceneId);

       setStepList(list)
   }

    /**
     * 新增
     */
    const createStep = () =>{
        setIsCreate(true)
        setStepSelect(null)
        form.resetFields()
    }

    /**
     * 删除
     */
    const deleteStep =async (id) =>{
        deleteWebSceneStep(id).then(async () => {
            let index = stepList.findIndex(item=>item.id===id)
            await findPage()

            if(index > 0) {
                let stepItem = stepList[index-1]
                setStepSelect(stepItem);
                form.setFieldsValue(stepItem)
            } else {
                form.resetFields()
                setStepSelect(null);
            }
        })
    }

    /**
     * 提交
     */
    const onFinish = async () =>{
        let values = await form.validateFields();

        if(stepSelect){
            let param={
                ...stepSelect,
                ...values
            }
            let res =await updateWebSceneStep(param)
            if(res.code===0){
                await findPage()
                setStepSelect(param)
            }
        }else {
            values.webSceneId=webSceneId
            let res = await createWebSceneStep(values)
            if(res.code===0){
                await findPage()
                values.id=res.data
                setStepSelect(values)
            }
            setIsCreate(false)
        }

    }

    const cancel = () =>{
        setStepSelect(null)
        form.resetFields()
    }

    /**
     * 列表项展示
     */
    const showListView = (list) =>{
        if(!list||list.length===0){
            return <Empty
                imageStyle={{height: 120}}
                description={<span style={{fontSize: "13px",color: "#a8a8a8"}}>暂无步骤</span>}
                image={emptyImg}
            />
        }else {
            return list.map((item,index)=>{
                return(
                    <li
                        key={item.id}
                        className={`case-list_li ${item.id===stepSelect?.id?"case-list_li_selected":""}`}
                        onClick={()=>selectListItem(item)}
                    >
                        <div className={"case-list_li_item"} style={{flex:"1"}}>
                            {index+1}
                        </div>
                        <div className={"case-list_li_item"} style={{flex:"7"}}>
                            {item.name}
                        </div>
                        <div className={"case-list_li_delete"} style={{flex:"1"}}>
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() =>  deleteStep(item.id)}
                                okText='确定'
                                cancelText='取消'
                            >
                                <IconCommon
                                    className={"icon-s edit-icon"}
                                    icon={"shanchu3"}
                                />
                            </Popconfirm>
                        </div>
                    </li>
                )
            })
        }
    }

    /**
     * 点击列表右侧出详情
     */
    const selectListItem =async (item) =>{
        setStepSelect(item)

        let data = await findWebSceneStep(item.id)
        form.setFieldsValue({...data})
    }

    /**
     * 滚动加载分页
     */
    const handleScroll = async () => {
        // if (listRef.current) {
        //     const { scrollTop, clientHeight, scrollHeight } = listRef.current;
        //
        //     if (scrollTop + clientHeight >= scrollHeight-10) {
        //
        //         if(totalRecord<pageSize) return;
        //         //如果当前分页大于总数/pageSize,设置当前currentPage为当前
        //         if(currentPage>=Math.ceil(totalRecord/pageSize)){
        //             setCurrentPage(Math.ceil(totalRecord/pageSize));
        //             return;
        //         }
        //         // 调用加载分页数据的方法
        //         setCurrentPage(currentPage+1)
        //         let param = {
        //             pageParam: {
        //                 pageSize: pageSize,
        //                 currentPage:currentPage+1
        //             },
        //         }
        //
        //         await findPage(param,"scroll")
        //     }
        // }
    };


    const showStepView =  () =>{
        if(stepSelect||isCreate){

            return <div className={"case-step_right_box"}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    {...tailLayout}
                >
                    <Form.Item label={"名称"}  name="name">
                        <Input placeholder={"名称"} />
                    </Form.Item>
                    <Form.Item label={"操作方法"} name="actionType" >
                        {
                            functionView(actionTypeList)
                        }
                    </Form.Item>
                    <Form.Item label={"参数"} name="parameter" >
                        <Input
                            placeholder={"参数"}
                            className={"form-input"}
                        />
                    </Form.Item>
                    <Form.Item label={"定位器"} name="location">
                        {
                            locationView(locationList)
                        }
                    </Form.Item>
                    <Form.Item label={"定位器的值"} name="locationValue" >
                        <Input placeholder={"定位器的值"} className={"form-input"}/>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button
                                className={"important-btn"}
                                type="primary"
                                htmlType="submit"
                            >
                                保存
                            </Button>
                            <IconBtn
                                className="pi-icon-btn-grey"
                                onClick={cancel}
                                name={"取消"}
                            />
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        }else {
            return   <Empty
                imageStyle={{height: 120}}
                description={<span style={{fontSize: "13px",color: "#a8a8a8"}}>选择步骤</span>}
                image={emptyImg}
            />
        }
    }

    //定位器下拉选择框渲染
    const locationView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
                placeholder={"定位器"}
            >
                {
                    data&&data.map(item=>{
                        return <Option key={item} value={item}>{item}</Option>
                    })
                }

            </Select>
        )
    }


    //操作方法下拉选择框渲染
    const functionView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
                placeholder={"操作方法"}
                className={"form-select"}
            >
                {
                    data&&data.map(item=>{
                        return (
                            <Option key={item.id} value={item.name}>
                                <div>{item.name}</div>
                                <div style={{color:'#a9a9a9',fontSize:12}}>{item.description}</div>
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }


    return(

        <div className={"case-step_box"} style={{height: "calc(100% - 112px)"}}>
            <div className={"case-step_left"}>
                <div className={"case-step_add"} onClick={createStep}>
                    添加步骤
                </div>
                <ul className={"case-list_ul"} ref={listRef} onScroll={handleScroll}>
                    {
                        showListView(stepList)
                    }
                </ul>
                <div className={"case-list_bottom"}>
                       <span style={{fontSize: "12px", color: "#989898"}}>
                           共{stepList.length}个步骤
                       </span>
                </div>
            </div>

            <div className={"case-list_right ui-case-list_right"}>
                {
                    showStepView()
                }
            </div>

        </div>
    )
}

export default observer(WebSceneStepList)