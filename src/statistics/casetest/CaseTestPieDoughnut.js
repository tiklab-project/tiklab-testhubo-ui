import React from "react";
import {Card, Col} from "antd";

export const getPieDoughnutOption = (results) => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Status',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    formatter: '{b}: {c}',
                    position: 'outside'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: results.notstarted, name: '未开始' },
                    { value: results.inprogress, name: '进行中' },
                    { value: results.completed, name: '完成' }
                ]
            }
        ],
        graphic: [
            {
                type: 'text',
                left: 'center',
                top: 'middle',
                style: {
                    text: `${results.total}\n\n总数`,
                    textAlign: 'center',
                    fill: '#000',
                    fontSize: 13
                }
            }
        ]
    };
};


export const CaseTestPieDoughnut = ({totalRefs}) =>{

    return(
        <Col span={12}>
            <Card title={"用例总数/状态数"} bordered={false} className={"case-test-item"}>
                <div
                    ref={totalRefs}
                    style={{ width: '100%', height: '200px' }}
                ></div>
            </Card>
        </Col>
    )
}