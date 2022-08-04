class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(item) {
    // 将节点直接入队
    this.heap.push(item);
    // 判定是否需要交换位置
    this.shiftUp(this.getSize() - 1);
  }

  remove(index) {
    // 交换位置并且删除队尾节点
    this.swap(index, this.getSize() - 1);
    this.heap.splice(this.getSize() - 1, 1);
    // 判定是否需要交换位置
    this.shiftDown(index);
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftIndex(index) {
    return index * 2 + 1;
  }

  shiftUp(index) {
    // 如果当前节点比父节点大，就交换
    while(this.heap[index] > this.heap[this.getParentIndex(index)]) {
      this.swap(index, this.getParentIndex(index));
      // 将索引修改成父节点
      index = this.getParentIndex(index);
    }
  }

  shiftDown(index) {
    // 判断当前节点是否有左子节点
    while(this.getLeftIndex(index) < this.getSize()) {
      let leftIndex = this.getLeftIndex(index);
      let rightIndex = leftIndex + 1;
      let changeIndex = leftIndex;
      // 判断是否有右子节点，并且右子节点是否大于左子节点
      if (rightIndex < this.getSize() && this.heap[rightIndex] > this.heap[leftIndex]) {
        changeIndex = rightIndex;
      }
      // 判断父节点是否比子节点都大，则终止循环，否则就交换位置
      this.swap(index, changeIndex);
      index = changeIndex;
    }
  }

  swap(left, right) {
    const rightValue = this.heap[right];
    this.heap[right] = this.heap[left];
    this.heap[left] = rightValue;
  }

  getSize() {
    return this.heap.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }
}

export default MaxHeap;