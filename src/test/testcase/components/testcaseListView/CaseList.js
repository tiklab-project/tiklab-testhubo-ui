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
import {getVersionInfo} from "tiklab-core-ui";

const CaseList = (props) => {
    const {testcaseList,loading,clickItemId,setClickItemId} = props;
    const history = useHistory()
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        alignItems: "center"
                    }}
                    className={`case-list-item ${item.id===clickItemId?"case-list-item-action":""}`}
                    onClick={()=>clickItem(item)}
                >
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center"
                    }}>
                        <div>{showCaseTypeView(item.caseType)}</div>
                        <div style={{width:"158px"}}>
                            <div className={"text-ellipsis"}>
                                {item.name}
                            </div>
                            <div className={"display-flex-gap"}>
                                <div style={{color: "#999", fontSize: "12px"}}>
                                    {showCaseTypeTable(item.caseType)}
                                </div>
                            </div>
                        </div>

                    </div>
                    {showTextStatus(item.status,"11px")}
                </div>
            )
        })
    }

    const handleOk = () => {
        setIsModalOpen(false);

        if(version==="ce"||version==="ee"){
            window.open("https://tiklab.net/account/subscribe/apply/postin")
        }else {
            window.open("https://work.tiklab.net/#/enterprise/application/postin")
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