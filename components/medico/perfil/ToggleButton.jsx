import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

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

