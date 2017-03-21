/*
    APACHE LICENSE 2 @2017 Ivan Lausuch <ilausuch@gmail.com>
*/
class Context{
    constructor($owner,data){
        this.$owner=$owner;

        for (let i in data){
                this[i]=data[i];
        }
    }

    $update=function(data){
        for (let i in data){
                this[i]=data[i];
        }
        this.$owner.setState();
    }
};
