import React from "react";
import { Form } from "react-bootstrap";

const SelectBox = (props)=>{
    const displayOptions = props.data && props.data.map((item)=>(<option value={item.value} key={item.value}>{item.label}</option>))
    const onSelect = (e)=>{
        props.onChange(e)
    }
    return(
        <Form.Group className="mb-3" controlId={props.controlId}>
        <Form.Label>{props.label} {props.isRequired&&<span className='required'>*</span>}</Form.Label>
        <Form.Select
            className={props.className} 
            name={props.name}
            id={props.id}
            value={props.value} 
            onChange={onSelect}
            disabled={props.disabled}>
             {props.placeholder&&<option value="" key="#Select">{props.placeholder}</option>}
             {displayOptions}
            </Form.Select>
    </Form.Group>
    )
}

export default SelectBox;