import React, {useEffect} from "react";
import {Button, Input, Modal, Table} from "antd";
import {inject, observer} from "mobx-react";

const ApiSceneBindUnit =(props) =>{
    const {categoryStore} = props;

    const column =[
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            width: "30%",
        },{
            title: '请求路径',
            dataIndex: 'baseUrl',
            key: 'baseUrl',
            width: "20%",
        },{
            title: '路径',
            dataIndex: ['method', 'path'],
            key: 'method',
            width: "20%",
        },{
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
            width: "20%",
        }
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

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // getSelectItem(selectedRows)
        },
    };

    return(
        <>
            <Button className="important-btn" onClick={showModal}>关联用例</Button>
            <Modal
                destroyOnClose={true}
                title="关联用例"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />

                <Table
                    columns={column}
                    // dataSource={}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                />

            </Modal>
        </>
    )
}

export default inject("categoryStore")(observer(ApiSceneBindUnit));