import React from "react";
import {Modal, Table} from "antd";
import IconBtn from "../../../common/iconBtn/IconBtn";

const WorkspaceFindList = (props) =>{
    //空间列表头
    const columns = [
        {
            title:`空间名`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            width:"50%",
            // align:"center",

        },{
            title: `可见范围`,
            dataIndex: "visibility",
            key: "visibility",
            width:"20%",
        },
    ]


    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {

        setVisible(false);
    };


    const onCancel = () => { setVisible(false) };

    return(
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联场景"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title="关联场景"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={1000}
            >

                <Table
                    columns={columns}
                    dataSource={webSceneList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default WorkspaceFindList;