const lodash = require('lodash');


console.log("----------------------- lodash.isEqual(obj1,  obj2) ---------------------");

const obj1 = {a: 1, b: "2", c:{d: "4", e: 5 }};
const obj2 = {b: "2", a: 1,  c:{d: "4", e: 5 }};

console.log("using json.stringify(): ", JSON.stringify(obj1) === JSON.stringify(obj2));     // but this method will return false it order of key-value differ, 
                                                                                            // but technically the are the same object

console.log("using lodash.isEqual(obj1,obj2): ", lodash.isEqual(obj1, obj2));

function isObject(obj) {
    return obj != null && typeof obj === "object";
}

function compareObjects (obj1, obj2) {
    const keyArr1 = Object.keys(obj1).sort();
    const keyArr2 = Object.keys(obj2).sort();

    if(keyArr1.length != keyArr2.length) return false;

    for(let i = 0; i<keyArr1.length; i++) {
        const key1 = keyArr1[i];
        const key2 = keyArr2[i];
        if(key1 != key2) return false;

        const val1 = obj1[key1];
        const val2 = obj2[key2];

        const isObjects = isObject(obj1) && isObject(obj2);

        if(!isObjects && val1 != val2) return false;
        if(isObjects && !compareObjects(val1, val2)) return false;
    }
    return true;
}

console.log("using my compareObjects function: ", compareObjects(obj1, obj2));