## 1. 回溯的理论

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



## 2. 组合问题

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





## 3. 组合问题的优化

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

path.length越小，k - path.length越大，整体就越小<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220928084536389.png" alt="image-20220928084536389" style="zoom:50%;" />





## 4. 组合总和III

**题目介绍**

给定k和n，k表示组合的个数，n表示求和的“求和数”,只能从1-9的范围里面选择求和数

每个数字最多只能使用一次

区别：1.组合问题，没有限制只能1-9，本题有限制； 2.返回的是所有组合，没有限制组合的个数；但是本题有给定； 3.本题是要求和的，组合问题是没有求和的





**代码**

```js
var combinationSum3 = function (k, n) {
    // 1.变量声明
    // 2.函数声明
    // 3.函数调用
    let res = [], // 结果数组
        path = [] // 每层循环遍历的数组
    const traverse = function (start) {
        // debugger
        let l = path.length // path数组的长度
        // path的求和 
        let sum = path.reduce((prev, cur) => prev + cur, 0)
        // 满足要求的path长度
        if (l === k) {
            // 求和也满足条件
            if (sum === n) {
                // path记得延展运算符展开
                res.push([...path])
            }
            return
        }
        for (let i = start; i <= 9 - (k - l) + 1; i++) {
            path.push(i) // 放入path里面去
            // !用的是i+1 不是start
            traverse(i + 1)
            path.pop() // 回溯
        }
    }
    traverse(1)
    return res
};
```









## 5. 电话号码

**题目解读：**

1.给定 2-9的组合字符串，比如'23'

2.'2'对应'abc'，‘3’对应'def'，那么有几种组合？[组合数是2个]

['ad', 'ae', 'af', 'bd', 'be', 'bf'，……]

3.注意1对应无效的字符



**细节：**

1.答案可以按照任何的顺序返回

2.digits.length是大于等于0，小于等于4的

3.digits[i]一定在 2-9之间





**代码：**

更喜欢这种写法

```js
function letterCombinations(digits) {
            let arr = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
            let res = []
            let s = ''
            function tracking(start) {
                debugger
                if (s.length === digits.length) {
                    res.push(s)
                    return
                }
                let temp = digits[start]
                let letters = arr[temp]
                debugger
                for (let i = 0; i < letters.length; i++) {
                    s += letters[i]
                    tracking(start + 1)
                    s = s.slice(0, s.length - 1)
                }
            }
            tracking(0)
            return res
        }
        console.log(letterCombinations('23'));
```

也可以这样写

```js
var letterCombinations = function (digits) {
    // 1.获取digits的长度 k
    let k = digits.length
    // 用于索引遍历
    const arr = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    // .判空0
    if (k === 0) {
        return []
    }
    // .如果是1，如何处置
    if (k === 1) {
        return arr[digits[0]].split('')
    }
    let res = []
    // 每一次递归的中间数组
    let path = []
    function backtracking(n, k, i) {
        // 思考为什么要取等于呢？
        // k是固定的，当i等于k意味着数组的长度取到了目标要求的长度
        if (i >= k) {
            // 把path的数组转化为字符串
            // ['a', 'b']
            res.push(path.join(''))
            return
        }
        // n是arr数组 digits是字符"23"
        for (let l of n[digits[i]]) {
            path.push(l)
            backtracking(n, k, i + 1)
            path.pop()
        }
    }
    backtracking(arr, k, 0)
    return res
};
```



这样写更加简单

```js
const letterCombinations = function (digits) {
            if (digits.length === 0) {
                return []
            }
            let res = []
            let map = {
                2: 'abc',
                3: 'def',
                4: 'ghi',
                5: 'jkl',
                6: 'mno',
                7: 'pqrs',
                8: 'tuv',
                9: 'wxyz'
            }
            const dfs = function (curStr, i) {
                // 写等于，就用digits.length
                // 写大于，就用digits.length - 1
                if (i > digits.length - 1) {
                    res.push(curStr)
                    return
                }
                // 取出来的letters就是abc def ghi
                let letters = map[digits[i]]
                // 这里的每一次for循环重新开始时就完成了回溯的
                for (const l of letters) {
                    dfs(curStr + l, i + 1)
                }
            }
            // 初始的curStr就是空字符串
            dfs('', 0)
            return res
        }
        console.log(letterCombinations('23'));
```



**作图**

通过分析下面两幅图，可以得出，backtracking传过去的值，到底写，start还是i了，i有可能达到2，而digits[2]是没有值的

![image-20221005080206508](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221005080206508.png)

![image-20221005080222662](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221005080222662.png)

## 6. 组合总和

**题目介绍**

1.给定**candidate**数组 [1,2,3,4] 找到组合，求和为**target**的值,比如是4

2.组合的值可以是 [1,1,2] [1,1,1,1], [2,2], [1,3],[4]

3.组合与组合之间是不能够重复的



**细节：**

1.组合candidate里面没有元素重复

2.组合里面的元素可以重复[1,1,1,1]

3.组合与组合之间不能一致 [1,3]和[3,1]是重复的

4.组合的数量少于150个

5.1<=candidate[i] <= 200 ; 1<=target <= 500; 1 <=candidate <=30





**代码**

```js

const combinationSum = function (candidates, target) {
    //1.
    let path = []
    let res = []
   
    function tracking(sum, startIndex) {
        // 3.
        if (sum >= target) {
            if (sum === target) {
                res.push([...path])
            }
            return
        }
        //4.
        for (let i = startIndex; i < candidates.length && sum + candidates[i] <= target; i++) {
   			//5.
            sum += candidates[i]
            path.push(candidates[i])
			//6.
            tracking(sum, i)
            //7.
            sum -= candidates[i]
            path.pop()
        }
    }
    //2.
    tracking(0, 0)
    return res
};
console.log(combinationSum([2, 3, 6, 7], 7));
```



**非剪枝版本**

![image-20221004102422315](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221004102422315.png)

**剪枝版本**

我们可以看到，上面，即便判断出了sum值大于target的值，依然会进行到下一波的循环->递归，要舍弃这个

![image-20221004102350333](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221004102350333.png)







## 7. 组合总和II

这里的used的数组 感觉很困惑 很疑惑 

```js
// 这题和上一题的最大区别在哪里呢？
// 区别1 注意看测试用例，candidates里面的值可能是重复的
// 区别2 每个数字 在每个组合只能被使用一次 candidates[1,1,2] 里面的每个1只能被拿1次
// 相同1 [1, 1, 6]是可以被允许的
// 做法：仅仅通过排序 candidates + tracking[i+1]并不能起到去重 出现res里面有 [[1,6], [1,6]]的情况
// 正因为candidates[1,1,6,7]开头两个1 才会出现两个 [1,7]的情况 如何排除？

const combinationSum2 = function (candidates, target) {
    // debugger
    //1.
    let path = []
    let res = []
    let used = new Array(candidates.length).fill(0)

    candidates = candidates.sort((a, b) => a - b)
    function tracking(sum, startIndex, used) {
        debugger
        // 3.
        if (sum >= target) {
            if (sum === target) {
                res.push([...path])
            }
            return
        }
        //4.
        // 问题1：直接跳出for循环，为什么会出现这个问题？第一个元素10已经大于 target
        // 只要sum + candidates[i] >target就跳出循环吗？上题这么写能成功，刚好是，测试用例，是有序的，
        for (let i = startIndex; i < candidates.length && sum + candidates[i] <= target; i++) {
            debugger
            if (i > 0 && candidates[i] === candidates[i - 1] && used[i - 1] === false) {
                continue
            }
            //5.
            sum += candidates[i]
            path.push(candidates[i])
            used[i] = true
            //6.
            tracking(sum, i + 1, used)
            //7.
            sum -= candidates[i]
            path.pop()
            used[i] = false
        }
    }
    //2.
    tracking(0, 0, used)
    return res
};
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
```



如下图所示，解释了used数组的作用

![image-20221007083753626](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221007083753626.png)

![image-20221007083804801](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221007083804801.png)





**另一种去重的方式**同样必须每一层都有一个set

set和used数组的本质区别是，used数组是标识，这个数组是否使用过，set记录的就是这个真真切切的值，用过，就不能再用。所以set，如果不`每一次层都有一个`，那么`树枝`上面都无法出现重复的。[1,1,2]这样都不行

```diff
const combinationSum2 = function (candidates, target) {
    let path = []
    let res = []
    // 如果这里初始化为0 那么下面的 判断重复时，里面也要增加为used[i] =false
    // 要进行排序，为什么？否则 [10, 1, 2, 7, 6, 1, 5] 直接第一个reutrn
    candidates = candidates.sort((a, b) => a - b)
    function tracking(sum, startIndex, used) {
        // 3.
        if (sum >= target) {
            if (sum === target) {
                res.push([...path])
            }
            return
        }
+        const helperSet = new Set();
        for (let i = startIndex; i < candidates.length && sum + candidates[i] <= target; i++) {
            // 
+            if (helperSet.has(candidates[i])) continue
+            helperSet.add(candidates[i])
            //5.
            sum += candidates[i]
            path.push(candidates[i])
            //6.
            tracking(sum, i + 1, used)
            //7.
            sum -= candidates[i]
            path.pop()
        }
    }
    tracking(0, 0)
    return res
};
console.log(combinationSum2([2, 2, 2], 2));
```



## 8. 分割回文字符串



### **什么时候需要startIndex?**

- 如果多个集合，求组合，集合之间互不干扰的，就不需要startIndex
- 如果是一个集合，求组合，是相互干扰的，就需要startIndex
- startIndex是分割的关键 截取字符串`substr(startIndex, i - startIndex + 1)`, 为什么是startIndex，为什么是 i - startIndex + 1。假设截取 'aab'里面的'aa'，startIndex就是0，i就是1,1 - 0 + 1就是2。而通过递归 i + 1来改变startIndex的值，来继续截取



**和组合总和II的区别是什么？**

1.[1,1,6,7]是求组合，1,6,7是一种组合，不能够出重复组合数，但是两个1都可以拿一次 1,1,6是开业的

2.分割回文串：是字符串；字符串的分割类型不同，这个和上面一致，多种组合；字符串分割必须有顺序，依靠的

```js
1.s 分割成子串 每个子串都是回文串(正着读和反着读都是一样的字符串)
2.测试用例：一个字符也叫作回文串 + 一定是连续的不能是随机组合的
3.字符串的长度小于16 
4.进一步发现理解错误 是拆分为子串，拆分后的所有子串都要是回文才行
'aab'
['a', 'ab']这样是错的
['a', 'a', 'b']这样是可以的
['aa', 'b']这样是可以的


function isPalindrome(str, start, end) {
    // 两个指针 开始和结尾指针 相继往中间靠拢 如果说碰到的值不一致就false否则true
    for (let i = start, j = end; i < j; i++, j--) {
        if (str[i] !== str[j]) {
            return false
        }
    }
    return true
}
// console.log(isPalindrome('abb', 0, 2));
var partition = function (s) {
    // 递归退出条件
    // 分割子串
    // 判断回文
    let res = []
    let path = []
    function tracking(s, startIndex) {
        // 递归退出条件
        if (path.length >= s.length) {
            if (path.length === s.length) {
                // 放入结果数组 是回文才走的进来
                res.push([...path])
                return
            }
        }
        // startIndex就是子串的分割线 因为递归 i + 1进来就是startIndex
        for (let i = startIndex; i < s.length; i++) {
            if (isPalindrome(s, startIndex, i)) {
                // startIndex等于0时，i等于1时，1 - 0 + 1 = 2 那么截取的就是 (0,2)不包括2
                let str = s.substr(startIndex, i - startIndex + 1)
                // 截取的一部分子串
                path.push(str)
            } else {
                // 不是回文 直接continue i会越界 此种情况就不符合了
                continue
            }
            // 递归点 来把子串集合在一起 ['a', 'a', 'b']就是这样集合在一起的
            tracking(s, i + 1)
            path.pop() // 回溯 至关重要 
        }

    }
    // startIndex初始值是0
    tracking(s, 0)
    return res
};
```



![image-20221010075617932](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221010075617932.png)



本题的难点：

1.想到用回溯，可是到底如何去切割字符串呢？不知道从何下手

2.如何模拟切割线呢？

3.切割后，如何继续切割下面的字符串呢？

4.如何停止切割呢？

5.如何判断是回文呢？

**总结难点，也是一种能力**





判断回文，有值得优化的地方

```js
void computePalindrome(const string& s) {
    // isPalindrome[i][j] 代表 s[i:j](双边包括)是否是回文字串 
    isPalindrome.resize(s.size(), vector<bool>(s.size(), false)); // 根据字符串s, 刷新布尔矩阵的大小
    for (int i = s.size() - 1; i >= 0; i--) { 
        // 需要倒序计算, 保证在i行时, i+1行已经计算好了
        for (int j = i; j < s.size(); j++) {
            if (j == i) {isPalindrome[i][j] = true;}
            else if (j - i == 1) {isPalindrome[i][j] = (s[i] == s[j]);}
            else {isPalindrome[i][j] = (s[i] == s[j] && isPalindrome[i+1][j-1]);}
        }
    }
}
```





## 9. 复原ip地址

如何用几句话是概括思路？

1.需要用到递归与回溯

2.需要一个中间数组比如path和一个结果数组res，符合条件的才放到res数组里面去

3.比如551、2222和01这样的情况排除 要记得break，然后截取str放到path数组里面去；如果path数组长度为4并且i等于字符串的长度就放到res数组

4.递归点，传入的变量是j+1；

```js
// 时间复杂度:O(3^(ip地址的段数) * |s|) |s|表示字符串的长度 3^ip地址的段数(每一位不会超过3，每一段最多深入到3层)
// 空间复杂度：O(n)
function restoreIpAddresses(s) {
    // 1.创建结果变量和path变量
    // 2.递归数组中
    // 2.1 退出条件
    // 2.2 成功进入结果数组的条件
    // 2.3 遍历时 注意j = 1
    // 2.4 注意如何截取字符串呢？
    // 2.5 注意判断字符是否是超过255的
    // 2.6 注意判断字符是否是012这样的呢？
    // 3.递归，注意传入的是j+1
    // 4.回溯
    function backtracking(i) {
        /* 
            易错点：
            1. 写成了 i > 4 一定是path数组的长度大于4就return而不是i，i表示的是什么呢？是在s字符串上面的指针，下面同理
            2. 和 i === 4 && i === s.length
            为什么一定是 i===s.length呢？表示所有字符都切割完毕
            i===4表示有4个子串
        */
        let len = path.length
        if (len > 4) return
        if (len === 4 && i === s.length) {
            // 注意分隔符是.
            // ['255', '255', '11', '135']符合上面的条件
            // ['2', '5', '5', '2', '5']不符合

            res.push(path.join('.'))
        }
        /* 
            易错点：
            1. 为什么一定是j === i呢？递归 j+1传进来，就是给到i，从i开始遍历，防止重复遍历
            2. str.length > 3 || +str>255 意思是ip地址必须是3位或者是大小如果超过了255，就要break 跳出这一层循环 回到上一层递归
            3. 如果是 '01' 这样的也要跳出循环 但是 '0'这样的就没关系
        */
        for (let j = i; j < s.length; j++) {
            let str = s.slice(i, j + 1)
            // ['2', '5', '5', '551'] 这种情况 551 就会直接走break 或者是2221长度大于3
            if (str.length > 3 || +str > 255) {
                break
            }
            // ['2', '5', '5', '01']如果是0开头并且0后面还有数字 就会直接break
            if (str[0] === '0' && str.length > 1) {
                break
            }
            path.push(str)
            backtracking(j + 1)
            path.pop()
        }
    }
    const res = []
    const path = []
    backtracking(0)
    return res
}
console.log(restoreIpAddresses('25525511135'));
```



![image-20221014081512392](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014081512392.png)





## 10. 子集问题

比较之前的题目：

1.组合问题：给定 n和k，返回 1到n的数中，k个数的可能性。比如给n = 8， k = 2；那么要返回的是 1到8的数字中，所有两个数的组合。但是子集问题，返回的是所有可能，1位数，2位数，3位数，空的。每个数字也是只能用1次

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014084607707.png" alt="image-20221014084607707" style="zoom:50%;" />

2.组合总和III：1到9的数字，n是求和项；**每个数字只能用1次**。返回1到9中，个数为k的，求和为7的所有的组合。

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014084533079.png" alt="image-20221014084533079" style="zoom:50%;" />

3.组合总和：给定了一个组合，求目标值，组合里面的每个数字可以无限的提取。

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014084735994.png" alt="image-20221014084735994" style="zoom:50%;" />

4.**组合总和II**：给定组合，求目标值，每个数字只能使用1次。组合总和与组合总和II都是，个数是随机的。组合总和III，个数是给定的。

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014084859083.png" alt="image-20221014084859083" style="zoom:50%;" />





5.再看**子集**问题：返回一个数组里面的，所有可能的子集

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014084953446.png" alt="image-20221014084953446" style="zoom:50%;" />



回溯解法：

1.为了避免重复，j要从i开始，每次递归的时候，i都会++

2.可以没有终止条件，因为每次for循环时 已经判断 i < len了，如果超过了len，无法进入for循环的

3.如果抽象为树结构，那么组合问题，分割问题都是求叶子节点；但是子集问题求的是，所有的节点

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221015081708479.png" alt="image-20221015081708479" style="zoom:50%;" />

```js
var subsets = function (nums) {
    let res = []
    let path = []
    let len = nums.length
    backtracking(0)
    return res
    function backtracking(i) {
        // 递归退出点 只要没有大于nums的长度 都可以放进res
        // [1] [1, 2] [1, 2, 3] [2, 3] [3] [2]

        if (i <= len) {
            // 记得是解构放进res数组
            res.push([...path])
        } else {
            // 没有这个终止条件也是ok的
            return
        }
        // for循环遍历的条件
        for (let j = i; j < len; j++) {
            path.push(nums[j])
            // j+1注意 这样能够避免重复
            backtracking(j + 1)
            path.pop()
        }
    }
};
console.log(subsets([1, 2, 3]));
```







**JS的位移运算符：**

```js
>>
右移运算符
1000 >> 8 就是把二进制的数整体往右边移动8位，多出的位数，舍弃
其实也是相当于 1000 / (2 ^ 8) = 1000 / 256 = 3

<<
左移运算符
5 << 2  二进制的数整体往左边移动2位，多出的位数，舍弃
相当于 5 * (2 ^ 2) = 20
```





## 11. 子集问题II

![image-20221017092435165](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221017092435165.png)

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221027084509809.png" alt="image-20221027084509809" style="zoom:50%;" />

上面这幅图，是子集II的去重的过程。关键还是 i > 0 && nums[i] === nums[i - 1]这个判断条件。并且关键的是，`要排序`

**没有排序，结果如下,子集重复了**

![image-20221027085138689](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221027085138689.png)

```js
// 读题：
        // 1. 和子集II的区别是：给定的集合里面可能包含重复的元素
        // 2. 既然包含重复的元素，意味着选出的集合可能是有重复的
        // 3. 要进行集合的去重
        // [1, 2, 2]集合，那么可能同时选出[1, 2]和[1, 2]两个集合，就要去重


        // 如何去重是关键：
        // 1.必须排序数组
        // 2.必须要使用used数组 然后回溯时 used数组也要归类为false
        //   如果前后数字相同，前一个数组表示true，那么后一个数字可以使用；如果前一个数组表示false 后一个数字不能使用 这个是一种规则
        var subsetsWithDup = function (nums) {
            debugger
            let res = []
            let path = []
            let len = nums.length
            // used数组
            let used = new Array(nums.length).fill(0)
            // 排序数组
            nums = nums.sort((a, b) => a - b)
            backtracking(0)
            return res
            function backtracking(i) {
                res.push([...path])
                for (let j = i; j < len; j++) {
                    if (j > 0 && nums[j] === nums[j - 1] && used[j - 1] === false) {
                        continue
                    }
                    used[j] = true
                    path.push(nums[j])
                    backtracking(j + 1)
                    used[j] = false
                    path.pop()
                }
            }
        };
        console.log(subsetsWithDup([1, 2, 2]));
```



![image-20221017092040569](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221017092040569.png)





**不太理解，如果说，全局共用一个set或者map或者数组，这种写法是错误的，这是为什么呢？**

```diff
var subsetsWithDup = function (nums) {
    debugger
    let res = []
    let path = []
    let len = nums.length
    // used数组
    let used = new Array(nums.length).fill(0)
    // 排序数组
    nums = nums.sort((a, b) => a - b)
    backtracking(0)
+ 	如果set写在这里 - 全局 {1, 2} 而 {1, 2, 2} 这样的结果是无法出现的,因为前面有一个2了。所以set必须每层递归都是新的
    return res
    function backtracking(i) {
        debugger
        res.push([...path])
+        let helpSet = new Set()
        for (let j = i; j < len; j++) {
+            if (helpSet.has(nums[j])) continue
+            helpSet.add(nums[j])
            path.push(nums[j])
            backtracking(j + 1)
            path.pop()
        }
    }
};
```

和used数组的区别是什么呢？used

```diff
var subsetsWithDup = function (nums) {
    debugger
    let res = []
    let path = []
    let len = nums.length
    // used数组
+    let used = new Array(nums.length).fill(0)
    // 排序数组
    nums = nums.sort((a, b) => a - b)
    backtracking(0)
    return res
    function backtracking(i) {
        debugger
        res.push([...path])
        
+        for (let j = i; j < len; j++) { 
+注意used数组这里判断的是 前后是否相等+前一位数是否是false
+            if (j > 0 && nums[j] === nums[j - 1] && used[j - 1] === false) {
                continue
            }
            // 这里写大于startIndex也是OK的
            // if (j > i && nums[j] === nums[j - 1] && used[j - 1] === false) {
            //     // continue
            //     debugger
            // }
+既有修改也有回溯而set每一层控制，不需要回溯
+            used[j] = true
            path.push(nums[j])
            backtracking(j + 1)
+            used[j] = false
            path.pop()
        }
    }
};
console.log(subsetsWithDup([1, 2, 2]));
```







## 12. 递增子序列

**比较区别：**



**子集II**

1.可以有空的集合。

2.集合可以只有一个元素

3.集合可以是没有顺序的

4.但是子集之间不能重复

![image-20221018085026046](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221018085026046.png)







**子集I**

1.和子集II的区别是，子集I里面的nums数组里面的数字没有重复的,其他都一致。

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221018085216532.png" alt="image-20221018085216532" style="zoom: 50%;" />



**递增子序列的特点：**

1.子集必须是递增的，但是你`不能对nums数组进行排序`。就得按照原有的顺序进行查找

2.nums数组里面可能有重复的元素，所以要去重，因为不能排序，不能用之前的去重的逻辑

3.子集数量必须大于等于2



![image-20221027084909038](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221027084909038.png)





**代码**

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221027084703907.png" alt="image-20221027084703907" style="zoom:50%;" />

```js
var findSubsequences = function (nums) {
/**
读题：
    1.子集必须是递增的，但是你不能对nums数组进行排序。就得按照原有的顺序进行查找
    2.nums数组里面可能有重复的元素，所以要去重
    3.子集length必须大于等于2
    4.注意，相等的元素，该被当作是递增的
 */
    let res = []
    let path = []
    let used = new Array(nums.length).fill(0)
    function backtracking(startIndex) {
        debugger
        // 子集length必须大于等于2
        if (path.length >= 2) {
            res.push([...path])
        }
        // 如何去重是难点 使用uset
        let uset = []
        for (let j = startIndex; j < nums.length; j++) {
            debugger
            // 前半部分判断path必须有值且子集必须是递增的，但是你不能对nums数组进行排序。就得按照原有的顺序进行查找
            // 后半部分判断是否是重复的元素，如果是uset里面有的就是重复的(注意，一定是比较同级，若不是同一个分支)

            // 为什么不能使用原来的那种去重的方式呢？
            if ((path.length > 0 && nums[j] < path[path.length - 1]) || uset[nums[j] + 100]) {
                debugger
                continue
            }
            // +100的原因是 num[j]的大小就是在100之间的
            uset[nums[j] + 100] = true
            path.push(nums[j])
            backtracking(j + 1)
            // uset分支不需要回溯 因为每一层递归都会重新声明新的uset
            path.pop()
        }
    }
    backtracking(0)
    return res
};
// console.log(findSubsequences([4, 4, 3, 2, 5, 5]));
console.log(findSubsequences([4, 7, 6, 7]));
```





**去重的情况**

下图红线部分就是重复的情况

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221019083819187.png" alt="image-20221019083819187" style="zoom:50%;" />

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221019083732348.png" alt="image-20221019083732348" style="zoom:50%;" />

上图，就是重复的情况





之前的去重的方式，是整体只有一个used数组，每次used回溯时，都要对used数组同样的进行回溯的操作。但是，之前的回溯，组合总和II：

1. 必须排序
2. 既然排序，那么重复的元素就会前后挨着了。我们就可以利用`used[i - 1] === used[i] && used[i - 1] === false`这个条件进行判断



本题使用的去重的方式是，**在每一层递归，都声明一个used数组：**

1. 不需要每一层递归，都去对uset数组进行修改为false。每一层的used是自己管自己的
2. 因为题目给出了nums[i] 在-100到100之间，所以可以使用数组来存储。毕竟值不是特别大，效率比map更高，是的，效果测起来会好一些。因为，map会去做key到value的哈希映射，效率会有损耗





## 13. 全排列

**读题：**

1. [1,2,3] 内容不重复 其中 -10 <= nums[i] <= 10  1 <= nums.length <= 6
   回所有可能的排列的组合 [1,2,3] [1,3,2] [2, 1, 3], [2, 3, 1]

**算法：**

1. [1,2]和[2,1]是不同的排列顺序，之前都是算做一个组合。所以这里**不需要用到startIndex**,如果有startIndex,出现不了[1,2] 和 [2,1]
2. 要使用一个**used**数组，能够记录，哪个数字使用过了 就用 “**continue**” 注意是continue而不是return或者是break
3. 如何退出呢？当path数组的长度等于nums数组的长度就退出



```js
var permute = function (nums) {
    debugger
    let res = []
    let path = []
    let used = new Array(nums.length).fill(0)
    function backtracking(nums, used) {
        debugger
        if (path.length === nums.length) {
            res.push([...path])
        }
        for (let i = 0; i < nums.length; i++) {
            debugger
            if (used[i]) continue
            used[i] = true
            path.push(nums[i])
            backtracking(nums, used)
            used[i] = false
            path.pop()
        }
    }
    backtracking(nums, used)
    return res
};
console.log(permute([1, 2, 3]));
```







![image-20221020090837828](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221020090837828.png)





## 14. 全排列II

**去重的关键两步**

1. res里面有了[[1,1,2], [1,2,1]]，如果又再次生成了[1,1,2]又放进去了 这样就会重复，我们要在“考虑nums[1,1,2]“的索引为0的1要不要放进去时，就要决定好，放进去，就会重复。这里可以用 used[i]如果是true就不放进去

2. 如果是[1,1,2]如果是第二个1放进去的时候，我就可以考虑，nums[i] === nums[i - 1] 并且nums[i - 1]是false，如果是false，表示之前回溯过了，就用过了，就不要用了(姑且这么理解)



```js
// 1. 第一步 数组一定要排序
// 2. 声明好result 和 path
// 3. 写递归逻辑
// 3.1 递归退出条件 -> 如果path的长度和nums的长度一致 就放进result结果数组 然后return
// 3.2 for循环 初始值从0，而不是startIndex开始，为什么，因为[1,1,2]和[1,2,1]是算作不同的排列顺序 有startIndex就不能 这样做
// 3.3 退出条件 -> i > 0 大于0的原因是 nums[i - 1]i如果是0就出问题了 && i === 0时，我们会去单独处理 -> 用的是continue而不是break 注意
// 注意 used[i - 1] 是false
// 3.4 !used[i]表示如果是 used[i]是true，就不能进入，这个是给同一个树枝上面的去重处理
// 3.5 接下来就是 used[i]改为true path.push(nums[i]) + 回溯 used[i]改为false 和 path.pop
var permuteUnique = function (nums) {
    // 1.
    nums.sort((a, b) => {
        return a - b
    })
    // 2. 
    let res = []
    let path = []
    function backtracking(used) {
        // 3.1
        if (path.length === nums.length) {
            res.push([...path])
            return res
        }
        // 3.2 
        for (let i = 0; i < nums.length; i++) {
            // 3.3 
            if (i > 0 && nums[i] === nums[i - 1] && used[i - 1] === false) {
                continue
            }
            // 3.4
            if (!used[i]) {
                // 3.5
                used[i] = true
                path.push(nums[i])
                backtracking(used)
                used[i] = false
                path.pop()
            }
        }
    }

    backtracking([])
    return res
}
console.log(permuteUnique([1, 1, 2]));
```





**去重的另一种方式**

1. 树层上面去重，是used[i - 1] = false 

2. 树枝上面去重，是used[i - 1] = true

**树枝上面去重和树层上面去重，都是可以的，为什么呢？**



**used[i - 1] = false**，都是因为**used[false, false, false]**,且符合了`i > 0 && nums[i] === nums[i - 1] && !used[i - 1]`的条件

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221028085612442.png" alt="image-20221028085612442" style="zoom:50%;" />



**used[i - 1] = true**

![image-20221028090534556](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221028090534556.png)

```diff
var permuteUnique = function (nums) {
    // used[i - 1] === true 实在是效率太低了 树层去重 所以不推荐 很难理解
    debugger
    nums.sort((a, b) => {
        return a - b
    })
    let result = []
    let path = []
    function backtracing(used) {
        debugger
        if (path.length === nums.length) {
            result.push([...path])
            return
        }
        for (let i = 0; i < nums.length; i++) {
        // 很大的区别在这里 used[i - 1] === true 
+            if (i > 0 && nums[i] === nums[i - 1] && used[i - 1] === true) {
                continue
            }
            if (!used[i]) {
                used[i] = true
                path.push(nums[i])
                backtracing(used)
                path.pop()
                used[i] = false
            }
        }
    }
    backtracing([])
    return result
}
```











## 时间复杂度小结

子集问题：

- 时间复杂度：O(n* 2^n)，每个元素状态取或者不取就是O(2^n)，而构造每一个子集都需要填进数组，O(n)
- 空间复杂度：O(n),递归的深度是n,path和res数组都是一次声明。组合问题和排序问题都一致



排序问题：

- 时间复杂度：每一层的节点都是n，第二层，每一个分支都延伸了n-1个节点，再往下是n-2个分支，一直到叶子结点是n * n - 1 * n - 2 * n - 3……1 = n!，放到数组里面又是 n * n!
- 空间: O(n)



组合问题：

- 时间复杂度：O(n*2^n)
- 空间：O(n)





## **去重问题的另外一种写法：**

1. 子集II 全排列II 和 组合问题II都可以使用set去重

2. 使用set去重，set去重必须在每一层都要有一个set，而不是在全局下面有一个set（全局下面有set，导致最终只有一个排列结果）
3. 特别好的测试方法：debugger时，结合树枝图，来判断此时处于哪一个阶段，不需要去特别记忆，i = 0，这些。

只需要知道，i = 0还是i = startIndex即可。知道去重条件即可





**set去重和used去重性能分析：**

1. set去重，时间复杂度更高，频繁的执行insert方法，还有哈希映射(把key  -> 通过 哈希函数 -> 唯一的哈希值) | used数组在时间复杂度上面没有负担

2. set空间利用，是O(n^2)，n层递归，每层都有一个哈希 | used数组，全局数组，就是O(n)





## 15. 重新安排行程

-> 理清了部分思路，死循环问题 + 字典映射问题是两个难关

-> 哈希 map和set搞清楚 



1.如果，递归时，搜索其中一条符合条件的值，那么递归一定需要返回值。搜索到了就return

2.如果递归不用处理返回值，递归函数就不需要返回值





![image-20221029150635463](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221029150635463.png)
