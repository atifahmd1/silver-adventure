// why call, apply and bind is used?
// call, apply and bind is use to share methods
// i.e by using call, apply and bind, we can change the obj, this keyword referce to

console.log("Call Bind Apply");

const person1 = {
    name: "Atif Ahmad",
    age: 22
}
const person2 = {
    name: "abcd",
    age: 1001
}

const intro = function(city, state){
    console.log(`My name is ${this.name}. I'm ${this.age} years old. I live in ${city}, ${state}.`);
}



//  --------------------- CALL -------------------------------

// console.log("------ CALL -------");
// intro.call(person1, "Bhagalpur", "Bihar");
// intro.call(person2, "xyz", "lmn");

Function.prototype.myCall = function(obj, ...args){

    if(typeof this != "function"){
        throw new Error("not callable");
    }

    console.log(obj);
    
    obj.fn = this;
    obj.fn(...args)
    
    delete obj.fn;
    console.log(obj);
    
}
// intro.myCall(person2, "bhagalpur", "bihar");



//--------------------- APPLY --------------------------------

// console.log("------ APPLY -------");
// intro.apply(person1, ["bhagalpur", "bihar"]);

Function.prototype.myApply = function(obj, args){
    console.log(obj);

    if(typeof this != "function"){
        throw new Error("not callable");
    }
    if(!Array.isArray(args)){
        throw new Error("TypeError: CreateListFromArrayLike called on non-object");
    }

    
    obj.fn = this;
    obj.fn(...args)
    
    delete obj.fn;
    console.log(obj);
    
}
// intro.myApply(person2, ["bhagalpur", "bihar"]);



// ----------------------- BIND --------------------------------

console.log("------BIND-------");
const person1Intro = intro.bind(person1);
person1Intro("bhagalpur", "bihar");

Function.prototype.myBind = function(obj, ...args1){
    console.log(obj);

    if(typeof this != "function"){
        throw new Error("not callable");
    }
    
    obj.fn = this;
    return function(...args2){
        obj.fn(...args1, ...args2);
    }
    
}

// console.log("check: ",intro.myBind(person1 ));
const myIntro = intro.myBind(person1, "bhagalpur");
myIntro("bihar");

