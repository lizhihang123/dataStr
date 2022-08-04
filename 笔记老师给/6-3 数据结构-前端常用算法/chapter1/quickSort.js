// 快速排序

var initArr = [9,8,7,6,5,4,3,2];  // 测试数据

function quickSort(arr) {
    
    if(arr.length === 0) {
        return []
    }

    if (arr.length === 1) {
        return arr;
    }

    var targetNum = arr[0];

    var leftArr = [];
    var rightArr = [];

    for (var i = 1; i < arr.length; i ++) {
        var num = arr[i]
        if (num < targetNum) {
            leftArr.push(num);
        } else {
            rightArr.push(num);
        }
    }

    var newArr = quickSort(leftArr).concat(targetNum, quickSort(rightArr));
    return newArr;
}

console.log(quickSort(initArr))