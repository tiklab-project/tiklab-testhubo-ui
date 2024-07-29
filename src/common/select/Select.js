import React, { useEffect, useState, useRef, Fragment } from "react";
import "./Select.scss";
import IconCommon from "../IconCommon";
import {DownOutlined} from "@ant-design/icons";
const SelectSimple = (props) => {
    const {
        onChange,
        onFocus,
        onSearchChange,
        onBlur,
        onMouseEnter,
        onMouseLeave,
        ismult,
        title,
        children,
        value,
        className,
        simpleClassName,
        suffixIcon
    } = props;

    const [showDropDown, setShowDropDown] = useState(false);
    const [selectLength, setSelectLength] = useState(0)
    const [searchValue, setSearchValue] = useState();
    let [selectData, setSelectData] = useState(value ? value : (ismult ? [] : null))
    const dropDown = useRef();
    const inputRef = useRef();

    useEffect(() => {
        // onFocus()
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [showDropDown])

    useEffect(() => {
        if (value) {
            setSelectLength(value.length)
            setSelectData(value)
        } else {
            setSelectLength(0)
            setSelectData(ismult ? [] : null)
        }
        return;
    }, [value])


    const closeModal = (e) => {
        if (!dropDown.current) {
            return;
        }
        if (!dropDown.current.contains(e.target) && dropDown.current !== e.target) {
            if (onBlur) {
                onBlur()
            }
            if (onSearchChange) {
                cancel()
            }

            setShowDropDown(false)
        }
    }


    const getValue = (e) => {
        if (ismult) {
            const value = e.value;
            const checked = e.checked;
            const isIn = selectData.indexOf(value);
            if (isIn === -1 && checked === true) {
                selectData.push(value)
                setSelectData(selectData)
            }
            if (isIn !== -1 && checked === false) {
                selectData.splice(isIn, 1)
                setSelectData(selectData)
            }
            setSelectLength(selectData.length)
            onChange(selectData)
        } else {
            setSelectData(e)
            onChange(e)
        }

    }

    const clear = () => {
        setSelectData(ismult ? [] : null)
        setSelectLength(0)
        onChange(null)
    }

    const showShowDrop = () => {
        setShowDropDown(true);
        if (onFocus) {
            onFocus();
        }

    }


    const searchInput = (value) => {
        setSearchValue(value.target.value)
        onSearchChange(value.target.value)
    }

    const cancel = () => {
        setSearchValue(null)
        onSearchChange && onSearchChange(null)
        inputRef.current.value = ""
    }

    const clearValue = (event) => {
        event.stopPropagation();
        event.preventDefault()
        setSelectData(ismult ? [] : null)
        setSelectLength(0)
        onChange(null)
    }
    return <div className={`select-view ${simpleClassName ? simpleClassName : ""}`}>
        <div onClick={() => showShowDrop()} className="select-content"
            onMouseEnter={() => onMouseEnter && onMouseEnter()}
            onMouseLeave={() => onMouseEnter && onMouseLeave()}
        >
            {
                ismult ?
                    <div style={{color:"#bfbfbf"}}>
                        {title}
                    </div>
                    :
                    <div className={`${className} select-view-text`} title = {selectData?.label ? selectData.label : title}>
                        {selectData?.label ? selectData.label : title}
                    </div>
            }
            <div className="select-view-icon">
                {
                    ismult && <DownOutlined style={{fontSize:"12px",color:"#b7b8b9"}}/>
                }
                {
                    suffixIcon && <>
                        {
                            !ismult && selectData ? <svg className="cancel-svg" aria-hidden="true" onClick={(e) => clearValue(e)}>
                                <use xlinkHref="#icon-cancel"></use>
                            </svg>
                                :
                                <svg className="svg-icon" aria-hidden="true" >
                                    <use xlinkHref={`#icon-downdrop`}></use>
                                </svg>
                        }
                    </>


                }

            </div>

        </div>
        {
            showDropDown ? <div className="select-dropdown" ref={dropDown}>
                {
                    onSearchChange && <div className="select-search-box">
                        <input className="select-search-input" ref={inputRef} placeholder="搜索" onChange={(value) => searchInput(value)} />
                        {
                            searchValue ? <svg className="cancel-svg" aria-hidden="true" onClick={() => cancel()}>
                                <use xlinkHref="#icon-cancel"></use>
                            </svg>
                                :
                                <svg className="big-svg" aria-hidden="true">
                                    <use xlinkHref="#icon-search2"></use>
                                </svg>
                        }
                    </div>
                }

                {
                    React.Children.map(children, (children, i) => {
                        return React.cloneElement(children, { onChange: getValue, selectData: selectData, setShowDropDown: setShowDropDown, ismult: ismult })
                    })
                }
                {
                    ismult && <div className="select-dropdown-bottom">
                        <div className="dropdown-botton clear" onClick={() => clear()}>清空</div>
                        <div className="dropdown-botton submit" onClick={() => setShowDropDown(false)}>确定</div>
                    </div>
                }

            </div>
                : <></>
        }


    </div>
}

export default SelectSimple;