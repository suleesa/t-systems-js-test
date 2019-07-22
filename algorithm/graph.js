class Graph {
  constructor() {
    this.matrix = new Map()
  }
  addNode(node) {
    if (!this.matrix.get(node)) {
      this.matrix.set(node, new Map())
    }
  }
  addDirectedEdge(a, b, weight) {
    this.addNode(a);
    this.addNode(b);
    this.matrix.get(a).set(b, weight)
  }
  addUndirectedEdge(a, b, weight) {
    this.addDirectedEdge(a, b, weight);
    this.addDirectedEdge(b, a, weight)
  }
  deleteNode(node) {
    this.matrix.delete(node);
    this.matrix.forEach((edges) => {
      edges.delete(node)
    })
  }
  deleteDirectedEdge(a, b) {
    this.matrix.get(a).delete(b)
  }
  deleteUndirectedEdge(a, b) {
    this.deleteDirectedEdge(a, b);
    this.deleteDirectedEdge(b, a)
  }
  getNeighbours(node) {
    return [...this.matrix.get(node).keys()]
  }
  inverse() {
    let newG = new Graph();
    this.matrix.forEach((edges, node) => edges.forEach((weight, node2) => {
      newG.addDirectedEdge(node2, node, weight)
    }))
    this.matrix = newG.matrix;
  }
  getEdge(a, b) {
    let edges = this.matrix.get(a)
    if (edges && edges.get(b)) {
      return {
        from: a,
        to: b,
        weight: this.matrix.get(a).get(b)
      }
    } else return null
  }
  getEdgeWeight(a, b) {
    let edge = this.getEdge(a, b);
    if (edge) {
      return edge.weight
    } else return null
  }
  findPath(a, b) {
    let visited = [];
    let path = [];
    let position = a;
    while (position !== b) {
      let xs = this.getNeighbours(position).filter(node => {
        return !visited.includes(node)
      })
      visited.push(position);
      if (xs.length == 0) {
        if (path.length == 0) {
          return null
        }
        position = path[path.length - 1];
        path.pop();
      } else {
        path.push(position)
        position = xs[0];
      }
    }
    path.push(position);
    return path;
  }
}