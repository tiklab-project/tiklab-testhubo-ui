/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, { useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal} from 'antd';
import IconBtn from "../../common/iconBtn/IconBtn";
import ApiEnvSelect from "../../sysmgr/environment/components/apiEnvSelect";
import AppEnvSelect from "../../sysmgr/environment/components/appEnvSelect";
import WebEnvSelect from "../../sysmgr/environment/components/webEnvSelect";

// 添加与编辑
const TestPlanENVModal = (props) => {
    const { } = props;

    const [visible, setVisible] = useState(false);

    // 弹框展示
    const showModal = () => {
        setVisible(true)
    };

    // 关闭弹框
    const onCancel = () => { setVisible(false) };

    return (
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"环境"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title='环境设置'
                visible={visible}
                onCancel={onCancel}
                // onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={600}
                footer={false}
            >
                <div className={"test-plan-env-width"}>
                    <div>接口环境</div>
                    <ApiEnvSelect {...props}/>

                </div>
                <div className={"test-plan-env-width"}>
                    <div>WEB环境</div>
                    {/*<ApiEnvSelect {...props}/>*/}
                    <WebEnvSelect />

                </div>
                <div className={"test-plan-env-width"}>
                    <div>APP环境</div>
                    {/*<ApiEnvSelect {...props}/>*/}
                    <AppEnvSelect />
                </div>

            </Modal>
        </>
    );
};

export default inject('apiEnvStore',"testcaseStore")(observer(TestPlanENVModal));
