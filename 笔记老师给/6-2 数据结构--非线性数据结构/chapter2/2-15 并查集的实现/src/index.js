import DisjointSet from './DisjointSet';

const d = new DisjointSet(6);
d.union(4, 5);
d.union(2, 4);
d.union(1, 3);
d.union(0, 1);
d.union(3, 2);
