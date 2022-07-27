import React from 'react';

const ContainerDefualt = ({
  children,
  defualtStyles = 'px-5 xl:px-0 space-y-4 xl:w-4/5 2xl:w-3/5 mx-auto',
  className = '',
}) => {
  return <div className={`${defualtStyles} ${className}`}>{children}</div>;
};

const Stage2 = ({
  children,
  defualtStyles = 'space-y-4 xl:w-4/5 2xl:w-3/5 mx-auto',
  className = '',
}) => {
  return <div className={`${defualtStyles} ${className}`}>{children}</div>;
};

export default function Container({ level, children, defualtStyles, className }) {
  const props = {
    defualtStyles,
    children,
    className,
  };
  switch (level) {
    case 2:
      return Stage2(props);
    default:
      return ContainerDefualt(props);
  }
}
