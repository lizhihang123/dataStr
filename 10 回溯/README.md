## 1.回溯的理论

回溯是递归的副产品，只要有递归就会有回溯



**回溯算法的效率**

虽然回溯算法很难，但是回溯算法的效率并不高。回溯算法的本质就是穷举所有的可能性，尽管可以通过剪枝稍微优化一下



**为什么要用回溯**

因为有些问题(组合 切割 子集 排列 棋盘)可以解决问题，





**组合和排序的区别**

组合不管顺序是否相同，{1,2} 和 {2,1}都是一样的

排序，{1, 2}和{2, 1}是不一样的





**回溯和树**

任何问题，都可以抽象为树形结构，所有回溯法的问题都可以抽象为树形结构。

=> 回溯法是在集合中递归查找子集，集合的大小就是树的宽度，递归的深度就是树的深度

=> 递归有终止条件，所以必然是一棵高度有限的树



**回溯法的模板**

1.回溯函数返回值和参数

返回值是任意的

参数一般是边写逻辑边确定下来

2.终止条件

一般到达了叶子节点，一层递归就结束了，该层递归就放到叶子节点里面去，再return跳出当前递归

3.递归

for循环外层 -> 多少个孩子就遍历多少次 横向遍历

内层的递归 -> 就是遍历的深度 就是树的深度



## 2.组合问题

```diff
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
```



我原来的思路就是**暴力的去解**，但是只会嵌套越来越多的层级

```js
function combine(m, k) {
    let n = 0
    let result = []
    let arr = []
    for (let i = 1; i <= m; i++) {
        arr.push(i)
    }
    console.log(arr);
    // 这个结果老是输入出来不对哇
    for (i = 0; i < m; i++) {
        for (let j = i + 1; j < m; j++) {
            for (let u = j + 1; u < m; u++) {
                result.push([arr[i], arr[j], arr[u]])
            }
        }
    }
    return result
}
console.log(combine(4, 3));
```



```js
let result = []
let path = []
function combine(n, k) {
    backtracking(n, k, 1)
    return result
}
function backtracking(n, k, startIndex) {
    debugger
    // 退出条件
    // 当path的长度和k的长度一致时，说明path遍历到了叶子节点
    // 先把path放入结果数组 再return
    if (path.length === k) {
        // result.push(path) // 这样写是错的 使用的是浅拷贝 地址拷贝过去了 一改全改了
        result.push([...path])
        return
    }
    // 正式内容
    // 是i <= n 而不是 i < n
    for (let i = startIndex; i <= n; i++) {
        path.push(i) // 处理节点 
        backtracking(n, k, i + 1)// 递归
        path.pop() // 回溯 撤销对递归的处理
    }
}
console.log(combine(4, 3));
```

![image-20220926094229837](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220926094229837.png)





## 3.组合问题的优化

需要把下面的条件从 i <= n 改为 i <= n - (k - path.length) + 1就可以完成剪枝

```diff
let result = []
let path = []
function combine(n, k) {
    backtracking(n, k, 1)
    return result
}
function backtracking(n, k, startIndex) {
    debugger
    // 退出条件
    // 当path的长度和k的长度一致时，说明path遍历到了叶子节点
    // 先把path放入结果数组 再return
    if (path.length === k) {
        // result.push(path) // 这样写是错的 使用的是浅拷贝 地址拷贝过去了 一改全改了
        result.push([...path])
        return
    }
    // 正式内容
    // 是i <= n 而不是 i < n
+    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
        path.push(i) // 处理节点 
        backtracking(n, k, i + 1)// 递归
        path.pop() // 回溯 撤销对递归的处理
    }
}
console.log(combine(4, 3));
```



<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220928084552229.png" alt="image-20220928084552229" style="zoom:50%;" />

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220928084610718.png" alt="image-20220928084610718" style="zoom:50%;" />



如上图所示，当 n = 4, k = 3时，剪枝可以剪掉上面的红色部分

下面是代码运行时的过程，然后红色框是剪枝剪掉的部分

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220928084536389.png" alt="image-20220928084536389" style="zoom:50%;" />