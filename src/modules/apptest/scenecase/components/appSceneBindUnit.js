import React, {useEffect} from "react";
import {Button, Input, Modal, Table} from "antd";
import {inject, observer} from "mobx-react";

const AppSceneBindUnit =(props) =>{
    const {categoryStore} = props;

    const column =[
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            width: "30%",
        }, {
            title: `类型`,
            dataIndex: "testType",
            key: "testType",
        },
        {
            title: `等级`,
            dataIndex: "level",
            key: "level",
        },
        {
            title: `创建人`,
            dataIndex: ['createUser', 'name'],
            key: "user",
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

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // getSelectItem(selectedRows)
        },
    };

    return(
        <>
            <Button className="important-btn" onClick={showModal}>关联测试用例</Button>
            <Modal
                destroyOnClose={true}
                title="关联用例"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={800}
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

export default inject("categoryStore")(observer(AppSceneBindUnit));