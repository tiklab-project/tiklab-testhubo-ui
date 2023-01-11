import React from "react";
import EdiText from "react-editext";
import {Space} from "antd";

const DetailCommon = (props) =>{
    const {updateTitle,detailInfo,toHistory } = props;

    return(
        <div className={"detail-box"}>
            <div className={"detail-header"}>
                <EdiText
                    value={detailInfo?.testCase?.name}
                    // tabIndex={2}
                    onSave={updateTitle}
                    startEditingOnFocus
                    submitOnUnfocus
                    showButtonsOnHover
                    viewProps={{ className: 'edit-api-name' }}
                    editButtonClassName="ediText-edit"
                    saveButtonClassName="ediText-save"
                    cancelButtonClassName="ediText-cancel"
                    editButtonContent={
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-bianji1`} />
                        </svg>
                    }
                    hideIcons
                />
                <Space>
                    {toHistory?<a onClick={toHistory}>测试历史</a>:null}
                    {props.test}
                </Space>
            </div>
            <div className={"detail-bottom"}>
                <span className={"detail-bottom-item "}>分组:{detailInfo?.testCase?.category?.name} </span>
                {/*<span className={"detail-bottom-item "}>创建人:{detailInfo?.testCase?.createUser?.name} </span>*/}
                <span className={"detail-bottom-item "}>更新者:{detailInfo?.testCase?.updateUser?.name}</span>
                {/*<span className={"detail-bottom-item "}>创建时间:{detailInfo?.testCase?.createTime}</span>*/}
                <span className={"detail-bottom-item "}>更新时间:{detailInfo?.testCase?.updateTime}</span>
            </div>
        </div>
    )
}

export default DetailCommon;