import React, {useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";

const DeleteRepositoryModal = (props) =>{
    const {repositoryStore,repositoryName} = props;
    const {deleteRepository} = repositoryStore;

    const [visible, setVisible] = React.useState(false);
    const [disable, setDisable] = useState(true);
    let repositoryId = sessionStorage.getItem("repositoryId");

    const onFinish = (e) => {

        if(e.target.value!==repositoryName) {
            setDisable(true)
            return
        };

        setDisable(false)
    }


    const showModal = () =>{ setVisible(true); }
    const onCancel = () => { setVisible(false) };

    const deleteFn = () =>{
        deleteRepository(repositoryId).then(()=>{
            props.history.push("/repository-page")
        })
    }

    return(
        <>
            {/*<PrivilegeProjectButton code={"repositoryDelete"} domainId={repositoryId}>*/}
                <Button type="primary" danger onClick={showModal}>删除空间</Button>
            {/*</PrivilegeProjectButton>*/}
            <Modal
                destroyOnClose={true}
                title="你确定删除空间吗？"
                visible={visible}
                onCancel={onCancel}
                footer={false}
                width={440}
                centered
            >
                <div className={"ws-delete-box"}>
                    <div className={"ws-delete-tip"}>
                        此操作<span className={"ws-delete-text-bold"}>无法</span>撤消,这将永久删除:
                        <span className={"ws-delete-text-bold"}>{repositoryName}</span>
                    </div>
                    <div className={"ws-delete-input-title"}>请输入  <span className={"ws-delete-text-bold"}>{repositoryName}</span>  进行确认。</div>

                    <Input onChange={onFinish} />
                    <Button
                        type="primary"
                        danger
                        disabled={disable}
                        onClick={deleteFn}
                        className={"ws-delete-modal-btn"}

                    >
                        我了解后果，删除此空间
                    </Button>
                </div>

            </Modal>
        </>
    )
}

export default DeleteRepositoryModal;