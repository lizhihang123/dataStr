// 冒泡排序

var initArr = [9,8,7,6,5,4,3,2,1];  // 测试数据

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function bubbleSort(arr) {

    var len = arr.length;

    // o(n^2)
    for(var i = 0; i < len; i ++ ) {
        for(var j = 0; j < len - i; j++) {
            
            // 边界情况
            if (!arr[j + 1]) {
                break;  //  只能跳出一层for循环
            }

            // 冒泡过程
            if(arr[j] > arr[j + 1]) {
                // 位置交换
                swap(arr, j , j + 1);
            }
        }
    }
    return arr;
}

bubbleSort(initArr);

console.log(initArr);