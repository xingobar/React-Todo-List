import React, { Component}  from 'react';

const TodoForm = ({addTodo}) => {

    let input ;

    return (
        <div>
            <input  ref={(node) => { 
                input = node;
            }}/>
            <button onClick = {() => {
                console.log('input value => ' + input.value);
                //console.log(this.refs.node.value);
                addTodo(input.value);
                input.value='';
            }}>+</button>
        </div>
    );
};

export default TodoForm;