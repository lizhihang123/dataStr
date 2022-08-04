import MaxHeap from './MaxHeap';

const myHeap = new MaxHeap();

myHeap.insert(15);
myHeap.insert(10);
myHeap.insert(9);
myHeap.insert(7);
myHeap.insert(5);
myHeap.insert(3);
debugger
console.log(myHeap);

myHeap.insert(16);

myHeap.remove(0);
