import React from 'react';

const Header1 = ({ children, defaultStyles = '', className = '' }) => {
  return <h1 className={`${defaultStyles} ${className}`}>{children}</h1>;
};

export default function Title({ level, children, defaultStyles, className }) {
  const props = {
    level,
    children,
    defaultStyles,
    className,
  };

  switch (level) {
    case 1:
      return Header1(props);
    default:
      return Header1(props);
  }
}
