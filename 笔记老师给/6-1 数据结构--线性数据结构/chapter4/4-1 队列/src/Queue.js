class Queue {
  constructor() {
    this.queue = [];
  }

  enQueue(item) {
    return this.queue.push(item);
  }

  deQueue() {
    return this.queue.shift();
  }

  getHeader() {
    return this.queue[0];
  }

  getSize() {
    return this.queue.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }
}