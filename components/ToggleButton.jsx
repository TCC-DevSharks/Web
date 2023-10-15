import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // Importe o estilo CSS da biblioteca

function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <label>
        <Toggle
          checked={isOn}
          onChange={handleToggle}
        />
      </label>
    </div>
  );
}

export default ToggleButton;

