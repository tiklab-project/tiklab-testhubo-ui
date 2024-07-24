import React from "react";
import {Row,Col} from "antd";

const PageContent = (props) =>{

    return(
        <Row style={{height:"100%"}}>
            <Col
                md={{ span: 24, offset: 0 }}
                xl={{ span: 22, offset: 1 }}
                xll={{ span: 18, offset: 3 }}
            >
                {props.children}
            </Col>
        </Row>
    )
}

export default PageContent