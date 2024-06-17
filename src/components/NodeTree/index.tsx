import "./style.css";
import { NodeLayout } from "../Node";
import {
  NodeTreeProvider,
  NodeTreeProviderProps,
} from "../../Contexts/NodeTreeContext";
import { useNodeTreeContext } from "../../Contexts/NodeTreeContext/context";

const NodeTreeLayout = () => {
  const { tree, addNode, resetTree } = useNodeTreeContext();

  const addNewNodeHandler = () => {
    addNode(null);
  };

  const resetTreeHandler = () => {
    resetTree();
  };

  return (
    <div className="node-tree">
      <div className="node-tree-header">NodeTree</div>
      <div className="node-tree-wrapper">
        {tree.map((node) => {
          return <NodeLayout key={node.id} node={node} />;
        })}
      </div>
      <div className="node-tree-footer">
        <button onClick={addNewNodeHandler}>Add</button>
        <button onClick={resetTreeHandler}>Reset</button>
      </div>
    </div>
  );
};

export const NodeTree = ({
  intialValue,
}: Pick<NodeTreeProviderProps, "intialValue">) => {
  return (
    <NodeTreeProvider intialValue={intialValue}>
      <NodeTreeLayout />
    </NodeTreeProvider>
  );
};
