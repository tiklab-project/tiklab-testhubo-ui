import React from "react"

const BackCommon = (props) => {

    return (
        <div className={"back-ex-header"}>
            <div>
                {
                    props.clickBack
                        ?<span
                                onClick={props.clickBack}
                                className={"back-contant"}
                            >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-31fanhui1"/>
                        </svg>
                         返回
                        </span>
                        :null
                }

            </div>
            <div>
                {props.right}
            </div>
        </div>
    )
}

export default BackCommon;