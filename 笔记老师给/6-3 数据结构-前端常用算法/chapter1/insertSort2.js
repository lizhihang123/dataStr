// 插入排序  优化

var initArr = [9,8,7,6,5,4,3,2,1];  // 测试数据


function insertSort2(arr) {
    var len = arr.length;

    if (len < 2) {
        return arr;
    }

    for(var i = 0; i < len; i ++) { // i红色指针
        var iIndex = i;  // 红色 
        var moveIndex = i - 1;   // 蓝色
        var temp = arr[i];

        if (arr[iIndex] > arr[moveIndex]) {
            continue;
        }

        for(var j = i; j > -1; j --) {
            
            if (arr[j - 1] < temp) {
                arr[j] = temp;
                break;
            }

            if (!arr[j - 1]) {
                arr[j] = temp;
                break;
            }

            arr[j] = arr[j - 1];   // 蓝色指针的值，赋值给红色指针
        }
    }
}

insertSort2(initArr);
console.log(initArr)