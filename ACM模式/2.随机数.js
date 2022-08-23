// 多行输入 多行输出
// 输入
// 3
// 1
// 2
// 2
// 上面表示输入3个1-500的数字

// 1. 先取出第一个个数
let n = parseInt(readline());
// 2. 存放数据
var inputs = [];
// 3. while循环 不断读出数据
while(line = readline()){
    // 3. 转化为整数
    line = parseInt(line);
    //！！！！注意
    // 放大inputs数组里面去
    inputs.push(line);
}
// 去重
var res = new Set(inputs);
//多行输出！
// print打印
// set转化为数组 sort进行排序
// forEach 进行遍历打印
Array.from(res).sort((a,b)=>a-b).forEach(item=>print(item));