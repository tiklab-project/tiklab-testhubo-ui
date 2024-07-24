import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import {Col,Card} from "antd";


const ProjectCaseTestStatistics = () =>{
    const chartRef = useRef(null);

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(async () => {
        const chartInstance = echarts.init(chartRef.current);
        let res  = await findStatistics();

        let data = res.data;

        const apiUnitCounts = [data['api-unit']?.pass || 0, data['api-unit']?.fail || 0, data['api-unit']?.notTested || 0];
        const apiSceneCounts = [data['api-scene']?.pass || 0, data['api-scene']?.fail || 0, data['api-scene']?.notTested || 0];
        const apiPerformCounts = [data['api-perform']?.pass || 0, data['api-perform']?.fail || 0, data['api-perform']?.notTested || 0];
        const webSceneCounts = [data['web-scene']?.pass || 0, data['web-scene']?.fail || 0, data['web-scene']?.notTested || 0];
        const appSceneCounts = [data['app-scene']?.pass || 0, data['app-scene']?.fail || 0, data['app-scene']?.notTested || 0];

        const option = createOption(
            apiUnitCounts,
            apiSceneCounts,
            apiPerformCounts,
            webSceneCounts,
            appSceneCounts
        );

        chartInstance.setOption(option);


        const handleResize = () => chartInstance.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /**
     * 查询统计数据
     */
    const findStatistics = async () => {
        const param = {repositoryId:repositoryId};
        return await Axios.post("/statistics/getAllCaseTestStatistics", param);
    };

    const createOption = (
        apiUnitCounts,
        apiSceneCounts,
        apiPerformCounts,
        webSceneCounts,
        appSceneCounts
    ) => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['接口单元', '接口场景', '接口性能', 'WEB', 'APP']
        },
        grid: {
            top: '12%',
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['成功', '失败', '未执行'],
            axisLabel: {
                interval: 'auto'
            }
        },
        yAxis: {
            type: 'value',
        },

        series: [
            {
                name: '接口单元',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: apiUnitCounts
            },
            {
                name: '接口场景',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: apiSceneCounts
            },
            {
                name: '接口性能',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: apiPerformCounts
            },
            {
                name: 'WEB',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: webSceneCounts
            },
            {
                name: 'APP',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: appSceneCounts
            },

        ]
    });

    return (
        <Col span={12}>
            <Card title={"最近一次执行"} bordered={false} className={"case-test-item"}>
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </Card>
        </Col>
    );
}

export default ProjectCaseTestStatistics