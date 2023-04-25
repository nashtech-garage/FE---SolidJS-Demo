import { Link } from '@solidjs/router';
import { styled, ListItem as MuiListItem, ListItemButton, ListItemText, Box, Slide, Typography } from '@suid/material';
import { ExpandMore } from '@suid/icons-material';
import { For, createSignal } from 'solid-js';

import { IMenuItem } from './constant';

type ListItemProps = {
  item: IMenuItem;
};

function ListItem(props: ListItemProps) {
  const [expand, setExpand] = createSignal(false);

  const hasChildren = () => {
    return props.item.children && props.item.children.length > 0;
  };

  const handleClick = (event: MouseEvent) => {
    if (props.item.href) return;

    setExpand(!expand());
  };

  return (
    <>
      <MuiListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemText>
            <Typography fontSize={14} sx={{ textTransform: 'uppercase' }}>
              {props.item.title}
            </Typography>
          </ListItemText>
          {hasChildren() && <ExpandIcon class={expand() ? 'expand' : ''} />}
        </ListItemButton>
      </MuiListItem>
      {expand() && (
        <Slide in direction='right'>
          <Box>
            <For each={props.item.children}>
              {(subItem) => (
                <MuiListItem disablePadding>
                  <SubItemButton>
                    <SubItemLink href={subItem.href}>
                      <Typography variant='subtitle2'>{subItem.title}</Typography>
                    </SubItemLink>
                  </SubItemButton>
                </MuiListItem>
              )}
            </For>
          </Box>
        </Slide>
      )}
    </>
  );
}

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: '#222',
});

const ExpandIcon = styled(ExpandMore)({
  transition: '0.5s',
  '&.expand': {
    rotate: '180deg',
  },
});

const SubItemButton = styled(ListItemButton)({
  padding: 0,
});

const SubItemLink = styled(LinkStyled)({
  width: '100%',
  padding: '8px 16px 8px 32px',
});

export default ListItem;
