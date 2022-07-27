import React from 'react';

const SectionDefualt = ({ children, defualtStyles = '', className = '' }) => {
  return <section className={`${defualtStyles} ${className}`}>{children}</section>;
};

export default function Section({ type, children, defualtStyles, className }) {
  const props = {
    type,
    children,
    defualtStyles,
    className,
  };

  switch (type) {
    default:
      return SectionDefualt(props);
  }
}
