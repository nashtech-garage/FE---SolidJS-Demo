import { Box, List, Drawer as MuiDrawer, Typography, styled } from '@suid/material';
import { For } from 'solid-js';
import { KeyboardArrowLeft } from '@suid/icons-material';

import { drawerMenu } from './constant';
import ListItem from './ListItem';

type DrawerProps = {
  open: boolean;
  handleClose: () => void;
};

function Drawer(props: DrawerProps) {
  return (
    <MuiDrawer anchor='left' open={props.open} onClose={props.handleClose}>
      <Container>
        <Header onClick={props.handleClose}>
          <KeyboardArrowLeft />
          Back
        </Header>
        <List>
          <For each={drawerMenu}>{(item) => <ListItem item={item}></ListItem>}</For>
        </List>
      </Container>
    </MuiDrawer>
  );
}

const Container = styled(Box)({
  width: 300,
});

const Header = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 18,
  color: '#222',
  padding: '20px 10px',
  marginBottom: 20,
  borderBottom: 'solid 1px #EFEFEF',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
});

export default Drawer;
