import React from 'react';

const Header1 = ({
  children,
  defaultStyles = 'text-2xl md:text-3xl font-bold',
  className = '',
}) => {
  return <h1 className={`${defaultStyles} ${className}`}>{children}</h1>;
};

const Header2 = ({ children, defaultStyles = 'text-xl md:text-2xl font-bold', className = '' }) => {
  return <h2 className={`${defaultStyles} ${className}`}>{children}</h2>;
};

const Header3 = ({ children, defaultStyles = 'text-lg md:text-xl font-bold', className = '' }) => {
  return <h3 className={`${defaultStyles} ${className}`}>{children}</h3>;
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
    case 2:
      return Header2(props);
    case 3:
      return Header3(props);
    default:
      return Header1(props);
  }
}
