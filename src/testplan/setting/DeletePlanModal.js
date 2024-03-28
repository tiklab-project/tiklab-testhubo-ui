import React, {useState} from "react";
import {Button,  Input, Modal} from "antd";

/**
 * 项目设置中的删除项目
 */
const DeletePlanModal = (props) =>{
    const {deleteFn,name} = props;

    const [visible, setVisible] = React.useState(false);
    const [disable, setDisable] = useState(true);

    const onFinish = (e) => {
        if(e.target.value!==name) {
            setDisable(true)
            return
        };

        setDisable(false)
    }


    const showModal = () =>{ setVisible(true); }
    const onCancel = () => { setVisible(false) };

    return(
        <>
            <Button type="primary" danger onClick={showModal}>删除计划</Button>
            <Modal
                destroyOnClose={true}
                title="你确定删除项目吗？"
                visible={visible}
                onCancel={onCancel}
                footer={false}
                width={440}
                centered
            >
                <div className={"ws-delete-box"}>
                    <div className={"ws-delete-tip"}>
                        此操作<span className={"ws-delete-text-bold"}>无法</span>撤消,这将永久删除:
                        <span className={"ws-delete-text-bold"}>{name}</span>
                    </div>
                    <div className={"ws-delete-input-title"}>请输入  <span className={"ws-delete-text-bold"}>{name}</span>  进行确认。</div>

                    <Input onChange={onFinish} />
                    <Button
                        type="primary"
                        danger
                        disabled={disable}
                        onClick={deleteFn}
                        className={"ws-delete-modal-btn"}

                    >
                        我了解后果，删除此项目
                    </Button>
                </div>

            </Modal>
        </>
    )
}

export default DeletePlanModal;