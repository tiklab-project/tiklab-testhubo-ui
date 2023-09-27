import React, {useEffect, useState} from "react";
import {Empty, Table,} from "antd";
import emptyImg from "../../../../../assets/img/empty.png";

const UpLoadTestData = (props) =>{
    const {testDataTable} = props;

    const columnsProcess = () =>{
        if(testDataTable.length > 0){

            let headerName = Object.keys(testDataTable[0])
            let headerList = headerName.map((key) => ({title: key, dataIndex: key, editable: true,width: `${94 / headerName.length}%`}))

            return headerList

        }else {
            return []
        }
    }


    let columns = columnsProcess()
    return(
        <div style={{margin:"10px 0 0 0"}}>
            <div className={"table-list-box"}>
                {
                    columns.length>0
                        ? <Table
                            dataSource={testDataTable}
                            columns={columns}
                            rowKey={(record,index)=>index}
                            // handleSave={handleSave}
                            pagination={false}
                        />
                        : <Empty
                            imageStyle={{height: 120 }}
                            description={<span>暂无测试数据</span>}
                            image={emptyImg}
                        />
                }
            </div>

        </div>

    )
}
export default UpLoadTestData;