// 1. 非线性数据结构
// 元素之间是一对多的关系。数据之间有分支

// 2. 树拥有很多的数据结构，也是天然的递归结构，像一棵倒过来的树。
// 树只有唯一的子节点，树的层级结构非常的清晰，树有明确的节点之间的关系，树的一个部分可以单独的拆解出来。

// 3. 二叉树是树的一种。
// 只有两个叶子结点，至多有两个叶子结点。
// 如果叶子节点的数量满了，就是满二叉树。

// 4. 二叉树的遍历
// 先序 根 - 左 - 右
// 中序 左 - 根 - 右
// 后序 左 - 右 - 根


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */



// 二分搜索树的实现
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
        this.size = 0
    }
    getSize() {
        return this.size
    }
    isEmpty() {
        return this.getSize
    }
    addNode(v) {
        this.root = this._addChild(this.root, v)
    }
    // 添加节点时，需要比较添加的节点值 和当前的值的大小
    _addChild(node, v) {
        if(!node) {
            this.size++
            return new Node(v)
        }
        if(node.value > v) {
            node.left = this._addChild(node.left, v)
        } else {
            node.right = this._addChild(node.right, v)
        }
        return node
    }
}