import React, { useState } from 'react';

interface Props {
  border: string;
  color: string;
  height: string;
  width: string;
  onClick: () => void;
  buttonName: string;
}

const Button: React.FC<Props> = ({
  border,
  color,
  height,
  width,
  onClick,
  buttonName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let buttonMode: String = isClicked ? 'Hide' : 'Show';
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        height,
        width,
      }}
      className={`animated-button ${
        isHovered ? 'hovered' : ''
      } animated-button ${isClicked ? 'clicked' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(!isClicked)}
    >
      {buttonMode} {buttonName}
    </button>
  );
};

export default Button;
