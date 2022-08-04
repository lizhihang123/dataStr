// 归并排序

var initArr = [9,8,7,6,5,4,3,2];  // 测试数据

// nlogN
function mergeSort(arr) {
    var len = arr.length;

    _mergeSort(arr, 0, len - 1);
}
 
function _mergeSort(arr, left, right) { // left 起始  right  结束
    var mid = parseInt((left + right) / 2);

    if (left >= right) {
        return;
    }

    _mergeSort(arr, left, mid);
    _mergeSort(arr, mid + 1, right);

    // 对数组进行合并
    _merge(arr, left, mid, right);
}

function _merge(arr, left, mid, right) {

    var tempArr = [];
    var leftPoint = left;
    var rightPoint = mid + 1;

    for(var i = 0; i < right - left + 1; i ++) {
        
        if (leftPoint > mid) {
            tempArr.push(arr[rightPoint]);
            rightPoint ++;
            continue;
        }

        if (rightPoint > right) {
            tempArr.push(arr[leftPoint]);
            leftPoint ++;
            continue;
        }


        if (arr[leftPoint] < arr[rightPoint]) {
            tempArr.push(arr[leftPoint]);
            leftPoint ++;
            continue;
        } else {
            tempArr.push(arr[rightPoint]);
            rightPoint ++;
            continue;
        }

    }


    // 将tempArr的值修改到arr
    
    tempArr.forEach((val, index) => {
        arr[left + index] = val;
    });
}
mergeSort(initArr);
console.log(initArr);

