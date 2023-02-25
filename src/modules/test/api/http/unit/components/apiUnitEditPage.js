import React, { useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Breadcrumb} from 'antd';
import './unitcase.scss'
import ApiEnvSelect from "../../../../../support/environment/components/apiEnvSelect";
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";

const ApiUnitEditPage = (props) => {
    const { apiUnitStore } = props;
    const { findApiUnit } = apiUnitStore;

    const apiUnitId = sessionStorage.getItem('apiUnitId');

    const [name,setName]=useState();

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setName(res.testCase.name);
    },[apiUnitId])

    
    const goBack = () =>{
        props.history.push("/repository/testcase")
    }

    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试用例</Breadcrumb.Item>
                    <Breadcrumb.Item>{name}</Breadcrumb.Item>
                </Breadcrumb>
                {/*<ApiEnvSelect {...props}/>*/}
            </div>
            <ApiUnitEditPageCommon type={true} {...props} />
        </div>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitEditPage));
