import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import { getPieDoughnutOption} from "../../statistics/casetest/CaseTestPieDoughnut";
import {Card, Col} from "antd";

const ProjectTotalAndStatusStatistics = () =>{

    const chartRef = useRef(null);
    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(async () => {
        const chartInstance = echarts.init(chartRef.current);
        let res =  await Axios.post("/statistics/getTotalAndStatusStatistics",{repositoryId:repositoryId})
        let data = res.data;

        // 创建默认状态映射
        window.addEventListener('resize', ()=>handleResize(chartInstance));
        if (chartRef.current) {
            const option = getPieDoughnutOption(data);
            chartInstance.setOption(option);
        }
        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize', ()=>handleResize(chartInstance));
        };
    }, []);

    const handleResize = (chartInstance) => {
        if (chartInstance) {
            chartInstance.resize();
        }
    };

    return(
        <Col span={12}>
            <Card title={"状态数"} bordered={false} className={"statistic-card-item"}>
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </Card>
        </Col>
    )
}

export default ProjectTotalAndStatusStatistics