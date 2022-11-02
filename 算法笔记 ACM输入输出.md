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



请注意，有的是 readline(),有的是 read_line()





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

### ACM模式：

需要自己构建输入和输出

输出还是用 print和console.log



### 1.单行输入输出

```js
var readline = require('readline');
// 获取读取的参数
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// 调用r1参数的on方法
rl.on('line', function(data) {
    // 获取输入
    var inputs = data.trim().split(' ');
    // 处理
    var result = deal(inputs);
    // 输出结果
    console.log(result);
});
```





### 2.多行输入，组数确定

```js
var readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var K = 4; // 输入K行（这里说一组有几行就是几）
var inputs = [];
rl.on('line', function(data) {
    // 获取输入
    // 注意 如果有很多行 这里会执行很多次 -> 那么 inputs的长度是会累加的
    inputs.push(data.trim());
    if (K == inputs.length) { //
        // 处理
        var result = deal(inputs);

        // 输出结果
        console.log(result);
        // 清0
        inputs.length = 0;
        
        // 关闭程序
        r1.close()

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

r1.on('close', function() {
    process.exit(0)
})
```









### 3.行数不确定

```js
// 1.引入包
var readline = require('readline');
// 2.获取读取的参数
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// 3.存取所有的数组
var inputs = [];
// 4.num为0的时候
var num = 0;
rl.on('line', function(data) {
    if(num == 0){
        //第一个值可能是行数
        num = Number(data.trim());
    } else {
        // 不是第一次获取数字 -> 把数据放到inputs数组里面去
        inputs.push(data.trim());
        // 如果数组获取完了才处理结果
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



```js
https://blog.csdn.net/Vivien_Dennis/article/details/83046606?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166591503516782428627269%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=166591503516782428627269&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-18-83046606-null-null.142^v56^new_blog_pos_by_title,201^v3^control_1&utm_term=nodejs%20acm%E8%AF%BB%E5%85%A5%E6%95%B0%E6%8D%AE&spm=1018.2226.3001.4187
```

