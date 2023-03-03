import React from "react";
import {Breadcrumb} from "antd";

const BreadcrumbCommon = (props) =>{
    const {breadArray} =props;

    const breadItemView = (data) =>{
        return data&&data.map(item=>{
            return  <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
        })
    }

    return(
        <div className='breadcrumb'>
            <Breadcrumb separator=">" >
                {breadItemView(breadArray)}
            </Breadcrumb>
            <div>
                {props.component}
            </div>
        </div>
    )
}

export default BreadcrumbCommon;