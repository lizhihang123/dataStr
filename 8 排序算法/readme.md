# 1. 快速排序

## 1.1 快速排序的核心思想

1. 选择一个基准元素
2. 所有比这个基准元素小的元素，放到他的左边
3. 所有比这个基准元素大的元素，放到他的右边。把数组拆成两个部分，叫作分治。
4. 数组拆成的两个部分，按照上面的逻辑，再次进行拆分与排序







## 1.2 快速排序的基准元素怎么选？

1. 选择第一个元素，是最简单的。但是如果有一个完全逆序的数组，第一个数是最大的，就会造成，每一轮只是找了个基准元素，没有进行“分治”，也就是拆分数组，时间复杂度会退化为O(n^2)。

2. 随机选择一个元素作为基准元素，然后开始分治，是一种办法。mid = Math.floor((start + end) / 2),mid就是基准值，这样是选择中间的元素

3. 但是中间的元素也有可能是，最大的元素或者是最小的。这个就是几率问题，因此快排的`平均时间复杂度是O(n logn)`，最坏是`O(n^2)`

4. O(n * logn)是怎么得出来的呢？

   1. 每一轮交换，所有元素都要遍历一次,所以是 `n`
   2. 有多少轮呢？因为是分治，所以有`logn`轮

5. **原地**

   判断是不是原地排序：要看有没有使用额外的数组空间

   快速排序是原地排序

6. **稳定**

   如果存在a[i] = a[j] 排序前，a[i]在a[j]的前面,排序后a[j]在a[i]的前面，就不是稳定的排序

   快速排序不是稳定的排序。比如[4,7,6,5,8,3,1，1,]后面两个1的相对位置会发生改变

   

## 1.3 快速排序写法1

>时间复杂度：O(Nlogn) 为什么两个while 还是Nlogn，因为本质还是两个指针往内部进行遍历，是O(N) 分治的话，就是O(logn) => 合起来就是O(n * logn)
>
>空间：O(n) 递归的复杂度

核心思路：选定一个基准值，利用两个指针进行遍历，比基准值小的在一边，比基准值大的在另外一边

```js
function sortArray(nums) {
    // 1.初始化
    let startIndex = 0
    let endIndex = nums.length - 1
    quickSort(nums, startIndex, endIndex)
    return nums
}

// 分治 + 递归
function quickSort(nums, startIndex, endIndex) {
    // 必须有退出条件
    if (startIndex >= endIndex) {
        return
    }
    // 2.startIndex, endIndex为 0和nums.length时 进行第一波循环 得到变化的第一个基准值
    let mid = partition(nums, startIndex, endIndex)
    // 3.递归当前函数 通过基准值进行切分 注意基准值不再进入排序
    //   递归两次的目的是 分治 
    quickSort(nums, startIndex, mid - 1)
    quickSort(nums, mid + 1, endIndex)
}

// 真正的排序在这里
function partition(nums, startIndex, endIndex) {
    // 4. 存储基准索引的“值”
    let pivot = nums[startIndex]
    let left = startIndex
    let right = endIndex
    let temp //交换变量用
    // 5. 只要left指针比right指针小 就一直进行循环
    while (left < right) {
        // 右边的值比基准值更大 继续while
        while (left < right && nums[right] > pivot) {
            right--
        }
        // 左边的值比基准值更大 继续while
        while (left < right && nums[left] <= pivot) {
            left++
        }
        // 如果说左右指针都停了 就进行元素交换(交换的前提是left<right)
        if (left < right) {
            temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
        }
    }
    // 把left指针停留的位置的值赋值给startIndex的位置
    nums[startIndex] = nums[left]
    // left指针的值等于基准值pivot
    nums[left] = pivot
    // left是下一个基准值
    return left
}
console.log(sortArray([4, 1, 2, 3, 5, 6, 8, 7]));
```



## 错误标明版

```js
function sortArray(nums) {
    let startIndex = 0
    // ! nums.length 写成 nums.length 结果就会报错
    let endIndex = nums.length - 1
    quickSort(nums, startIndex, endIndex)
    return nums
}

// 分治 + 递归
function quickSort(nums, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return
    }
    // !partition(nums, startIndex, endIndex) -> 写成了 partition(startIndex, endIndex)
    let mid = partition(nums, startIndex, endIndex)
    // !partition(nums, 0, mid - 1) 应该是 partition(nums, 0, mid - 1)
    quickSort(nums, startIndex, mid - 1)
    quickSort(nums, mid + 1, endIndex)
}

// 真正的排序在这里
function partition(nums, startIndex, endIndex) {
    let pivot = nums[startIndex]
    let left = startIndex
    let right = endIndex
    while (left < right) {
        // !漏掉了left < right
        while (left < right && nums[right] > pivot) {
            right--
        }
        // !left应该是小于等于pivot 少了等于就报错
        while (left < right && nums[left] <= pivot) {
            left++
        }
        // left可以等于right
        if (left < right) {
            let temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
        }
    }
    nums[startIndex] = nums[left]
    nums[left] = pivot
    // !忘记return left的值
    return left
}
```



## 1.4 单边快排

单边快排，sortArray函数和quickSort的函数的写法和前面的是一样的。

唯一不同的是，使用了mark指针来标识，比基准值小的元素。

```js
function sortArray(nums) {
    let startIndex = 0
    let endIndex = nums.length - 1
    quickSort(nums, startIndex, endIndex)
    return nums
}
function quickSort(nums, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return
    }
    let privotIndex = partition(nums, startIndex, endIndex)
    quickSort(nums, startIndex, privotIndex - 1)
    quickSort(nums, privotIndex + 1, endIndex)
}

function partition(arr, startIndex, endIndex) {
    let mark = startIndex
    let pivot = arr[startIndex]
    // ! i<=endIndex注意要加等于号
    for (let i = startIndex + 1; i <= endIndex; i++) {
        if (arr[i] < pivot) {
            mark++ // mark停在那里的值是一定要比基准值小的
            let p = arr[mark]
            arr[mark] = arr[i]
            arr[i] = p
        }
    }
    // 为什么是下面这样写？
    // arr[mark]最后表示的是所以比基准值小的数的界限
    // 接下来要交换基准值交换完之后左边所有的数都是比基准值小的
    arr[startIndex] = arr[mark]
    arr[mark] = pivot
    return mark
}
console.log(sortArray([4, 7, 3, 5, 6, 2, 8, 1]));
```

# 2. 冒泡排序



## 2.1 冒泡排序是什么：

目录：

1. 冒泡排序是什么
2. 冒泡排序的时间复杂度和空间复杂度
3. 冒泡排序优化1
4. 冒泡排序优化2
5. 鸡尾酒排序
6. 鸡尾酒排序优化1

概念：每个元素和后一个元素比较 当 `前一个 `大于`后一个` ，就要进行交换。大的元素会交换到后面，小的元素会交换到前面



## 2.2 冒泡排序的时间复杂度和空间复杂度

时间：O(N^2) -》因为有两个for循环，外层是多少趟，内层是要从开头走到尾的

空间：O(1) 是原地排序 - 没有创建新的元素

此外，它也是稳定排序。相邻元素的相对位置 不会被破坏



## 2.3 冒泡排序写法

```diff
// 1. 交换 
        function swap(arr, i, j) {
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        // 2 排序
        function BubbleSort(nums) {
            let len = nums.length
            // 外面for循环 表示走几趟，走 len-1趟，[5, 3, 2, 1] 走三趟
+外层for循环边界是 len - 1 
+内层for循环是 len - i - 1，这两个总是写错
            for (let i = 0; i < len - 1; i++) {
                // 里面的for循环 表示 每一趟走多少次，长度 - i - 1 而i表示当前是第几趟
                for (let j = 0; j < len - i - 1; j++) {
                    if (nums[j] > nums[j + 1]) {
                        swap(nums, j, j + 1)
                    }
                }
            }
            return nums
        }
        // console.log(BubbleSort([1, 2, 5, 333, 4, 8, 10, 9]));
        // console.log(BubbleSort([5,1,1,2,0,0]));
        console.log(BubbleSort([5, 3, 2, 1]));
```





## 2.4 冒泡优化1

有些重复的元素，没有发生变化，但是依然每次都要被遍历。

优化的思路，原本要交换8趟，但是在第4趟，两两元素没有进行交换了，就可以停止不需要进行交换了

1. 外层for循环 每次开始都要让 isSorted改为true
2. 只有交换了，isSorted改为false
3. 判断，如果是true，就break。

```diff
        // 通过一个变量，只要进行了交换，这个变量就是true，否则是false，是true 就return
        function swap(arr, i, j) {
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        // 2 排序
        function BubbleSort(nums) {
            let len = nums.length
            // 外面for循环 表示走几趟，走 len-1趟，[5, 3, 2, 1] 走三趟
            for (let i = 0; i < len - 1; i++) {
+                let isSorted = true
                debugger
                if (i === 3 || i === 4) {
                    debugger
                }
                // 里面的for循环 表示 每一趟走多少次，长度 - i - 1 而i表示当前是第几趟
                for (let j = 0; j < len - i - 1; j++) {
                    if (nums[j] > nums[j + 1]) {
                        swap(nums, j, j + 1)
+                        isSorted = false
                    }
                }
+                if (isSorted) {
                    break
                }
            }
            return nums
        }
        // console.log(BubbleSort([5, 8, 6, 3, 9, 2, 1, 7]));
        console.log(BubbleSort([5, 2, 1, 6, 3, 7, 8, 9]));
```





## 2.5 冒泡优化2

```diff
// 优化的思路2：
// 进一步优化：不仅仅是从走8趟 -》 走4趟
// 且 如果有些元素已经是有序的了，就不需要再进行比较了
function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
// 2 排序
function BubbleSort(nums) {
    let len = nums.length
    // 外面for循环 表示走几趟，走 len-1趟，[5, 3, 2, 1] 走三趟
    let sortBorder = nums.length - 1
    let lastExchangeIndex = 0
    for (let i = 0; i < len - 1; i++) {
        let isSorted = true
        debugger
        // 里面的for循环 表示 每一趟走多少次，长度 - i - 1 而i表示当前是第几趟
        for (let j = 0; j < sortBorder; j++) {
            debugger
            if (nums[j] > nums[j + 1]) {
                swap(nums, j, j + 1)
                isSorted = false
                // 更新为最后一次交换元素的位置
                // 也就是说 如果是 5, 4, 3, 6, 7, 8, 9 => j此时就是3，下一次遍历的范围就是 0, 3
                lastExchangeIndex = j
            }
        }
        // 请注意 边界更新 要等到 “内层for循环结束再去进行”
        sortBorder = lastExchangeIndex
        if (isSorted) {
            break
        }
    }
    return nums
}
// console.log(BubbleSort([5, 8, 6, 3, 9, 2, 1, 7]));
// console.log(BubbleSort([5, 2, 1, 6, 3, 7, 8, 9]));
console.log(BubbleSort([3, 4, 2, 1, 5, 6, 7, 8]));
```







## 2.6 鸡尾酒排序

从左到右进行一轮冒泡，从右到左再进行一轮冒泡；

和单纯的冒泡排序的区别是什么呢？

```diff
		function swap(arr, m, n) {
            let temp = arr[m]
            arr[m] = arr[n]
            arr[n] = temp
        }
        function sort(array) {
            // debugger
            let mid = Math.floor(array.length / 2)
            let len = array.length
            // 控制循环的回合数
            for (let i = 0; i < mid; i++) {
                let isSorted = true
                // 从左向右边循环
                for (let j = i; j < len - i - 1; j++) {
                    // debugger
                    if (array[j] > array[j + 1]) {
                        swap(array, j, j + 1)
                        isSorted = false
                    }
                }
                if (isSorted) {
                    break
                }

                isSorted = true
                // 从右边向左边循环
                for (let j = len - i - 1; j > i; j--) {
                    // debugger
                    if (array[j] < array[j - 1]) {
                        swap(array, j, j - 1)
                        isSorted = false
                    }
                }
                if (isSorted) {
                    break
                }
            }
            return array
        }
        let arr = []
        for (let i = 2; i < 1000000; i++) {
            arr.push(i)
        }
        console.time('排序')
        console.log(sort([...arr, 1]));
        console.timeEnd('排序')
```





## 2.7 鸡尾酒排序优化1

```diff
// 适合大部分数据都是有序的数组
        // 可以对“有序部分”进行优化
        function swap(arr, m, n) {
            let temp = arr[m]
            arr[m] = arr[n]
            arr[n] = temp
        }
        function sort(array) {
            // debugger
            let mid = Math.floor(array.length / 2)
            let len = array.length
+            let leftBorder = 0
+            let rightBorder = array.length - 1
+            let leftLast = 0
+            let rightLast = 0
            // 控制循环的回合数
            for (let i = 0; i < mid; i++) {
                // debugger
                let isSorted = true
                // 从左向右边循环
+                for (let j = 0; j < rightBorder; j++) {
                    // debugger
                    if (array[j] > array[j + 1]) {
                        swap(array, j, j + 1)
                        isSorted = false
+                        rightLast = j
                    }
                }
+                rightBorder = rightLast
                if (isSorted) {
                    break
                }

                isSorted = true
                // 从右边向左边循环
+                for (let j = len - i - 1; j > leftBorder; j--) {
                    // debugger
                    if (array[j] < array[j - 1]) {
                        swap(array, j, j - 1)
                        isSorted = false
+                        leftLast = j
                    }
                }
+                leftBorder = leftLast

                if (isSorted) {
                    break
                }
            }
            return array
        }
        let arr = []
        for (let i = 2; i < 1000000; i++) {
            arr.push(i)
        }
        console.time('排序')
        console.log(sort([...arr, 1]));
        console.timeEnd('排序')
```



# 3. 堆排序

目标：

1.知道完全二叉树的概念 知道满二叉树的概念

1.知道二叉堆是什么

2.知道二叉堆的操作：删除 插入 构建 代码如何实现

3.知道堆排序的实现思路 

4.堆排序代码的书写

5.知道堆排序的优化 heapify

6.知道优先队列的概念



>1.二叉堆 ok
>
>2.完全二叉树ok
>
>3.堆排序的代码 删除 插入 ok
>
>但是构建 不ok
>
>4.堆排序的时间复杂度不ok
>
>……



## 3.1 基础概念

堆排序一定满足是完全二叉树，一定是最大堆或者是最小堆



**完全二叉树:**

一定是二叉树。树的最后一行，可以不满，但是最后一行的节点一定是靠左边的。倒数第二行开始的节点一定是满的。

区分**满二叉树**

最后一行没有子节点，其余的行都有左右子节点。也就是最后一行的节点都必须是满的

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220715081648431.png" alt="image-20220715081648431" style="zoom:50%;" />



**二叉堆**

二叉堆一定是 “完全二叉树”，然后再是“最大堆和最小堆”

最大堆，父节点的值一定比子节点的值要大

最小堆，父节点的值一定比子节点的值要小

![image-20220715081704258](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220715081704258.png)







## 3.2 二叉堆的索引关系

用数组来存储。

如果当前节点是 i，那么请问，父节点的索引是多少？是 parseInt(i / 2)

如果当前节点是 i,请问，左右子节点的值是多少？

​	左子节点的索引, i * 2【i是父节点的索引】

​	右子节点的索引， i * 2 + 1

![image-20220715080407329](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220715080407329.png)



## 3.3  堆的操作

- 添加
- 删除
- 构建二叉堆



### 添加操作

只能在最底部添加元素，然后和父元素比较。假设是最大堆，如果比子元素大，就进行交换，直到”根元素“为止

![image-20220715081429670](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220715081429670.png)



### 删除思路

删除元素只能删除堆顶的元素。为什么呢？如果中间的元素能够删除，就会乱套了

1.如果要删除堆顶元素，先要把这个元素和最后一个元素进行交换。

2.然后删掉最后一个元素

3.紧接着，顶部元素开始 “自顶向下“的进行比较。假设是最大堆，父元素要和子元素进行比较，如果子元素更大，就进行交换。

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220715081536400.png" alt="image-20220715081536400" style="zoom:50%;" />

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220715081613977.png" alt="image-20220715081613977" style="zoom:50%;" />



### 如何把数据放到堆里面去

1.创建一个新的“堆实例“

2.你有一个数组数据，遍历数组，值一个个 **插入**到堆里面去

3.假设数组有10个元素，就要对“堆”实例，进行“**删除元素并且取出元素 放到result结果数组里面去**”

## 3.4 编码环节

### 走过的坑

1 为什么要设置数组第一个值是null

```diff
为什么要设置一个null?
    和堆的索引 第一个从1开始有关系
为什么堆的索引要从1开始?
和我们判断父节点 子节点有关系
    如果索引从1开始 每个节点的父节点就是parseInt(i / 2)
    每个节点的左子节点的索引就是 i * 2
    右子节点的索引就是 i * 2 + 1
```



2 为什么添加元素一定是在底部添加

其他位置添加不好 会很混乱



3 维持堆顶状态的的while递归的条件搞错

while (this.data[currentIndex] > this.data[parseInt(currentIndex / 2 )] 



4 删除的思路 先交换索引为1的元素和最后一个 再进行向底下冒泡的过程

```diff
                swap(this.data, 1, this.data.length - 1)
                let result = this.data.pop()
                this.shiftDown(1)
                return result
```



5 删除的while 退出循环的条件搞错 只有当前元素小于子节点的值时，才需要退出

```diff
+         while (
                    // 需要 currentIndex的值 小于 左 或者 右子节点
                    this.data[currentIndex] < this.data[currentIndex * 2] ||
                    this.data[currentIndex] < this.data[currentIndex * 2 + 1]
                ) {
```



### 正式编码

```diff
function swap (arr, index1, index2) {
    let temp = arr[index1] 
    arr[index1] = arr[index2] 
    arr[index2] = temp
}
class Heap {
    constructor() {
        // 为什么要设置一个null?
            // 和堆的索引 第一个从1开始有关系
        // 为什么堆的索引要从1开始?
        // 和我们判断父节点 子节点有关系
            // 如果索引从1开始 每个节点的父节点就是parseInt(i / 2)
            // 每个节点的左子节点的索引就是 i * 2
            // 右子节点的索引就是 i * 2 + 1
+                this.data = [null]
    }

    getData () {
        console.log(this.data)
        return this.data
    }

    // 添加
    insert (num) {
        // 最底部添加元素
+                this.data.push(num)
        // 维护顶部的状态
        this.shiftUp(this.data.length - 1)
    }

    // 维持堆顶状态 插入的元素要往上调整时
    shiftUp (currentIndex) {
            // 递归 while循环 子元素 比父元素小 就交换
            // currentIndex > 1 是为了避免第一个元素和null交换
+                while (this.data[currentIndex] > this.data[parseInt(currentIndex / 2 )] 
        && currentIndex > 1) {
            swap(this.data, currentIndex, parseInt(currentIndex / 2))
            // 改变当前指针的索引 为父元素
            currentIndex = parseInt(currentIndex / 2)
        }
    }


    // 删除
    // 不能任意删除 将顶部和最后一个元素进行交换
        // 最后一个元素此时要进行和子元素比较 和较大的那个进行交换
    // 再删除最后一个元素
    extractMax () {
        swap(this.data, 1, this.data.length - 1)
        let result = this.data.pop()
        this.shiftDown(1)
        return result
    }

    // 维护顶层的元素
    shiftDown (currentIndex) {
+         while (
            // 需要 currentIndex的值 小于 左 或者 右子节点
            this.data[currentIndex] < this.data[currentIndex * 2] ||
            this.data[currentIndex] < this.data[currentIndex * 2 + 1]
        ) {
            // 如果右子节点 小于 左子节点
            if (this.data[currentIndex * 2 + 1]  <  this.data[currentIndex * 2]) {
                swap(this.data, currentIndex, currentIndex * 2)
                currentIndex = currentIndex * 2
            } else if (this.data[currentIndex * 2 + 1] > this.data[currentIndex * 2 ]) {
                swap(this.data, currentIndex, currentIndex * 2 + 1)
                currentIndex = currentIndex * 2 + 1
            }
        }
    }
}
let heapData = new Heap()
heapData.insert(1)
heapData.insert(2)
heapData.insert(3)
heapData.insert(4)
heapData.insert(5)
heapData.getData()
heapData.extractMax()
heapData.getData()
```



## 3.5 堆排序的正式编码

核心技巧：

```diff
            1. 堆的数据结构 
            2. 不断的把传入的数组里面的值放入堆
               借此生成了最大堆
               堆顶都是最大的元素
            3. 调用删除 取出最大堆的值
               unshift放入数组的前面部分
               输出这个值
```

踩过的坑

```diff
产生了一个死循环：
	if (this.data[currentIndex * 2 + 1]  <  this.data[currentIndex * 2]) {
        swap(this.data, currentIndex, currentIndex * 2)
        currentIndex = currentIndex * 2
+     } else if (this.data[currentIndex * 2 + 1] > this.data[currentIndex * 2]) {
        swap(this.data, currentIndex, currentIndex * 2 + 1)
        currentIndex = currentIndex * 2 + 1
    }
```



正式编码

```diff
function swap (arr, index1, index2) {
            let temp = arr[index1] 
            arr[index1] = arr[index2] 
            arr[index2] = temp
        }
        class Heap {
            constructor() {
                // 为什么要设置一个null?
                //     和堆的索引 第一个从1开始有关系
                // 为什么堆的索引要从1开始?
                // 和我们判断父节点 子节点有关系
                //     如果索引从1开始 每个节点的父节点就是parseInt(i / 2)
                //     每个节点的左子节点的索引就是 i * 2
                //     右子节点的索引就是 i * 2 + 1
                this.data = [null]
            }

            getData () {
                console.log(this.data)
                return this.data
            }

            // 添加
            insert (num) {
                // 最底部添加元素
                this.data.push(num)
                // 维护顶部的状态
                this.shiftUp(this.data.length - 1)
            }

            // 维持堆顶状态 插入的元素要往上调整时
            shiftUp (currentIndex) {
                    // 递归 while循环 子元素 比父元素小 就交换
                    // currentIndex > 1 是为了避免第一个元素和null交换
                while (this.data[currentIndex] > this.data[parseInt(currentIndex / 2 )] 
                && currentIndex > 1) {
                    swap(this.data, currentIndex, parseInt(currentIndex / 2))
                    // 改变当前指针的索引 为父元素
                    currentIndex = parseInt(currentIndex / 2)
                }
            }


            // 删除
            // 不能任意删除 将顶部和最后一个元素进行交换
                // 最后一个元素此时要进行和子元素比较 和较大的那个进行交换
            // 再删除最后一个元素
            extractMax () {
                swap(this.data, 1, this.data.length - 1)
                let result = this.data.pop()
                this.shiftDown(1)
                return result
            }

            // 维护顶层的元素
            shiftDown (currentIndex) {
                while (
                    // 需要 currentIndex的值 小于 左 或者 右子节点
                    this.data[currentIndex] < this.data[currentIndex * 2] ||
                    this.data[currentIndex] < this.data[currentIndex * 2 + 1]
                ) {
                    // 如果右子节点 小于 左子节点
                    if (this.data[currentIndex * 2 + 1]  <  this.data[currentIndex * 2]) {
                        swap(this.data, currentIndex, currentIndex * 2)
                        currentIndex = currentIndex * 2
+                    } else if (this.data[currentIndex * 2 + 1] > this.data[currentIndex * 2]) {
                        swap(this.data, currentIndex, currentIndex * 2 + 1)
                        currentIndex = currentIndex * 2 + 1
                    }
                }
            }
        }
        let initArr = [1, 2, 99, 10, 12, 87]
        function HeapSort (arr) {
            // 1. 堆的数据结构 
            // 2. 不断的把传入的数组里面的值放入堆
            //    借此生成了最大堆
            //    堆顶都是最大的元素
            // 3. 调用删除 取出最大堆的值
            //    unshift放入数组的前面部分
            //    输出这个值
            let heapData = new Heap()
            let resultArr = []
            arr.forEach(item => {
                heapData.insert(item)
            })
            for (let i = 0; i < arr.length; i++) {
+                let result = heapData.extractMax()
                resultArr.unshift(result)
            }
            return resultArr
        }
        console.log(HeapSort(initArr));
```



## 3.6 heapify()

```js
1 找到数组的 最后一个非叶子节点 最后一个非叶子节点 => parseInt( (数组的长度 - 1) / 2 )
3 为什么要从最后一个非叶子节点出发 因为叶子节点都只有一个节点 都可以理解为是最大堆 因此从非叶子节点触发
  而最后一个非叶子节点 的前面所有的节点 都需要调整 
4 判断此时是向上还是向下去调整 
  是向下 为什么 因此此时堆顶的元素是有问题的 要往下挪? 是上面的元素要往下 => 调用shiftDown即可
5 heapify(arr)的时间复杂度是O(n)
heapify的性能比一个一个遍历去求时间复杂度要高很多
```

![image-20220716100853774](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220716100853774.png)







## 3.7 优先队列的概念





# 4. 归并排序

## 4.1 概念与逻辑

概念：归并排序最核心的逻辑就是，把数字先归类，每个类别里面各自排序。然后再把类别组合起来，一边组合一边排序。

时间复杂度:O(nlogn) -》一层一层进行折半操作 是logN => 每一层都要进行归并操作，是n

空间复杂度：O(n)

是不是原地排序：不是

是不是稳定排序：是稳定的

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220919094942239.png" alt="image-20220919094942239" style="zoom:50%;" />

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220919095817903.png" alt="image-20220919095817903" style="zoom:50%;" />



判断是不是稳定排序。因为如果是相等，还是把左边的元素先放进结果数组，那么相对位置还是原来的

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220919100024293.png" alt="image-20220919100024293" style="zoom:50%;" />

## 4.2 代码

为了方便阅读，我把下面的代码拆成了3段，分别是3个函数

```js
// 归并排序的思路
// 先归类 -> 每个类别里面排序 -> 再合并类别的进行排序

// 主函数
function sortArray(arr) {
    debugger
    // 1.调用_mergeSort函数
    // 返回
    _mergeSort(arr, 0, arr.length - 1)
    return arr
}
```



```js
// 分类的函数
function _mergeSort(arr, start, end) {
    debugger
    // 递归退出条件
    // 2.求mid值(分组界限)
    // 3.进行递归
    // 4.调用合并排序函数
    if (start >= end) {
        return
    }
    let mid = parseInt((start + end) / 2)
    _mergeSort(arr, start, mid)
    _mergeSort(arr, mid + 1, end)
    _merge(arr, start, mid, end)
}
```



```js
// 排序合并的函数
function _merge(arr, start, mid, end) {
    debugger
    // 5.初始化p1,p2(不同分组的指针),p(新的结果数组的指针),tempArr(新的结果数组)
    // 6.while循环判断p1和p2是否越界，没有越界，就把小的值放进结果数组，有一个越界，就要退出while循环
    // 7.判断p1小于等于mid或者p2仍旧小于等于end，有的话依次放入结果数组
    // 8.遍历结果数组 去替换原始arr数组的值
    let p1 = start,
        p2 = mid + 1,
        p = 0, // 因为结果数组每次都是空的
        tempArr = []
    while ((p1 <= mid) && (p2 <= end)) {
        // 思考，这里能否写等于号呢？
        if (arr[p1] <= arr[p2]) {
            tempArr[p++] = arr[p1++]
        } else {
            tempArr[p++] = arr[p2++]
        }
    }
    while (p1 <= mid) {
        tempArr[p++] = arr[p1++]
    }
    while (p2 <= end) {
        tempArr[p++] = arr[p2++]
    }
    for (let i = 0; i < tempArr.length; i++) {
        arr[i + start] = tempArr[i]
    }
}
let initArr = [3, 1, 6, 5, 7, 2, 9, 8]
console.log(sortArray(initArr));
```





## 4.3 归并演示

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220919100435726.png" alt="image-20220919100435726" style="zoom:50%;" />





<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220919100454884.png" alt="image-20220919100454884" style="zoom:50%;" />



# 5. 计数排序

## 1.概念

最核心的概念，就是利用数组的下标来进行排序。

1.假设有1个1,2个2,3个3，如何快速进行排序呢。

2.创建一个统计数组，统计有1个1,2个2,3个3

3.遍历统计数组，输出对应的值。假设索引为2的位置是2，代表有2个2.索引为3的位置代表有3个3



## 2.代码

```js
/* 
1.利用数组的下表来进行排序
2.适合数字范围不是很大的排序
[2,2,3,5,1,4]
[0,0,0,0,0,0]
[0,1,2,1,1,1]
[0,1,2,2,3,4,5]
3.时间复杂度 O(N+K) 空间复杂度O(N)
4.不合适小数只适合整数 不适合最小值和最大值差距过大的情况
5.不是原地排序 会有额外的空间占用
*/
function sortArray(nums) {
    // 1.求最大值
    // 2.根据最大值初始化数组1
    // 3.填充初始化数组 把nums对应的值塞到数组对应的值里面去
    // 4.然后创建结果数组2
    // 5.把数组1的值放到结果2里面去

    // 1.
    let max = nums[0]
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i]
        }
    }
    // 2.
    let newArray = new Array(max + 1).fill(0)
    // 3.
    for (let j = 0; j < nums.length; j++) {
        newArray[nums[j]]++
    }
    // 4.
    let result = []
    // 5.
    for (let m = 0; m < newArray.length; m++) {
        for (let n = 0; n < newArray[m]; n++) {
            result.push(m)
        }
    }
    return result
}
console.log(sortArray([2, 2, 3, 3, 5, 4, 1]));
```



## 3.计数排序的优化

[90, 94, 95, 95, 99]存在的问题

1.最大值是99，难道要数组长度为99？显然不合适

2.95和95之间的相对顺序可能改变

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220921092444473.png" alt="image-20220921092444473" style="zoom:50%;" />

目的：为了能够让数字很大的整数也能够排序；为了相同的数之间能够区分开次序



<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220921092502064.png" alt="image-20220921092502064" style="zoom:50%;" />

```js
/* 
    
*/
function sortArray(nums) {
    // 1.求最大值和最小值
    // 2.依据最大最小的差值 初始化数组的值
    // 3.把nums数组的值填充进去
    // 4.每个值修改为(当前值+上一个值的和)
    // 5.倒序遍历原始数组，从统计数组找到正确位置，输出到结果数组里面去

    // 1.
    let max = nums[0]
    let min = nums[0]
    // 2.
    for (let j = 0; j < nums.length; j++) {
        if (max < nums[j]) {
            max = nums[j]
        }
        if (min > nums[j]) {
            min = nums[j]
        }
    }
    let d = max - min
    let array = new Array(d + 1).fill(0)
    // 3.
    for (let i = 0; i < nums.length; i++) {
        // 尤其注意 nums[i] - min的写法
        array[nums[i] - min]++
    }
    // 4.
    for (let m = 1; m < array.length; m++) {
        array[m] += array[m - 1]
    }
    // 5.
    let sortArray = new Array(nums.length)
    for (let i = nums.length - 1; i >= 0; i--) {
        debugger
        //找到差
        let index = nums[i] - min
        //去array数组里面找到对应的值 - 1 就是最终要排序的位置
        let value = array[index] - 1
        //进行赋值
        sortArray[value] = nums[i]
        //数量要减少
        array[index]--
    }
    return sortArray

}
console.log(sortArray([94, 90, 95, 95, 99]));
```



# 6. 桶排序



## 1. 概念

把若干个元素放到桶里面去，桶里面的元素各自排序，再把元素取出来就是排序后的结果。

如何判断有几个桶？根据最大值和最小值的差 / 每个桶里面的元素个数

如何判断每个元素应该放到哪个桶？ 目标元素 - min / 每个桶里面的元素个数

![image-20220922091638915](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220922091638915.png)

## 2. 代码

```js
function bucketSort(arr, bucketSize) {
    // 1.判空
    if (arr.length === 0) {
        return
    }
    // 2.1 设置每个桶的区间范围的默认值 => 每个桶的区间范围可以是预先传入的
    let default_bucket_size = 5
    bucketSize = bucketSize | default_bucket_size
    // 2.2 求出最大值和最小值=>为了求出有多少个桶
    let min = arr[0]
    let max = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
        }
        if (min > arr[i]) {
            min = arr[i]
        }
    }
    let bucketCount = Math.floor((max - min) / bucketSize) + 1
    // 创建桶数组
    // 生成二维数组
    let array = new Array(bucketCount)
    for (let i = 0; i < bucketCount; i++) {
        array[i] = []
    }
    // 4.把arr数据放入新生成的桶里面去
    for (let i = 0; i < arr.length; i++) {
        // debugger
        array[Math.floor((arr[i] - min) / bucketSize)].push(arr[i])
    }
    arr = []
    // 5.再利用归并排序或者归并排序的优化版本对里面的每个值进行排序 
    for (let i = 0; i < array.length; i++) {
        // debugger
        mergeSort(array[i]) // 对array里面的二维数组进行排序
        for (let j = 0; j < array[i].length; j++) {
            // debugger
            // 6.内层再嵌套一层for循环把值放到arr数组里面去
            arr.push(array[i][j])
        }
    }
    return arr
}
```



**时间复杂度分析**

```diff
1. 时间复杂度：O(n) / O(nlogn)
平均情况下的时间复杂度O(n) 最坏情况下的时间复杂度O(nlogn)
平均情况：假设n个元素需要排序 分为n个桶 每个桶里面一个元素
    - 求最大值和最小值 运算量为n
    - 创建空桶 运算量为n
    - 把原始数列的元素匹配到空桶里面 运算量为n
    - 在桶的内部做排序，在元素分布相对均匀的情况下，所有桶的运算量之和为n
    - 输出排序序列 -> 原始数组 运算量为n
    最终为O(n)
最坏的情况：nlogn = nlogn[排序使用] + n = n(logn + 1) 而1可以忽略不计 就是nlogn
```



**空间复杂度分析**

 空间复杂度：O(n)，一个空的数组 -> n



**是不是稳定排序？**

​	是稳定排序。归并排序是稳定排序，而桶排序用到了归并，也是稳定排序

**是不是原地排序？**

​	不是，有借助其他数组

# 7. 插入排序

## 7.1 概念

1 核心思路：
  [2, 3, 1]此时2是有序区，3和2比较，大于2，那么有序区扩大包含2， 3；1和3比较，更小，交换，1和2比较，更小，交换，此时有序区为1,2,3
维护有序区，让无序区里面的元素和有序区的元素进行比较，整体排序完成

例子：扑克牌，抽到一张牌，如何进行比较。和前面的元素比较，如果更大，就停止插入
2 复杂度分析：

  时间复杂度：最坏情况为O(n ^ 2) 为什么？因为外层循环次数为n，内层循环次数每一轮 在最坏的情况下都是 

1 2 3 4 直到 n - 1
  空间复杂度：是O(1) 是原地排序 没有借助第三方的空间 是原地排序
3 是稳定的排序吗？

  是





## 7.2 代码

```js
function swap(arr, num1, num2) {
    let temp = arr[num1]
    arr[num1] = arr[num2]
    arr[num2] = temp
    return arr
}
function insertSort(arr) {
    // 1.判空
    // 2.第一层for 遍历arr所有元素
    // 3.第二层for 每一个元素和前面的元素进行比较
    if (arr.length < 2) {
        return arr
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j > 0; j--) {
            // 如果当前元素小于上一个元素 交换
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j)
            } else {
                // 如果当前元素大于上一个元素 就直接跳出循环
                break
            }
        }
    }
    return arr
}
let initArr = []
for (let i = 10000; i > 0; i--) {
    initArr.push(i)
}
console.time('init1')
console.log(insertSort(initArr));
console.timeEnd('init1')
```





## 7.3 优化

1 优化的思路：把交换变成 “值的覆盖” 当后一个值小于前一个值时，不是每次都进行交换

```js
function insertSort(nums) {
    for (let i = 1; i < nums.length; i++) {
        // 把当前元素记忆
        let insertValue = nums[i]
        // j是上一个元素 当前元素和上一个元素进行比较
        let j = i - 1
        for (; j >= 0; j--) {
            // 如果当前元素更小 就进行“赋值”操作
            if (insertValue < nums[j]) {
                nums[j + 1] = nums[j]
            } else {
                // “当前元素”比上一个元素大 就退出for循环比较
                break
            }
        }
        // “记忆的元素”赋值给nums[j+1]
        nums[j + 1] = insertValue
    }
    return nums
}
// console.log(insertSort([5, 2, 3, 1]));
// console.log(insertSort([-4, 0, 7, 4, 9, -5, -1, 0, -7, -1])); // 这个测试用例无法通过

// console.time('init1')
// let initArr = [3, 5, 1, 9, 4, 2, 11, 8]
// console.log(insertSort(initArr));
// console.timeEnd('init1')

// 采用赋值的形式 比直接交换 速度快了3倍
let initArr = []
for (let i = 10000; i > 0; i--) {
    initArr.push(i)
}
console.time('init1')
console.log(insertSort(initArr));
console.timeEnd('init1')
```







# 8. 选择排序

## 1.概念

```diff
    1 思路：学生站一排 排队。最矮的放第一个，余下的找到第二矮的放在第二个，以此类推

​    2 时间复杂度 O(n ^ 2) 因为两层for循环 外层的遍历次数是nums.length - 2 内层的遍历次数是num.length - 1 近乎理解为O(n ^ 2)

​    3 空间复杂度 O(1) 是原地排序 没有使用额外的数组

​    4 稳定排序 ? 不稳定，会改变 相同元素的相对顺序

​      => 区别于冒泡排序，冒泡排序如果元素相同，不会进行交换

​        => 当数组当中的元素大部分是有序时，冒泡排序的效率更高

​          => 而选择排序 无论如何，交换次数都是n - 1
```



<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220924083702837.png" style="zoom:50%;" />

## 2.代码

```diff
function selectionSort(nums) {
    // !易错点 i < nums.length - 1 为什么呢？不这样写 而 j = i + 1 可能会越界
    for (let i = 0; i < nums.length - 1; i++) {
        // 1.最小值的索引(存储)
        let minIndex = i
        // 2.查找是否有更小的元素 有的话就minIndex重新赋值
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j
            }
        }
        // 3.i和minIndex不同，说明后面有更小的元素 就交换
        if (i !== minIndex) {
            let temp = nums[i]
            nums[i] = nums[minIndex]
            nums[minIndex] = temp
        }
    }
    return nums
}
console.log(selectionSort([5, 8, 6, 3, 9, 2, 1, 7]));
```



# 9. 希尔排序



## 1. 概念

```diff
1 希尔排序
核心思路：
先对数组进行两两分组 长度 / 2
组内排序【直接插入排序 工作量非常小】；
然后再 把跨度/2，设置为2，再两两分组； 组内排序【直接插入排序 工作量非常小】；
跨度再设置为1，每个元素和前一个元素进行比较【直接插入排序 工作了依旧很小】
2 时间复杂度平均情况小于O(n ^ 2)
  最差O(n ^ 2) [2,1,5,3,7,6,9,8] => 每次组内分组时，都无法进行深度的排序
  空间复杂度O(1) 每次let temp = nums[i] 每次又都会销毁
3 不是原地排序 有用到临时变量
4 不是稳定排序 有可能影响相同元素前后的相对位置

```





## 2. 代码

```js
function shellSort(nums) {
    let d = nums.length
    while (d > 1) {
        d = Math.floor(d / 2)
        // 几次for 表示有几个分组
        for (let x = 0; x < d; x++) {
            // 分组内部比较几次
            for (let i = x + d; i < nums.length; i += d) {
                let temp = nums[i]
                let j
                // !错误写法
                // for (j = i - d; (j >= 0); j -= d) {
                //     if ((nums[j] > temp)) {
                //         nums[j + d] = nums[j]
                //     }
                // }
                // 正确写法
                // (j >= 0) && (nums[j] > temp) => 影响到j的值的变化 没有进入循环
                // d的值不会发生改变
                // 那么nums[j + d] = temp的值 其实就是自己赋值给自己(在分组内部已经是有序的情况下)
                for (j = i - d; (j >= 0) && (nums[j] > temp); j -= d) {
                    nums[j + d] = nums[j]
                }
                nums[j + d] = temp
            }
        }
    }
    return nums
}
// console.log(shellSort([5, 3, 9, 12, 6, 1, 7, 2, 4, 11, 8, 10]));
console.log(shellSort([5, 8, 6, 3, 9, 2, 1, 7]));
```



## 3. 优化

1.[2,1,5,3,7,6,9,8] => 每次组内分组时，都无法进行组内的排序 采用 增量不是互质的

2.如果每一轮的增量是互质的

```js
优化：分组每一轮的增量“互质”，而不是简单的1,2,4,
HIbbard增量：1,3，7，15 => O(n ^ 3/2)
Sedgewick增量：1,5,19 => O(n ^ 4/3)
```





# 10. 基数排序
