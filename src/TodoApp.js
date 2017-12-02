import React , {Component} from 'react';
import TodoForm from './TodoForm';
import TodoList from './Todo';
import Title from './Title';
import axios from 'axios';

window.id = 0; 
class TodoApp extends Component{
    
    constructor(props){
        super(props);
        
        // set initial state
        this.state = {
            data : []
        };

        this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
    }

    componentDidMount(){

        // http request
        axios.get(this.apiUrl)
             .then((res) => {
                this.setState({
                    data:res.data
                });
             });
    }

    // 增加 todo
    addTodo(val){

        const todo = {
            text:val,
            id : window.id++
        };
        console.log('add todo value => ' + val);
        axios.post(this.apiUrl,todo)
             .then((res) => {

                 //update data
                this.state.data.push(res.data);

                //update state
                this.setState({
                    data: this.state.data
                });
             });
    }

    // 移除 todo
    handleRemove(id){

        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id ) return todo;
        });

        // 更新
        axios.delete(this.apiUrl + '/' + id)
              .then((res) => {
                this.setState({
                    data: remainder
                });
              });
    }

    // 渲染元件
    render(){

        return(
            <div>
                <Title/>
                <TodoForm addTodo = {this.addTodo.bind(this)}/>
                <TodoList  todos = {this.state.data} remove = {this.handleRemove.bind(this)}/>
            </div>
        );
    }
}

export default TodoApp;