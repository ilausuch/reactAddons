class App extends React.Component{
    constructor(){
        super();
        
        this.state={
            context:new Context(this,{
                variable:"initial text"
            })
        };
    }
    
    render(){
        return(
                <div>
                    <SubApp1 context={this.state.context} />
                    <SubApp2 context={this.state.context} />
                </div>
        );
    }
} 

class SubApp1 extends React.Component{
    render(){
        return(
                <div>{this.props.context.variable}</div>
        );
    };
};

class SubApp2 extends React.Component{
    
    render(){
        
        return(
                <input 
                    defaultValue={this.props.context.variable} 
                    onChange={this.onChange.bind(this)}/>
        );
    }
    
    onChange(event){
        event.preventDefault();
        this.props.context.$update({variable:event.target.value});
    }
};

ReactDOM.render(
    <App />, document.getElementById('app')
);

