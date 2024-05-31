import {assertCompare} from "../../common/dictionary/dictionary";
import React from "react";
import IfJudgmentDrawer from "./ifJudgment/components/IfJudgmentDrawer";
import {Col, Row, Tag} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import IconCommon from "../../common/IconCommon";

/**
 * 比较
 * @param comparator
 * @returns {string}
 */
export const showCompare = (comparator) =>{
    switch (comparator) {
        case assertCompare.EQUAL.value:
            return assertCompare.EQUAL.name;
        case assertCompare.NOT_EQUAL.value:
            return assertCompare.NOT_EQUAL.name;
        case assertCompare.LESS_THAN.value:
            return assertCompare.LESS_THAN.name;
        case assertCompare.LESS_THAN_OR_EQUAL.value:
            return assertCompare.LESS_THAN_OR_EQUAL.name;
        case assertCompare.GREATER_THAN.value:
            return assertCompare.GREATER_THAN.name
        case assertCompare.GREATER_THAN_OR_EQUAL.value:
            return assertCompare.GREATER_THAN_OR_EQUAL.name
    }
}


/**
 * 逻辑if步骤
 */
export const IfStep = ({item, provided,deleteStepFn,findStepList})=>{
    const ifStep = item.ifJudgment
    const ifVariableList = ifStep?.ifVariableList

    const ifVariableListShow = (list) => {
        return list.map((item, index) => {
            const separator = (index < list.length - 1)
                ? (ifStep.relation === 'and'
                    ? <span style={{padding:"0 10px"}}>&&</span> : <span style={{padding:"0 5px"}}>||</span>)
                : '';

            return (
                <React.Fragment key={item.id}>
                        <span>
                            <span>{item.variable} {showCompare(item.compare)} {item.expect}</span>
                            {separator}
                        </span>

                </React.Fragment>
            );
        });
    };


    return(
        <IfJudgmentDrawer
            name={
                <Row
                    // gutter={[10,0]}
                    className={"step-item-content"}
                >
                    <Col span={1}>
                        <div
                            {...provided.dragHandleProps}
                            className={"step-item-box-icon"}
                        >
                            <MenuOutlined/>
                        </div>
                    </Col>
                    <Col span={1}>
                        <div>{item.sort}</div>
                    </Col>
                    <Col span={4}>
                        <Tag color={"processing"}>if 条件判断</Tag>
                    </Col>
                    <Col span={15}>
                        <div style={{display:"flex"}}>
                            {
                                ifVariableListShow(ifVariableList)
                            }
                        </div>
                    </Col>
                    <Col style={{marginLeft: "auto", height: "20px"}}>
                        <div className={"step-item-delete"}>
                            <IconCommon
                                className={"icon-s edit-icon"}
                                icon={"shanchu3"}
                                onClick={(e) => {
                                    deleteStepFn(item.id)
                                    e.stopPropagation()
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            }
            stepId={item.id}
            findStepList={findStepList}
        />
    )
}