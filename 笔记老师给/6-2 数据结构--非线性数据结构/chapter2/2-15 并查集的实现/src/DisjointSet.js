class DisjointSet {
  constructor(size) {
    // 初始化
    this.parent = new Array(size);
    // 用于记录树的层级，用于按秩合并
    this.rank = new Array(size);
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }
  // 查找
  // 算法流程
  // 目的：找到目标的根节点 find(3)
  // 1. 循环判定，当前节点的值是否指向自己，如果不是的话表示没有找到
  // 2. 则当前节点的值需要重新赋值，等于以数组项为索引的值
  // 3. 重新赋值后，继续循环判定
  // 4. 直到当前节点的值等于自己，返回当前的值
  find(p) {
    while (p != this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  // 合并
  // 算法流程
  // 目的：合并两个节点，会根据树的层级大小判定合并策略
  // 1. 首先需要寻找两个节点的根节点  0 <- 1    2 <- 3  union(3 , 1)  <=> union(0, 2)
  // 2. 如果两个节点是同一个根节点 直接退出
  // 3. 判定两颗树的层级，层级小的加到层级大的树下面
  // 4. 如果两棵树的层级相等，那么随意合并
  union(p, q) {
    let i = this.find(p);
    let j = this.find(q);
    if (i === j) return;
    if (this.rank[i] < this.rank[j]) {
      this.parent[i] = j;
    } else if (this.rank[i] > this.rank[j]) {
      this.parent[j] = i;
    } else {
      this.parent[j] = i;
      this.rank[i] += 1;
    }
  }
}

export default DisjointSet;