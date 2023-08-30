import React, { useState} from "react";
import { Modal, Table} from "antd";
import {inject, observer} from "mobx-react";
import ProjectSelect from "./ProjectSelect";
import IconBtn from "../../../../common/iconBtn/IconBtn";

const WorkItemSelect = (props) =>{
    const {workItemStore,caseInfo,updateCase} = props;
    const {
        findWorkItemList,
        findWorkItem,
        getDemandInfo
    } = workItemStore;

    //
    //
    //
    //
    //
    // /**
    //  * 打开关联需求
    //  */
    // const showModal = () => {
    //
    //     setIsModalOpen(true);
    // };
    //




    return(
        <>
            {/*<IconBtn*/}
            {/*    className="pi-icon-btn-grey"*/}
            {/*    name={"关联需求"}*/}
            {/*    onClick={showModal}*/}
            {/*/>*/}
            {/*<Modal*/}
            {/*    destroyOnClose={true}*/}
            {/*    title="关联需求"*/}
            {/*    visible={isModalOpen}*/}
            {/*    onCancel={onCancel}*/}
            {/*    onOk={onFinish}*/}
            {/*    okText="提交"*/}
            {/*    cancelText="取消"*/}
            {/*    centered*/}
            {/*    width={600}*/}
            {/*>*/}
            {/*    <div style={{display:"flex","alignItems":"center",padding:"0 0 15px"}}>*/}
            {/*        <div>项目: </div>*/}
            {/*        <ProjectSelect*/}
            {/*            clickProject={clickProject}*/}
            {/*            {...props}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <Table*/}
            {/*        columns={columns}*/}
            {/*        dataSource={workItemList}*/}
            {/*        rowKey = {record => record.id}*/}
            {/*        rowSelection={{...rowSelection}}*/}
            {/*        pagination={false}*/}
            {/*    />*/}
            {/*</Modal>*/}
        </>
    )
}



export default inject("workItemStore")(observer(WorkItemSelect));