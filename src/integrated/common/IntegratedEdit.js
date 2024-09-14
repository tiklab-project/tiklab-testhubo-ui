
import React from 'react';
import { observer } from "mobx-react";
import {Form, Modal, Input, Tooltip} from 'antd';
import IconCommon from "../../common/IconCommon";
import integratedUrlStore from "../postin/postinUrl/store/IntegratedUrlStore";
const {createIntegratedUrl,updateIntegratedUrl} = integratedUrlStore;

// 编辑服务地址
const IntegratedEdit = (props) => {
    const { product,type,findPostInList,findTeamWireList,curUrlData ,form} = props;

    const [visible, setVisible] = React.useState(false);

    let repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.type === "edit"){
            if(product==="postin"){
                findPostInList()
            }else {
                findTeamWireList()
            }
        }
    };
    
    // 提交
    const onFinish =async () => {
        let values = await form.validateFields()
        setUrl(values,curUrlData)
        setVisible(false);
    };


    /**
     * 公共方法
     * 设置地址
     */
    const setUrl = async (value,curUrlData) =>{

        if(curUrlData.list.length>0){
            let param = {
                ...curUrlData.curData,
                url:value.url,
            }
            await updateIntegratedUrl(param)

            if(product==="postin"){
                findPostInList()
            }else {
                findTeamWireList()
            }

        }else {
            let param ={
                projectName:product,
                repositoryId:repositoryId,
                url:value.url,
            }

            await createIntegratedUrl(param)
            if(product==="postin"){
                findPostInList()
            }else {
                findTeamWireList()
            }
        }
    }



    const onCancel = () => { setVisible(false) };

    return (
        <>
            <Tooltip title={type==="add"?"添加":"编辑"}>
                <span>
                    <IconCommon
                        icon={"bianji11"}
                        className={"icon-s edit-icon "}
                        onClick={showModal}
                    />
                </span>

            </Tooltip>

        <Modal
            destroyOnClose={true}
            title={props.name}
            visible={visible}
            onCancel={onCancel}
            onOk={onFinish}
            okText="提交"
            cancelText="取消"
            centered
        >
            <Form
                form={form}
                preserve={false}
                layout={"vertical"}
            >
                <Form.Item
                    label="服务地址"
                    rules={[{ required: true, message: '请添加地址' }]}
                    name="url"
                >
                     <Input />
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default observer(IntegratedEdit);
