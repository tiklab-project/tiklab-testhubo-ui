import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react";
import {Button, Form, Space} from "antd";
import {CaretRightOutlined, PlayCircleOutlined} from "@ant-design/icons";
import "./caseTableQuickTestStyle.scss"
import IconCommon from "../../../common/IconCommon";

const CaseTableQuickTest = (props) =>{
    const {form,findEnv,clickTest,envSelect} = props

    const [visible, setVisible] = useState(false);
    const caseToggleRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // 检查点击的目标是否在下拉框内
            if (caseToggleRef.current && !caseToggleRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []); // 空数组表示仅在组件挂载和卸载时执行


    const toggle = () =>{
        findEnv()

        setVisible(!visible)
    }


    return(
        <div className={"case-quick"} ref={caseToggleRef}>
            <div onClick={toggle}>
                <IconCommon
                    icon={"bofang"}
                    className={"icon-m edit-icon"}
                />
            </div>

            <div className={`case-toggle-title ${visible === false ? 'teston-hide' : 'teston-show'}`}>
                <div style={{minHeight:"120px"}}>
                    <Form
                        form={form}
                        preserve={false}
                        layout={"vertical"}
                        onFinish={clickTest}
                    >
                        {envSelect()}

                        <Form.Item>
                            <Space style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button onClick={()=>setVisible(false)} >取消</Button>
                                <Button type="primary" htmlType="submit">测试</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default observer(CaseTableQuickTest);