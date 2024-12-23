console.log("----------------- deep copy Method -----------------");

/*

const _ = require('lodash');

const obj = {
    a: 1,
    b: "text",
    c: {
        d: true,
        e: [1, 2, { f: 3 }]
    }
};

const deepCopy = _.cloneDeep(obj);

console.log(deepCopy);


*/

const arrCopy = [1,2,3,4,5];
const arrCopy2 = [1,2,3,[4,5]];

const arrCopy3 = [...arrCopy];
const arrCopy4 = [...arrCopy2];

arrCopy3.push(100);
arrCopy4[3].push(100);

console.log("arrCopy: ", arrCopy, " arrCopy3: ", arrCopy3);
console.log("arrCopy2: ", arrCopy2, " arrCopy4: ", arrCopy4);  // to prevent to add in both arr, we can use JSON.parse(JSON.stringify)


const arrCopy5 = JSON.parse(JSON.stringify(arrCopy2));
// arrCopy5[3].push(999);
// console.log("arrCopy2: ", arrCopy2, " arrCopy5: ", arrCopy5);


// mydeepcopy function 
// for similar funtionality which i acheive throug JSON.parse(JSON.stringify);

function deepCopy(el) {
    if(["number","string", "boolean"].includes(typeof el)) {
        return el;
    }
    else if(Array.isArray(el)){
        return el.map((e)=> deepCopy(e));
    }
    else{
        //it will be object then
        return Object.keys(el).reduce((acc, key) =>{
            acc[key] = deepCopy(el[key]);
            return acc;
        },{})
    }
}

const myCopiedArr = deepCopy(arrCopy2);
myCopiedArr[3].push(999);
console.log("arrCopy2: ", arrCopy2, " arrCopy5: ", myCopiedArr);

const obj = {
    key1: {
        name: "Atif Ahmad"
    }
};


const obj2 = obj;
obj2.key1.name = "Atif";

console.log("obj: ", obj, " obj2 directly copying: ", obj2)

const obj3 = deepCopy(obj);
obj3.key1.name = "atifahmd1";
console.log("obj: ", obj, " copied using my deepCopy function: ", obj3);


/*

Explanation for the case of objects:
When the input (el) is an object, the deepCopy function processes it as follows:

Object Detection: If the input is neither a primitive (like number, string, or boolean) nor an array, 
it is assumed to be an object (because JavaScript treats objects as the "default case" for non-primitives).

Copying Keys and Values:

The function uses Object.keys(el) to get an array of all the keys (properties) of the object.
It then uses the reduce method to build a new object. For each key, it:
Calls deepCopy recursively on the corresponding value (el[key]).
Adds the result to the new object under the same key.
Recursion: If any value of the object is itself an object or an array, the deepCopy function is called recursively, 
ensuring that the entire structure of the object is deeply copied.

Empty Object: The {} passed as the second argument to reduce serves as the initial accumulator, 
which starts as an empty object and is populated with keys and their deep-copied values during the reduction process.

Example
Suppose we have the following object:

const obj = {
    a: 1,
    b: "text",
    c: {
        d: true,
        e: [1, 2, { f: 3 }]
    }
};

When we call deepCopy(obj), here's what happens:

el is identified as an object.

The keys ["a", "b", "c"] are obtained.

For each key:

a is a primitive (number), so its value (1) is directly returned.
b is a primitive (string), so its value ("text") is directly returned.
c is another object, so deepCopy is called recursively on { d: true, e: [1, 2, { f: 3 }] }.
Inside the recursion for c:

The keys ["d", "e"] are processed:
d is a primitive (boolean), so its value (true) is directly returned.
e is an array, so the function processes each element of the array:
1 and 2 are primitives, returned directly.
{ f: 3 } is an object, so deepCopy is called recursively on it, resulting in { f: 3 }.
The resulting copy of the object is:

{
    a: 1,
    b: "text",
    c: {
        d: true,
        e: [1, 2, { f: 3 }]
    }
}

This new object is completely independent of the original obj. 
Changes made to the original or the copied object will not affect each other.

*/