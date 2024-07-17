import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import { getPieDoughnutOption} from "../../statistics/casetest/CaseTestPieDoughnut";
import {Card, Col} from "antd";

const TotalAndStatusStatistics = () =>{

    const chartRef = useRef(null);

    useEffect(async () => {
        const chartInstance = echarts.init(chartRef.current);
        let res =  await Axios.post("/statistics/getTotalAndStatusStatistics",{})
        let data = res.data;

        // 创建默认状态映射
        if (chartRef.current) {
            const option = getPieDoughnutOption(data);
            chartInstance.setOption(option);
        }
        return () => {
            chartInstance.dispose();
        };
    }, []);


    return(
        <Col span={12}>
            <Card title={"用例总数/状态数"} bordered={false} className={"case-test-item"}>
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </Card>
        </Col>
    )
}

export default TotalAndStatusStatistics