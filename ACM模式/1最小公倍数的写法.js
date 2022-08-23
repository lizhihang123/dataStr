// 输入的数据是 5 7
// 根据括号分割 把 5和7转化为数组，
// 如何找到 5 和 7的最下公倍数？
//     5 * 7 = 35
//     遍历从 0 到 35 的值，然后看看这些值是否分别能够整除这两个值 能的话 就返回这个值
let line = readline();
let nums = line.split(' ');
let res = 0;
let data = nums[0] *nums[1];
for(let i = 1 ; i <=data ; i++){
    if(i%nums[0]==0 && i%nums[1]==0) {
        res = i;
        break;
    }
}
console.log(res);