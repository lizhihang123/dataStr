// 递归与回溯
// 电话号码的组合

var data = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz"
}
var arr = [];
// 1. 第一步： 完成对  输入数字 字符串的遍历
// 2. 第二步: 数字对象的字母
function phoneNumber(digits, index, res) {
    // 想对digits 进行遍历，但是你又不能使用for循环
    
    if(index > digits.length - 1) {
        arr.push(res);
        return;
    }

    var letterStr = data[digits[index] + ''];

    for(var i = 0; i < letterStr.length; i++) {
        // 在循环里面进行递归
        // 保存结果
        phoneNumber(digits, index + 1, res + letterStr[i]);
    }
}

phoneNumber('235', 0, '');
console.log(arr)