import React, {useState} from "react";
import {observer} from "mobx-react";
import {
    showCaseTypeTable,
    showCaseTypeView,
    showTextStatus
} from "../../../../common/caseCommon/CaseCommonFn";
import {Empty, Modal, Spin} from "antd";
import {useHistory} from "react-router";
import {switchCaseTypeFn} from "../testCaseTableFn";
import upgradeImg from "../../../../assets/img/upgrade.png";
import {getVersionInfo} from "thoughtware-core-ui";

const CaseList = (props) => {
    const {testcaseList,loading,clickItemId,setClickItemId} = props;
    const history = useHistory()

    const clickItem = (item)=>{
        let versionInfo = getVersionInfo()

        // 版本过期并且是ui 需要订阅
        if(versionInfo.expired&&item.testType==="ui"){
            setIsModalOpen(true)
        }else {
            setClickItemId(item.id)
            switchCaseTypeFn(item, history)
        }
    }

    const showListView = (list) =>{
        return list&&list.map(item=>{
            return(
                <div
                    key={item.id}
                    className={` display-flex-between case-list-item ${item.id===clickItemId?"case-list-item-action":""}`}
                    onClick={()=>clickItem(item)}
                >
                    <div className={` display-flex-gap`}>
                        <div>{showCaseTypeView(item.caseType)}</div>
                        <div style={{width:"158px"}}>
                            <div className={"text-ellipsis"} style={{padding: "0 0 5px 0"}}>
                                {item.name}
                            </div>
                            <div className={"display-flex-gap"}>
                                <div className={"case-list-item-type"}>{showCaseTypeTable(item.caseType)}</div>
                                <span className={"case-list-item-type text-ellipsis"} style={{width:"90px"}}>模块: {item?.category?.name||"未设置"}</span>
                            </div>
                        </div>

                    </div>
                    {showTextStatus(item.status)}
                </div>
            )
        })
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);

        if(version==="ce"||version==="ee"){
            window.open("https://thoughtware.cn/account/subscribe/apply/postin")
        }else {
            window.open("https://work.thoughtware.cn/#/enterprise/application/postin")
        }
    };

    const handleCancel = () =>  setIsModalOpen(false);


    return(
        <Spin spinning={loading}>
            <div className={"case-list-box"}>
                {
                    testcaseList
                        ? showListView(testcaseList)
                        : <Empty />
                }
            </div>
            <Modal
                title={`企业版功能`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText={"取消"}
                okText={"订阅"}
            >
                <div style={{
                    margin: "20px",
                    textAlign: "center",
                }}>
                    <img src={upgradeImg} alt={"升级"} width={150}/>
                    <p>{`请购买企业版Licence后使用`}</p>
                </div>
            </Modal>
        </Spin>

    )
}

export default observer(CaseList);