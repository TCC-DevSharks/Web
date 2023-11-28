import React, { useState } from 'react';

const EditableField = ({ value, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleSave = () => {
    onChange(editedValue);
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <>
          <input type="text" value={editedValue} onChange={handleInputChange} />
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <div onClick={() => setEditMode(true)}>
          {value}
        </div>
      )}
    </div>
  );
};

export default EditableField;