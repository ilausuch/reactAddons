/*
    APACHE LICENSE 2 @2017 Ivan Lausuch <ilausuch@gmail.com>
*/
class Model {
    constructor(object){
        this.registry = {};
        this.fields = [];
        this.data = object;

        for (var k in object){
            this.fields.push(k);
        }
    }

    /**
    Register a new component handler. The event received has these fields:
     
    model : Model object
    data : Raw data of model
    field: Field cause of the event
    oldValue: The old value
    newValue: The new value
    
    @param {function} handler This is the function to call when notify
    @param {object} component This is the component to register
    @param {string} byField This is the field to be notified with. 
    If is undefined, it register to all fields. 
    If you need to register to more than one but not all you can register more than one time.
    
    @returns {int} Returns the Id of register
    */
    register(handler, component, byField){
        let id = Math.round(Math.random()*10000);
        this.registry[id] = {handler:handler, byField:byField, component:component};
        return id;
    }

    /**
    Unregister, you can use componentDidMount() to do this.
    @param {int} id Registry identificator
    */
    unRegister(id){
        delete this.registry[id];
    }

    /**
    Check if field is a valid field.
    @param {string} field The field to check
    @returns {boolean} Returns true if is a valid field 
    */
    checkField(field){
        return this.fields.indexOf(field) > -1;
    }

    /**
    Get a field value
    @param {string} field 
    @returns {boolean} Returns the value of field 
    */
    get(field){
        return this.data[field];
    }

    /**
    This method is used to modify some field of data
    @param {string} field 
    @param {any} newValue The new value to store in the field of model
    @returns {boolean} True if the value has changed, false other ways
    */
    update(field, newValue){
        var oldValue = this.data[field];

        if (oldValue !== newValue){
            this.data[field] = newValue;
            this.notify({
                model: this,
                data: this.data,
                field: field,
                oldValue: oldValue,
                newValue: newValue
            });
            return true;
        }else{
            return false;
        }

    }

    /**
    Internal method. Used for call all handlers
    @param {object} event Event to send. This is an object
    */
    notify(event){
        for (var id in this.registry){
            var entry=this.registry[id];
            if (entry.byField === undefined || entry.byField === event.field)
                try{
                    entry.handler(event, entry.component);
                }catch(e){
                    console.error("Model: error en registro on notify",entry,e);
                }
        }
    }
}
