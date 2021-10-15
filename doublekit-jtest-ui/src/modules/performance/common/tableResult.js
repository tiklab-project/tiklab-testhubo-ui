/**
 * @description：
 * @date: 2021-08-25 13:37
 */
import React from "react";
import {Table} from "antd";

const TableResult = (props) => {

    const {dataSource,pagination} = props;

    //列表头
    const columns = [
        {
            title:`总耗时`,
            dataIndex: "allResponseTime",
            key: "allResponseTime",
            align:"center",
        },
        {
            title: `平均响应时间`,
            dataIndex: "averageResponseTime",
            key: "averageResponseTime",
            align:"center",
        },
        {
            title: `中位数`,
            dataIndex: "middleResponseTime",
            key: "middleResponseTime",
            align:"center",
        },
        {
            title: `最小响应时间`,
            dataIndex: 'minimumResponseTime',
            key: "minimumResponseTime",
            align:"center",
        },
        {
            title: `最大响应时间`,
            dataIndex: "maxuimumResponseTime",
            key: "maxuimumResponseTime",
            align:"center",
        },
        {
            title: `错误率`,
            dataIndex: "errorRate",
            key: "errorRate",
            align:"center",

        },
    ]
    return(
        <Table
            className="tablelist"
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            pagination={pagination}
        />
    )
}
export default TableResult;
