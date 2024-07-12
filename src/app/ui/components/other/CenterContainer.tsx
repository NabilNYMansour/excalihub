import { Container, MantineSize } from '@mantine/core';
import React from 'react';
import classes from './CenterContainer.module.css';

interface CenterContainerProps {
  children?: React.ReactNode;
  size?: MantineSize;
}

const CenterContainer: React.FC<CenterContainerProps> = ({ children, size = "lg" }) => {
  return (
    <Container size={size} className={classes.centerContainer}>
      {children}
    </Container>
  );
};

export default CenterContainer;