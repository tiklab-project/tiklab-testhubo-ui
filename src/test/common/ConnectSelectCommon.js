import React from "react";

import {Table, Input, Col,Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import IconBtn from "../../common/iconBtn/IconBtn";
const ConnectSelectCommon = (props) =>{
    const {
        setVisible,
        dataList,
        columns,
        onSearch,
        onFinish
    } = props;




    return(
        <>
            <div style={{padding:"0 0 15px"}}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={22}>
                        <Input
                            placeholder={`搜索名称`}
                            onPressEnter={onSearch}
                            onChange={onSearch}
                            className='demand_project_search'
                            prefix={<SearchOutlined />}
                        />
                    </Col>

                    <Col className="gutter-row" span={2}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            onClick={()=>setVisible(false)}
                            name={"取消"}
                        />
                    </Col>

                </Row>
            </div>
            <div style={{"overflow": "auto","height": "calc(100% - 38px)"}}>
                <div className={"table-list-box"} >
                    <Table
                        columns={columns}
                        dataSource={dataList}
                        rowKey = {record => record.id}
                        onRow={(record) => {
                            return {
                                onClick: () => {onFinish(record.id)},
                                style: {cursor: 'pointer'}
                            };
                        }}
                        pagination={false}
                    />
                </div>
            </div>

        </>
    )
}

export default ConnectSelectCommon;
