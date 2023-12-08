import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Axios} from "thoughtware-core-ui";

const {Option} = Select

/**
 * 定位器下拉选择框
 */
const LocationSelect = () => {

    const [locationList, setLocationList] = useState([]);

    useEffect(async ()=>{
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }
    },[])

    return(
        <Select
            showSearch={true}
            allowClear={true}
            placeholder={"定位器"}
        >
            {
                locationList&&locationList.map(item=>{
                    return <Option key={item} value={item}>{item}</Option>
                })
            }

        </Select>
    )
}

export default LocationSelect;