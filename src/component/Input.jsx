import React from 'react'

function Input (props){
    return(<div>
        <input name={props.name} type={props.type} placeholder={props.placeholder} onChange= {props.onChange} value = {props.value}></input>
        </div>)
}

export default Input