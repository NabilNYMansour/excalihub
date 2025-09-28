import { Title, Text, Container } from '@mantine/core';
import classes from '../error.module.css';

export default function UnderConstruction() {
  return (
    <div className={classes.root}>
      <Container>
        <Title className={classes.title}>🚧 Under Construction 🚧</Title>
        <Text size="lg" ta="center" className={classes.description}>
          EcaliHub is currently undergoing maintenance.<br />
          Please check back later!
        </Text>
      </Container>
    </div>
  );
}