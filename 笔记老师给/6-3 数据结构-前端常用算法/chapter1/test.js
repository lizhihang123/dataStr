// 解决某一个问题
// 时间O（n）
for(var i = 0; i < n; i ++) {
    // 。。。。
}


// 时间O（n^2）
var count = 0;

for(var i = 0; i < 100; i++) {
    // .....
    for(var j = 0; j < 100; j ++) {
        // ....
        count ++;
    }
}
console.log(count)



// n = 100
var count1 = 0;
var i = 1;
while(i < 100) {
    i = i * 2;
    count1 ++
}
console.log(count1)


// 二分查找
// o(N)  => o(logN)
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];


// two sum 

var initArr = [2, 7, 11, 15];
var target = 9;
// [0, 1]

// 优化
// 空间换时间
var data = {};

for(var i = 0; i < initArr.length; i++) {
    data[initArr[i]] = i;
}
console.log(data);

for(var i = 0; i < initArr.length; i++ ) {
    var restNum = 9 - initArr[i];
    // 找到余数所对应的index
    console.log([i, data[restNum]);
    break;
}




// 时间复杂度   O(n^2)
for (var i = 0; i < initArr.length; i++) {
    var restNum = 9 - initArr[i];
    if (initArr.indexOf(restNum) > - 1) {
        // 找到了结果
        console.log([i, initArr.indexOf(restNum)]);
        break;
    }
}



