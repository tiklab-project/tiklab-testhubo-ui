import React, {useState} from "react";
import "./testResponseStyle.scss"
import ReactMonacoEditor from "../../../../common/reactMonacoEditor";

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType,height} = props;


    const [language, setLanguage] = useState();

    const processData =(data)=>{

        //空值
        if(!data) return

        if(JSON.parse(data) instanceof Object){

            return JSON.stringify(JSON.parse(data),null,4)
        }else {

            return  JSON.parse(data)
        }
    }



    return(
        <div className={"codemirror-box"}>

            <ReactMonacoEditor
                value={processData(responseBodyData)}
                language={"json"}
                height={height?height:"400px"}
                width={"100%"}
                readOnly={true}
            />
        </div>
    )

}

export default ResponseBodyCommon;