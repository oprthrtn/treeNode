import { PropsWithChildren, useState } from "react";
import { NodeTreeContext } from "./context";
import { Tree, TreeNode } from "../../types";
import { v4 } from "uuid";
import _ from "lodash";

export type NodeTreeProviderProps = PropsWithChildren & {
  intialValue?: Tree;
};

export const NodeTreeProvider = ({
  children,
  intialValue = [],
}: NodeTreeProviderProps) => {
  const deepCopy = _.cloneDeep(
    intialValue.map(({ id, label, subNodes }) => {
      return new TreeNode(id, label, subNodes);
    })
  );

  const [tree, setState] = useState<Tree>(deepCopy);

  const addNode = (parentNode: TreeNode | null) => {
    const id = v4();
    const newNode = new TreeNode(id, "Node", [], parentNode);

    setState((prev) => {
      if (parentNode === null) {
        return [...prev, newNode];
      }

      parentNode.subNodes.push(newNode);
      return [...prev];
    });
  };

  const deleteNode = (node: TreeNode) => {
    setState((prev) => {
      if (node.parent === null) {
        return prev.filter((subNode) => subNode.id !== node.id);
      }

      const parentSubNodes = node.parent.subNodes;

      node.parent.subNodes = parentSubNodes.filter(
        (subNode) => subNode.id !== node.id
      );

      return [...prev];
    });
  };

  const updateNodeName = (node: TreeNode, newName: string) => {
    setState((prev) => {
      node.label = newName;
      return [...prev];
    });
  };

  const resetTree = () => {
    setState(deepCopy);
  };

  return (
    <NodeTreeContext.Provider
      value={{ tree, addNode, deleteNode, updateNodeName, resetTree }}
    >
      {children}
    </NodeTreeContext.Provider>
  );
};
