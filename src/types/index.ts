export class TreeNode {
  constructor(
    public id: string,
    public label: string,
    public subNodes: Tree,
    public parent: TreeNode | null = null
  ) {
    subNodes.forEach((subNode) => {
      subNode.parent = this;
    });
  }
}

export type Tree = Array<TreeNode>;
