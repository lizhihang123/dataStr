// 1. 栈的概念
//     栈其实就可以被理解为数组 - 特殊的数组 只能一端进出
//     一个杯子，放入饼干，如果要取出最里面的饼干，只能把上面的饼干先拿出来 再去取下面的饼干
// ps:栈遵循后进先出
// 2. 栈支持哪些操作？
// 入栈 push
// 出栈 pop
// 查找 peek
// 长度 getSize
// 判断是否为空 isEmpty


class Stack {

    
    // 定义一个数组
    constructor() {
        this.stack = [];
    }
    // 记得下面的方法都return了
    // 1. 增加栈的数据
    push(item) {
        return this.stack.push(item);
    }
    // 2. 删除栈的数据 切记 取出数据，直接把最后一个数据踢出去，不用加参数
    pop() {
        return this.stack.pop();
    }
    // 3. 读取栈的数据
    peek() {
        // 只能查到最后一个 因此是getSize() 长度 - 1
        return this.stack[getSize() - 1]
    }
    // 4. 获取栈的数据有几个
    getSize() {
        return this.stack.length;
    }
    // 5. 判断栈的长度是否为空
    isEmpty() {
        return this.stack.length === 0;
    }
}