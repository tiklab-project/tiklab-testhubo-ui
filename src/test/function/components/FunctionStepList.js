import React, {useEffect, useRef, useState} from "react";
import {Button, Empty, Form, Popconfirm, Space} from "antd";
import emptyImg from "../../../assets/img/empty.png";
import funcUnitStepStore from "../store/funcUnitStepStore";
import Input from "antd/es/input/Input";
import IconBtn from "../../../common/iconBtn/IconBtn";
import IconCommon from "../../../common/IconCommon";

const {TextArea} = Input

const {
    findFuncUnitStepList,
    deleteFuncUnitStep,
    updateFuncUnitStep,
    createFuncUnitStep,
    findFuncUnitStep
} = funcUnitStepStore;

const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 16,
    },
};

const FunctionStepList = () =>{


    const [form] = Form.useForm();
    const listRef = useRef();
    const [isCreate, setIsCreate] = useState(false);
    const [stepSelect, setStepSelect] = useState();
    const [stepList, setStepList] = useState([]);
    const funcUnitId = sessionStorage.getItem('functionId')
    useEffect(async ()=> {
        await findPage()
    },[funcUnitId])

    const findPage =async () =>{
        let list = await findFuncUnitStepList(funcUnitId)

        setStepList(list)
    }


    const deleteStep =async (id) =>{
        deleteFuncUnitStep(id).then(async () => {
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
                            {item.described}
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

        let data = await findFuncUnitStep(item.id)
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
            let res =await updateFuncUnitStep(param)
            if(res.code===0){
                await findPage()
                setStepSelect(param)
            }
        }else {
            values.funcUnitId=funcUnitId
            let res = await createFuncUnitStep(values)
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

    const showStepView = () =>{
        if(stepSelect||isCreate){

            return <div className={"case-step_right_box"}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    {...tailLayout}
                >
                    <Form.Item label="步骤描述" name="described">
                        <TextArea
                            placeholder="步骤描述"
                            autoSize={{minRows:2,maxRows:4}}
                        />
                    </Form.Item>
                    <Form.Item  label="预期结果"  name="expect">
                        <TextArea
                            placeholder="预期结果"
                            autoSize={{minRows:2,maxRows:4}}
                        />
                    </Form.Item>
                    <Form.Item  label="实际结果" name="actual">
                        <TextArea
                            placeholder="实际结果"
                            autoSize={{minRows:2,maxRows:4}}
                        />
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


    const createStep = () =>{
        setIsCreate(true)
        setStepSelect(null)
        form.resetFields()
    }

    return(
        <div className={"case-step_box"}>
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

            <div className={"case-list_right"}>
                {
                    showStepView()
                }
            </div>

        </div>
    )
}

export default FunctionStepList;