// 2.1 队列的特点
// 本质是一个数组
// 和栈的比较。
    // 有两个口
    // 顺序是先进先出 后进后出

// 2.2 如何修改队列中的一个数字
// [1,2,3] - 取出2 修改为0
// 1 [2, 3] - 先取出1
// 1 2 [3] - 再取出2
// 1 0 [3] - 2修改为0
// [3, 1] - 1 先入队
// [3, 1, 0] - 0再入队
// 顺序和原来不同 所以要调整
// 3 [1, 0] - 取出3
// [1, 0, 3] - 3再入队
// 发现队列要修改一个值特别麻烦

// 2.2 声明一个队列
class Queue {
    constructor() {
        // 初始化一个数组
        this.queue = []
    }
    // 入队
    enQueue(item) {
        return this.queue.push(item)
    }
    // 出队
    deQueue(item) {
        return this.queue.shift(item)
    }
    // 取-查 作为食堂大妈 你只能看到第一个
    getHeader() {
        return this.queue[0]
    }
    // 长度
    getSize() {
        return this.queue.length
    }
    // 是否为空
    isEmpty() {
        return this.queue.length === 0
    }
}