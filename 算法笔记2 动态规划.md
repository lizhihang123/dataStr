# 动态规划



# 1 概念

核心：

1 将原问题拆解为若干个子问题，

2 同时保留每个子问题的答案，

3 使得每个子问题只求解一次，

4 最终得到原问题的答案



>自下而上的求解问题，先从1 2求出答案，再去求40



## 做题五部曲和排错的思路

```js
1. dp[i] => 第i个斐波那契的数列值
2. 递推公式 => dp[i] = dp[i - 1] + dp[i - 2]
3. 初始化dp数组 => dp[0] = 0 dp[1] = 1 => 为什么dp[0] = 0 斐波那契从第一个数开始算
4. 确定遍历顺序 => 从0 -> 1 -> 2
5. 举例推导dp数组 => 0 1 1 2 3 5 8 13 21 34

动态规划排错的思路：
1 写代码前一定根据递推公式 => 模拟推导一下dp数组
2 代码没通过 -> 打印dp数组 看看和推演的是否一致
  如果dp数组和推演的结果一致 ->递推公式 遍历顺序 结果的初始化 有关系
  如果打印结果和自己推演的不一样 -> 代码的实现有问题
```







# 2 斐波那契数列

>1 1 2 3 5 8 13 ……

## O(2^n)的写法

```js
	// 时间复杂度O(2^N)为啥？
    // 因为每一个n都会裂变为2个递归 就是有2的n次方个递归
    function Feibo(n) {
      if (n === 0) {
        return 0
      }
      if (n === 1) {
        return 1
      }
      return (Feibo(n - 1) + Feibo(n - 2)) % mod
    }
    console.time('10')
    Feibo(10)
    console.timeEnd('10')

    console.time('20')
    Feibo(20)
    console.timeEnd('20')

    console.time('40')
    Feibo(40)
    console.timeEnd('40')
```

## O(n)的递归

```js
    // 时间复杂度 从 O(2^N) ->O(n)
    let memo = {}
    const mod = Math.pow(10, 9) + 7
    function Feibo2(n) {
      if (n === 0) {
        return 0
      }
      if (n === 1) {
        return 1
      }
      // 如果存在memo[n] 就直接返回这个值 不重复递归
      // 关键设置缓存
      if (memo[n]) {
        return memo[n]
      }
      return (memo[n] = Feibo2(n - 1) + Feibo2(n - 2)) % mod
    }
    console.time('10')
    Feibo2(10)
    console.timeEnd('10')

    console.time('20')
    Feibo2(20)
    console.timeEnd('20')

    console.time('40')
    Feibo2(40)
    console.timeEnd('40')
```

测试时间复杂度的小技巧

```js
console.time('10')
中间的代码
console.timeEnd('10')

多写几个用例 从 10 20 40 进行递增看 时间的变化
```





## 动态规划解斐波

```js
// 时间复杂度是O(n) for循环遍历的次数
// 空间复杂度是O(n) memo的长度
// 求mod 卡了很久
const memo = {}
const mod = Math.pow(10, 9) + 7
function dpFeibo(n) {
  memo[0] = 0
  memo[1] = 1
  // i需要从2开始 是边界条件
  // 从 0,1 递推到40的公式就是memo[i - 1] + memo[i - 2]
  for (let i = 2; i <= n; i++) {
    // 每一次都要判断mod值
    memo[i] = (memo[i - 1] + memo[i - 2]) % mod
  }
  return memo[n]
}
```



## 总结：

1. 斐波那契 既可以用递归，但是递归要优化缓存。递归是一种自上而下的视角去解题，是上帝的俯瞰视角
2. 也可以用动态规划的思想。其思想就是自下而上的，去得到一个推导的公式。





# 3 爬楼梯

dp解法

```js
		const dp = []
        function step(n) {
            // 边界
            if (n <= 1) {
                return n
            }
            // 不需要管 dp[0]的值 => 根据dp[i]的定义 没有值是更加合理的
            dp[1] = 1
            dp[2] = 2
            // i需要从2开始 是边界条件
            // 从 0,1 递推到40的公式就是dp[i - 1] + dp[i - 2]
            for (let i = 3; i <= n; i++) {
                // 每一次都要判断mod值
                dp[i] = (dp[i - 1] + dp[i - 2])
            }
            return dp[n]
        }
        console.time('1')
        console.log(step(2)); // 2 
        console.log(step(3)); // 3
        console.log(step(5)); // 8
        console.timeEnd('1')
```

为什么dp[0] 不管它，因为可以说爬0层，什么也不动也是爬楼梯的一种方法，应该是1

也可以说，爬0层，根本没爬，应该是0，这是从dp[i]的含义出发去说的

题目说n是一个正整数，没考虑0，所以0不管它



>这道题可以细分问，一步一个台阶，两个台阶，三个台阶，直到m个台阶，有多少个方法爬到n阶楼梯
>
>是一个完全背包问题=>在背包问题再见





# 4. 整数拆分

![image-20220722194410329](C:\Users\huawei\AppData\Roaming\Typora\typora-user-images\image-20220722194410329.png)



```js
Math.max(undefined, 1, 2)
NaN
```

## 1 动规

```diff
  /* 
    1 时间复杂度O(n ^ 2)
      空间 O(n)
    2 注意点
      1 声明数组的长度是n+1 为什么
      2 创建数组要有默认值 为什么？如果没有 递归公式第一次执行的时候会返回undefined
      3 边界条件 i从3开始，i是1的时候，1 + 0就是0 i是2的时候，1 + 1就是2 可以就从2开始
      4 j的边界条件 一定比i小一个 为什么 4 拆分 最多是3 * 1 可能是 4 * 1
    3 动规五部曲
      1 dp[i]第i位数字的最大乘积
      2 递推公式
        dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        dp[i] => 可能之前求出来的dp[i]就是最大的
        j * (i - j) => 表示4 =》1 * 3
        j * dp[i - j] => 表示依赖前面求出来的数值 j * 【继续把 i - j 进行拆分】
      3 初始化dp数组 - dp[0]和dp[1] 都让他们为0 dp[2] = 1 遍历从i = 3开始
      4 遍历的顺序 从前往后 因为后面的数 依赖前面的数
      5 0 0 1 2 4[索引为4] 6 9 12 18 27 36[索引为10] 
    */
```



```js
    function initBreak_Dynamic(n) {
      let dp = new Array(n + 1).fill(0)
      dp[2] = 1
      for (let i = 3; i <= n; i++) {
        for (let j = 1; j < i - 1; j++) {
          dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
      }
      return dp[n]
    }

    let res5 = initBreak_Dynamic(10)
    console.log(res5)

```



## 2 递归



时间复杂度：

空间复杂度：



逻辑：

1 比较大小，

res => 上一次的结果值

i * (n - i)

i * break((n - i))就是i和n-i的最大数的和的乘积



2 这道题还可以贪心，下次在学





递归注意点：

1 memo数组放在外面 不能放在函数体里面去声明

2 数组初始化的值和缓存判断的值区分开来 如果缓存【值不为-1】那么初始值就要给到-1

3 i * break((n - i), memo)不是给到 n - 1

4 这里的返回值尤其注意，return res 最后一个执行的是n = 10; 因此res是最后的最大值

```js
	function integerBreak(n) {
      // n是10，但是需要11位的数组，因为索引的缘故
      let memo = new Array(n + 1).fill(-1)
      // 注意return的值
      return breakInt(n, memo)
    }
    function breakInt(n, memo) {
      if (n == 1 || n === 0) {
        return 0
      }
      let res = -1
      if (memo[n] !== -1) {
        return memo[n]
      }
      for (let i = 1; i <= n - 1; i++) {
        res = Math.max(res, i * (n - i), i * breakInt((n - i), memo))
        memo[n] = res
      }
      return res
    }
    console.log(integerBreak(10))
```

递归执行栈的过程

```diff
/* 
        n = 10
          i = 1; i * breakInt((n - 1), memo) 
          n - i = 9
        n = 9
          i = 1; i * breakInt((n - 1), memo)
          n - i = 8
        n = 8
          i = 1; i * breakInt((n - 1), memo)
          n - i = 7
        n = 7
          i = 1; i * breakInt((n - 1), memo)
          n - i = 6
        n = 6
          i = 1; i * breakInt((n - 1), memo)
          n - i = 5
        n = 5
          i = 1; i * breakInt((n - 1), memo)
          n - i = 4
        n = 4
          i = 1; i * breakInt((n - 1), memo)
          n - i = 3
        n = 3
          i = 1; i * breakInt((n - 1), memo)
          n - i = 2   
        n = 2
          i = 1; i * breakInt((n - 1), memo)
          n - i = 1   
        -----
        当走到这里时 再往上 一个个弹出 执行递归
        n = 1;return 0
        n = 3;  i = 1, 1 * breakInt((3 - 1), memo)         
                i = 2, 2 * breakInt((3 - 2), memo)
        n = 4;  i = 1, 1 * breakInt((4 - 1), memo)         
                i = 2, 2 * breakInt((4 - 2), memo)   
                i = 3, 2 * breakInt((4 - 3), memo)          
        */
```





# 5. 背包问题

## 1. 学习目标 

学会 0-1背包问题和完全背包问题解决背包问题的一些写法，就已经很棒了。



## 2. 0-1背包问题

**问题描述**

假设有n件物品，和一个最多能够背重量为w的背包，

第i件物品的重量是W[i],物品的价值是Value[i]，

每件物品只能够使用一次，怎么放进去，使得物品的价值是最大的



<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220908162623190.png" alt="image-20220908162623190" style="zoom:50%;" />

**暴力解法**

1. 每件物品只有放或者不放，两种结果
2. 比如上图，每种物品都有可能放或者不放，2^3就是8种可能，要去判断8种可能里面哪一次他是价值最大的



**动态规划解法**

1. 确定dp数组和下标的含义

使用二维数组，dp[i] [j] 表示从 下标为 0-1的物品里任意取，放进重量为j的背包，价值总和最大多少。dp[i] [j]就是最大的价值

```diff
i 是物品的下标
j 是重量的下标
dp[i][j]是价值
value[i]是价值
```





2. 确定递推公式



- 不放物品

```diff
如果不放物品，那么价值就继承上一次的价值即可。
```



- 放物品

```js
如果放物品，要比较最大值。什么的最大值?
dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])
dp[i - 1][j]就是指如果不放这个内容
很难理解的是 dp[i - 1][j - weight[i]] + value[i]
	value[i]就是指，物品i的价值
    dp[i - 1][j - weight[i]] => weight[i]就是指 当前j的重量 - weight[i]这个重量
```





3. 初始化

必须和dp数组的定义吻合



```diff
dp[i][0] 重量为0，那么第一列必须都是0 =》 放不下任何东西
```

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220908163531337.png" alt="image-20220908163531337" style="zoom:50%;" />







```diff
如果放物品0，只要重量不是0，价值都是15
```





<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20220908163549587.png" alt="image-20220908163549587" style="zoom:50%;" />





```js
// 为什么是weight[0] ？ 
for (let j = 0; j < weight[0]; i++) {
    dp[0][j] = 0 
}
```





其他值 初始为0，因为都是要被替换的



`顺序很重要，到底是遍历物品 还是先遍历重量`
