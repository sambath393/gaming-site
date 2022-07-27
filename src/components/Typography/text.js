import React from 'react';

const TextDefualt = ({ children, defualtStyles, className }) => {
  return <p className={`${defualtStyles} ${className}`}>{children}</p>;
};

export default function Text({ type, children, defualtStyles, className }) {
  const props = {
    children,
    type,
    defualtStyles,
    className,
  };

  switch (type) {
    default:
      return TextDefualt(props);
  }
}
