import { createContext, useContext } from "react";
import { Tree, TreeNode } from "../../types";

type NodeTreeContextValues = {
  tree: Tree;
  addNode: (parentNode: TreeNode | null) => void;
  deleteNode: (node: TreeNode) => void;
  updateNodeName: (node: TreeNode, newName: string) => void;
  resetTree: () => void;
};

export const NodeTreeContext = createContext<NodeTreeContextValues | undefined>(
  undefined
);

export const useNodeTreeContext = (): NodeTreeContextValues => {
  const context = useContext(NodeTreeContext);

  if (!context) {
    throw 'useNodeTreeContext in "NodeTreeProvider"';
  }

  return context;
};
