import React from "react";

export const Selector = (props) => (
    <select 
        name={props.name} 
        value={props.value} 
        onChange={props.handleChange}
        className="form-control"
        >
        {props.arrayValuesAndNames.map((item) => (
            <option key={item.value} value={item.value} >{item.name}</option>
        ))}
    </select>
)