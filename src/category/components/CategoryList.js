import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Table, Space,Col,Row, Popconfirm, Empty} from 'antd';
import CategoryEdit from './CategoryEdit';
import  { useTranslation } from 'react-i18next'
import emptyImg from "../../assets/img/empty.png";
import IconCommon from "../../common/IconCommon";

/**
 * 模块管理页
 */
const CategoryList = (props) => {
    const { categoryStore } = props;
    const {
        findCategoryListTreeTable,
        deleteCategory,
        categoryTableList
    } = categoryStore;

    const { t } = useTranslation();

    //项目列表头
    const columns = [
        {
            title:`模块名称`,
            dataIndex: "name",
            key: "name",
            // align:"center",
            width:'40%'
        },
        {
            title: ` ${t('tcdesc')}`,
            dataIndex: "desc",
            key: "desc",
            // align:"center",
            width:'50%'
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            // align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <CategoryEdit
                        children={true}
                        categoryId={record.id}
                        findList={findList}
                    />
                    <CategoryEdit
                        type={"edit"}
                        categoryId={record.id}
                        findList={findList}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteCategory(record.id).then(()=>findList())}
                        okText='确定'
                        cancelText='取消'
                        placement="topRight"
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const repositoryId = sessionStorage.getItem('repositoryId')
    const [tableLoading,setTableLoading] = useState(true)

    useEffect(()=> {
        findList().then(()=>{
            setTableLoading(false)
        })
    },[repositoryId])

    /**
     * 查询模块列表
     */
    const findList = async () =>{
         await findCategoryListTreeTable(repositoryId);
    }


    return(
        <Row>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div  className={"header-box-space-between"} >
                    <div className={'header-box-title'}>模块列表</div>
                    <CategoryEdit name={`添加模块`} findList={findList}/>
                </div>
                <div className={"table-list-box"}>
                         <Table
                            columns={columns}
                            dataSource={categoryTableList}
                            rowKey={record => record.id}
                            // expandable={{defaultExpandAllRows: true}}
                            loading={tableLoading}
                            pagination={false}
                            locale={{
                                emptyText: <Empty
                                    imageStyle={{ height: 120 }}
                                    description={<span>暂无模块</span>}
                                    image={emptyImg}
                                />,
                            }}
                         />
                    </div>
            </Col>
        </Row>
    )
}

export default inject('categoryStore')(observer(CategoryList));
