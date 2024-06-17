import { FormEvent, useState } from "react";
import { useNodeTreeContext } from "../../Contexts/NodeTreeContext/context";
import { TreeNode } from "../../types";
import "./style.css";
import { useOutsideClick } from "../../common";
type LabelProps = Pick<NodeLayoutProps, "node"> & {
  isEditLabel: boolean;
  setIsEditLabel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Label = ({ node, isEditLabel, setIsEditLabel }: LabelProps) => {
  const { updateNodeName } = useNodeTreeContext();

  const hideForm = () => {
    setIsEditLabel(false);
  };

  const updateNameOnSubmitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNameInput = e.currentTarget.elements[0] as HTMLInputElement;
    updateNodeName(node, newNameInput.value);
    hideForm();
  };

  const inputRef = useOutsideClick<HTMLInputElement>(hideForm);

  return isEditLabel ? (
    <form onSubmit={updateNameOnSubmitHanlder}>
      <label>
        New name:
        <input
          ref={inputRef}
          type="text"
          name="newName"
          defaultValue={node.label}
        />
      </label>
    </form>
  ) : (
    node.label
  );
};

type NodeLayoutProps = {
  node: TreeNode;
};

export const NodeLayout = ({ node }: NodeLayoutProps) => {
  const { addNode, deleteNode } = useNodeTreeContext();
  const [isEditLabel, setIsEditLabel] = useState<boolean>(false);

  const createSubNodeHanlder = () => addNode(node);
  const deleteNodeHandler = () => deleteNode(node);
  const editNodeNameHandler = () => setIsEditLabel(true);

  return (
    <>
      <div className="node-wrapper">
        <Label
          node={node}
          isEditLabel={isEditLabel}
          setIsEditLabel={setIsEditLabel}
        />

        <button onClick={createSubNodeHanlder} aria-label="Add new subNode">
          +
        </button>
        <button onClick={deleteNodeHandler} aria-label="Delete current Node">
          -
        </button>
        <button onClick={editNodeNameHandler}>edit</button>
      </div>

      <div className="subNodes-wrapper">
        {node.subNodes.map((subNode) => {
          return <NodeLayout key={subNode.id} node={subNode} />;
        })}
      </div>
    </>
  );
};
