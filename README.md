# reactAddons
Addons for ReactJS

#Context

With context can pass variables or objects to children compoenents. And when it 
is modified by any component, all components that use this context will be notified

## Root component, context initialization and context pass to children

Allways will be a root component (it can be the main componet) than creates the context. 

The context declaration:
```javacript
new Context(rootComponent,inizialization object)
```

* root component: Component owner of this context and the root component 
* inizialization object: Is an object with all initial values of context


The context must be created o be a field of state

```javacript
this.state={
    context:new Context(this,{
        variable:"initial text"
    })
};
```

To pass the context to children is used as argument using state object

```javascript
<SubApp1 context={this.state.context} />
```

All together:

```javacript
class App extends React.Component{
    constructor(){
        super();
        
        this.state={
            //The context is created with a variable
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
```

## Use from children

To use the context, it is allocated in this.props

```javascript
class SubApp1 extends React.Component{
    render(){
        return(
                <div>{this.props.context.variable}</div>
        );
    };
};
```

## Update from children

When a child change any variable of context, it must be done using $update method. 
$update has one parameter. It's an object with the updates.

```javascript
this.props.context.$update({variableName:"new value"});
```

In next example it uses the input value to change the variable of context. 
When It changes all components children of root, that use the context will render.

```javascript
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
```