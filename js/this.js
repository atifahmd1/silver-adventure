"use strict";
console.log("---------- this -----------");

console.log("global space this: ", this);   //globalObj

function f() {
    //value depends on strict/non strict mode
    console.log("function this: ", this);   

    // when strict mode enabled, this -> undefined

    //reason: anytime if the value of  `this` keyword is undefined or null, it gets replaced by globalObj
    //only in non-strict mode i.e. when "use strict" is not written at top of file

    // value of this inside function is undefined, but js substitute the value of this to globalObj in non strict mode
    // so value of this inside function become window in non strict mode

}
// the value of this inside function depends on how the function is called
// if it is called without any reference this -> undefined
//but when it is called by someone, value of this refer to that then

f();            // this: undefined -> js will do this subtitution -> replaced by globalObj -> in this case it is window
window.f();     // this: window


//this inside obj method:

// if you make a function as a part of object, then it is called as method.

const obj = {
    a : 10,
    x: function(){
        console.log("obj function: ", this);    //obj
        console.log("this.a will be obj.a: ", this.a);
    }
}
obj.x();

console.log("---------------- this with call, apply and bind ----------------------");
// why call, apply and bind is used?
// call, apply and bind is use to share methods
// i.e by using call, apply and bind, we can change the obj, this keyword referce to

const student1 = {
    name: "Akshay",
    printName: function (){
        console.log(this.name);
    }
}
const student2 = {
    name: "Deepika"
}

student1.printName();       //can take argument to set this value
student1.printName(student2);   // this will refer to student2 now


console.log("---------------- this inside arrow ----------------------");
// arrow function don't provide their ovw `this` binding, 
// it retains the `this` value of the enclosed lexical context.

const obj2 = {
    name: "Atif",
    x: ()=> {
        console.log("this inside arrow function: ", this);
    }
}
obj.x();    // here this will be that function itself
obj2.x();   // this will be one level up object i.e enclosed lexical context


const obj3 = {
    name: "Atif",
    x: function() {
        const y = ()=> {
            console.log("this inside arrow function of obj's function declaration: ", this);
        }   
        y(); // here this will refers to obj3 as enclosed lexical context is obj3
    }
}
obj3.x();

// this inside DOM elements => reference to HTMLElement