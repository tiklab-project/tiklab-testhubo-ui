import React, {useRef, useState} from "react";

const TestDargCommon = (props) =>{
    const [topBoxHeight, setTopBoxHeight] = useState();
    const [bottomBoxHeight, setBottomBoxHeight] = useState(0);

    const ref = useRef(null);

    const changeBox = () =>{
        const middleBox = ref.current;
        middleBox.onmousedown=(e)=>{
            let mouseDownY = e.offsetY;
            let middleBoxTop = middleBox.offsetTop;
            let middleBoxHeight = middleBox.offsetHeight;

            if(middleBoxTop < (mouseDownY+middleBoxTop)&&mouseDownY<(middleBoxTop+middleBoxHeight)){

                document.onmousemove=(e)=>{
                    e = e || event;
                    let mouseMoveY = e.clientY;

                    console.log(mouseDownY,mouseMoveY)

                    let height= mouseMoveY-mouseDownY;
                    let bottomHeight = (mouseMoveY-(height+middleBoxHeight))

                    setTopBoxHeight(height);
                    setBottomBoxHeight(bottomHeight)

                    return false; //这里为了避免抖动
                }
            }

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            if (e.preventDefault){
                e.preventDefault();
            }

        }
    }

    return (
        <div className={"test-darg-contant"}>
            <div style={{height:` ${topBoxHeight?topBoxHeight:"850"}px`,overflow:"auto"}}>
                {props.top}
            </div>
            <div
                className={"middleBox"}
                ref={ref}
                onMouseDown={changeBox}
            ></div>
            <div style={{background:"#dad7f1",height:`${bottomBoxHeight}px`}}>
                {props.bottom}
            </div>

        </div>
    )
}

export default TestDargCommon;