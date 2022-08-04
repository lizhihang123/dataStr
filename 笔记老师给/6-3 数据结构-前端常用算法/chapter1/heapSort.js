// 堆

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

class Heap {
    constructor() {
        // 堆顶元素index为1
        this.data = [null];
    }

    heapify(arr) {
        // debugger
        arr.unshift(null);
        this.data = arr;

        // 寻找最后一个非叶子节点

        var lastIndex = parseInt((this.data.length - 1) / 2);
        // debugger;
        for(var i = lastIndex; i > 0; i --) {
            // debugger;
            this.shiftDown(i);
        }
    }

    getData() {
        console.log(this.data);

        return this.data;
    }

    // 添加
    insert(num) {
        this.data.push(num);

        // 维持最大堆的状态 
        this.shiftUp(this.data.length - 1);
    }

    shiftUp(currentIndex) { // 会发生变化的index
        // 添加的节点冒泡过程是递归的
        while (currentIndex > 1 && this.data[currentIndex] > this.data[parseInt(currentIndex / 2)]) {
            swap(this.data, currentIndex, parseInt(currentIndex / 2));
            currentIndex = parseInt(currentIndex / 2);
        }
    }

    // 删除, 堆顶元素
    extractMax() {
        if (this.data.length > 1) {
            // 1. 堆顶和最后一位元素交换位置  2. 删除最后以为元素
            swap(this.data, 1, this.data.length - 1);
            var result = this.data.pop();

            this.shiftDown(1);

            // result 就是最大的值
            return result;
        }
    }

    shiftDown(currentIndex) {
        // 只要 左右子节点大于父节点
        while (this.data[currentIndex * 2] > this.data[currentIndex] || this.data[currentIndex * 2 + 1] > this.data[currentIndex]) { // 什么情况下需要进行元素的交换
            // 左右子节点谁大就交换谁

            if (this.data[currentIndex * 2] < this.data[currentIndex * 2 + 1]) {
                swap(this.data, currentIndex, currentIndex * 2 + 1);
                currentIndex = currentIndex * 2 + 1;
            } else {
                swap(this.data, currentIndex, currentIndex * 2);
                currentIndex = currentIndex * 2;
            }
        }
    }

}

var heapData = new Heap();

heapData.insert(7);
heapData.insert(8);
heapData.insert(9);
heapData.insert(4);
heapData.insert(3);
heapData.insert(2);
heapData.getData();

heapData.extractMax();
heapData.getData();

// 堆排序

var initArr = [11, 20, 40, 1, 3, 7, 4];  // 测试数据

function heapSort(arr) {
    // 不断的从最大堆的堆顶进行元素的读取，就能变相的完成排序功能

    var heapData = new Heap();
    var resultArr = [];
    
    // 有没有可能一次性完成最大堆的创建
    arr.forEach((val, index) => {
        heapData.insert(val);
    });

    // 不断的取出堆顶的元素
    
    for(var i = 0; i < arr.length; i ++) {
        var result = heapData.extractMax();

        resultArr.unshift(result);
    }
    console.log(resultArr)
    return resultArr;
}
heapSort(initArr)



var heapData3 = new Heap();
var testArr = [11, 20, 40, 1, 3, 7, 4]; 
heapData3.heapify(testArr);
heapData3.getData();