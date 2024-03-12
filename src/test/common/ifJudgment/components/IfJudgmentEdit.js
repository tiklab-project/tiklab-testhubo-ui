import React, {useState} from 'react';
import { observer } from "mobx-react";
import ifJudgmentStore from "../store/IfJudgmentStore";

const {createIfJudgment} = ifJudgmentStore

const IfJudgmentEdit = (props) => {
    const {caseId,findList}=props

    const addIfJudgment =async  ()=>{
        let param = {
            relation:"and",
            caseId:caseId
        }
        await createIfJudgment(param)
        await findList()
    }

    return (
        <a onClick={addIfJudgment}>If判断</a>
    );
};

export default observer(IfJudgmentEdit);
