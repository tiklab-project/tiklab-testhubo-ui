import React, {useEffect, useState} from "react";
import {Row,Col} from "antd";
import {Axios} from "tiklab-core-ui";

const CaseNumberStatistics = ({repositoryId}) =>{

    const [dataInfo, setDataInfo] = useState({
        total: 0,
        notstarted: 0,
        inprogress: 0,
        completed: 0,
    });

    const getStatisticsData = async () => {
        let res = await Axios.post("/statistics/getTotalAndStatusStatistics", {repositoryId:repositoryId});
        setDataInfo(res.data);
    };

    useEffect(() => {
        getStatisticsData();
    }, []);

    const dataItem = [
        {
            title: "总数",
            value: dataInfo?.total,
            color: "#919191"
        },
        {
            title: "未开始",
            value: dataInfo?.notstarted,
            color: "#5e70c2"
        },
        {
            title: "进行中",
            value: dataInfo?.inprogress,
            color: "#a1ca7d"
        },
        {
            title: "完成",
            value: dataInfo?.completed,
            color: "#efcc6b"
        }
    ];

    const showItemBox = () => {
        return dataItem.map((item, index) => (
            <Col
                key={index}
                span={6}
            >
                <div
                    style={{
                        textAlign:"center",
                        height: "80px",
                        background:"#f8f8f8",
                        padding: "13px",
                        margin: "0 0 15px 0"
                    }}
                >
                    <div>
                        {item.title}
                    </div>
                    <div style={{fontSize:"18px",fontWeight:"bold",color:`${item.color}`}}>
                        {item.value}
                    </div>
                </div>

            </Col>
        ));
    };

    return (
        <Row gutter={20}>
            {showItemBox()}
        </Row>
    );
}

export default CaseNumberStatistics;