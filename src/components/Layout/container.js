import React from 'react';

const ContainerDefualt = ({
  children,
  defualtStyles = 'space-y-4 xl:w-4/5 2xl:w-2/5 mx-auto',
  className = '',
}) => {
  return <div className={`${defualtStyles} ${className}`}>{children}</div>;
};

export default function Container({ type, children, defualtStyles, className }) {
  const props = {
    defualtStyles,
    children,
    className,
  };
  switch (type) {
    default:
      return ContainerDefualt(props);
  }
}
