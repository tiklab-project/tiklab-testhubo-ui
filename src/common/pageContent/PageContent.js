import React from "react";
import {Row,Col} from "antd";

const PageContent = (props) =>{

    return(
        <Row style={{height:"100%"}}>
            <Col
                md={{ span: 24, offset: 0 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xll={{ span: 16, offset: 4 }}
            >
                {props.children}
            </Col>
        </Row>
    )
}

export default PageContent