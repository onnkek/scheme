import React from "react";
import { Button } from "reactstrap";

const AddButton = ({ onClick, text, children, icon, borderColor }) => {

  return (
    <Button
      outline
      // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
      className='add-btn p-0 mb-1'
      style={{ border: `1px solid rgba(var(--bs-${borderColor}-rgb)`, borderRadius: "4px" }}
      onClick={onClick}
    >
      <div className="me-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="add-btn">
          <img className='add-btn__icon' src={icon} alt="Connect"></img>
          <div>{text}</div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </Button>
  );
}

export default AddButton;