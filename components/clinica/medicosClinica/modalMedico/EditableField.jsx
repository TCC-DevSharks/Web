import styles from "./style.module.css";
import React, { useState, useEffect } from 'react';


const EditableField = ({ value, onChange, isEditModeActive }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleSave = () => {
    onChange(editedValue);
    setEditMode(false);
  };

  useEffect(() => {
    if (isEditModeActive) {
      setEditMode(true);
    }
  }, [isEditModeActive]);

  return (
    <div
      onClick={() => setEditMode(true)}
      className={`${styles["informartion"]} ${editMode ? styles["editMode"] : ''} ${isEditModeActive ? styles["editable"] : ''}`}
    >
      {editMode ? (
        <>
          <input
            type="text"
            value={editedValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        value
      )}
    </div>
  );
};

export default EditableField;
