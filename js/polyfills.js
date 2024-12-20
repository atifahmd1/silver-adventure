console.log("general function polyfils");

console.log("----------------- for each -----------------");

const arr = [1,2,3,4,5];

// arr.forEach((el)=> console.log(el));

Array.prototype.myForEach = function(cb){
    // console.log("this: ", this);
    // console.log("cb: ", cb);
    for(let i=0; i<this.length; i++){
        cb(this[i], i, this);
    }
}

// arr.myForEach((el)=>console.log(el, this));

console.log("----------------- MAP -----------------");

let res = arr.map((el)=> el*2);
console.log("map res: ", res);

Array.prototype.myMap = function(cb){
    let resArr = [];
    for(let i=0; i<this.length; i++){
        resArr.push(cb(this[i]));
    }
    return resArr;
}

res = arr.myMap((el)=> el*2);
console.log("myMap res: ", res);

console.log("----------------- filter -----------------");

res = arr.filter((el)=> el%2==0);
console.log("filter res: ", res);

Array.prototype.myFilter = function(cb) {
    let resArr = [];
    // for(let i in this){     //it works, but do not use this as it causes problems, it caused problem in reduce funtion when i used it there
    for(let i=0; i<this.length; i++){    
        if(cb(this[i])) resArr.push(this[i]);
    }
    return resArr;
}
res = arr.myFilter((el) => el%2 == 0);
console.log("myFilter res: ", res);


console.log("----------------- REDUCE -----------------");

res = arr.reduce((acc, cur) =>{
    return acc + cur;
}, 0);
console.log("reduce res: ", res);

Array.prototype.myReduce = function(cb, initialValue) {
    let acc = initialValue;
    for(let i=0; i<this.length; i++){   // for in loops through everyting in an arr, including methods like myReduce.
        acc =  acc ? cb(acc, this[i]) : this[i];    // this causes prblms bcoz myreduce gets included in the loop
    }                                               // and mess up the logic
    return acc; 
}
res = arr.myReduce((acc, curr)=>{
    return acc + curr;
}, 0);

console.log("myReduce res: ", res);


