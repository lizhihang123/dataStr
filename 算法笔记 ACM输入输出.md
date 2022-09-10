## 题1

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220908195417076.png" alt="image-20220908195417076" style="zoom:50%;" />

```diff
while (line = readline()) {
    const input = line.split(' ')
    const a = parseInt(input[0])
    const b = parseInt(input[1])
    function add (a, b) {
        return a + b
    }
    console.log(add(a, b))
}
```







## 题2

第一个2表示，要求多少次 a + b



<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220908195336156.png" alt="image-20220908195336156" style="zoom:50%;" />

```diff
let num = readline()
while (num > 0) {
    const input = readline().split(' ')
    const a = parseInt(input[0])
    const b = parseInt(input[1])
    console.log(a + b)
    num--
}
```





## 题3

如果结果是0，就停止输入

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220908195710947.png" alt="image-20220908195710947" style="zoom:50%;" />

```diff
while (line = readline()) {
    let input = line.split(' ')
    let a = parseInt(input[0])
    let b = parseInt(input[1])
    let sum = a + b
    if (sum === 0) {
        break
    }
    console.log(sum)
}
```





## 题4



<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220909091149225.png" alt="image-20220909091149225" style="zoom:50%;" />

https://ac.nowcoder.com/acm/contest/5657/D

出错

```diff
while (line = readline()) {
	// 读取 map转化数组里面的每一个数为整数
    let arr = line.split(' ').map(Number)
    // 第一个数如果是0 就return
    if (arr[0] === 0) {
        break
    }
    // 第一个数不要参与求和 然后利用reduce进行求和
    print(arr.slice(1).reduce((s, v) => s + v, 0))
}
```





## 题5

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220909092126355.png" alt="image-20220909092126355" style="zoom:50%;" />

这样写ok

```diff
let t = readline() // 有line行数据
while (lines = readline()) {
    let arr = lines.split(' ').map(Number)
    // let num = arr[0]
    console.log(arr.slice(1).reduce((s, v) => s + v, 0))
}
```

这样写也可以

```diff
let lines = readline() // 有line行数据
while (lines > 0) {
    let arr = readline().split(' ').map(Number)
    // let num = arr[0]
    console.log(arr.slice(1).reduce((s, v) => s + v, 0))
    lines--
}

```





## 题6



print和console.log的区别是什么？

- console.log输出 最后会加回车
- print后面不会加回车
- 两个，()里面都可以加逗号分隔开来





字符串排序



```diff
const n = parseInt(readline())
const arr = readline().split(' ')

function sortArr (arr) {
	// a[0].charCodeAt() - b[0].charCodeAt()的意思就是 排序的两个是字符串，比较谁的 ASCLL码更大，就把谁放在前面
    return arr.sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt()).join(' ')
}

print(sortArr(arr))
```





## 题7





![image-20220909094418927](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220909094418927.png)



```
function sortArray(arr) {
    return arr.sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt()).join(' ')
}
while (line = readline()) {
    // 1. 读一行 排序
    const arr = line.split(' ')
    console.log(sortArray(arr))
}
```





## Nodejs 输入输出

输出还是用 print和console.log



### 单行输入输出

```js
var readline = require('readline');
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function(data) {
    // 获取输入
    var inputs = data.trim().split(' ');

    // 处理
    var result = deal(inputs);

    // 输出结果
    console.log(result);
});
```



### 多行输入，组数确定

```js
var readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var K = 1; // 输入K行（这里说一组有几行就是几）
var inputs = [];
rl.on('line', function(data) {
    // 获取输入
    inputs.push(data.trim());
    if (K == inputs.length) { //
        // 处理
        var result = deal(inputs);

        // 输出结果
        console.log(result);
        // 清0
        inputs.length = 0;

    }
});

/**
 * [deal description]
 * @param  {[type]} inputs [description]
 * @return {[type]}        [description]
 */
function deal(inputs) {
    var result = '';

    // dosomething
    return result;
}
```





### 行数不确定

```js
var readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var inputs = [];
var num = 0;
rl.on('line', function(data) {
    if(num == 0){
        num = Number(data.trim());
    } else {
        inputs.push(data.trim());
        if (num == inputs.length) {
            // 处理
            var result = deal(inputs);

            // 输出结果
            console.log(result);

            // 清0
            inputs.length = 0;  //不可改动
            num = 0;    //不可改动
        }
    }
});

/**
 * [deal description]
 * @param  {[type]} inputs [description]
 * @return {[type]}        [description]
 */
function deal(inputs) {
    var result = '';
    // dosomething
    return result;
}
```

