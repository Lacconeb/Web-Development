
function deepEqual(object1, object2){
    if ((typeof object1 == "object" && object1 != null) && (typeof object2 == "object" && object2 != null)){
        for (var obj in object1){
            if(object2[obj] === undefined){
                return false;
            }

            if(object2[obj] instanceof Object && object1[obj] instanceof Object){
                if(!deepEqual(object2[obj], object1[obj])){
                    return false;
                }
            }else if(object2[obj] !== object1[obj]){
                return false;
            }
        }
        return true;
    }else if(object1 !== object2){
        return false;
    }else{
        return true;
    }

}

//Tests were copied from the website linked in the assignment(http://eloquentjavascript.net/04_data.html#h_IJBU+aXOIC)

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

//all tests were successful