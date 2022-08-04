// 插入排序

var initArr = [9,8,7,6,5,4,3,2,1];  // 测试数据

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function insertSort(arr) {

    var len = arr.length;

    if (len < 2) {
        return arr;
    }

    for (var i = 0; i < len; i++) {
        for(var j = i; j > 0; j--) {
            // 插入的过程
            // 因为j不可能为0， 所以无需考虑边界情况
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
            }
        }
    }
    return arr;
}

insertSort(initArr);

console.log(initArr)