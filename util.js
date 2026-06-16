const captalize = (str) => {
    return `${str[0].toUpperCase()}${str.substring(1)}`
}

const reversedString = (str) => {
    return str.split("").reverse().join("") 
}

const isPlaindrome = (str) => {
    return str == str.split("").reverse().join("") ? "true" : "false"
}

const flattenArr = (arr) => {
    const flatArr = []
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            flatArr.push(...flattenArr(arr[i]))
        }else{
            flatArr.push(arr[i])
        }
    }

    return flatArr
}

module.exports = {
    captalize,
    reversedString,
    isPlaindrome,
    flattenArr
}