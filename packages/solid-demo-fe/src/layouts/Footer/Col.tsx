import { Component, For, Show } from 'solid-js';
import { Box, Grid, Icon, Link, Typography, styled } from '@suid/material';
import { OverridableComponent } from '@suid/material/OverridableComponent';
import { SvgIconTypeMap } from '@suid/material/SvgIcon';
import { DividerSm } from './DividerSm';

type ItemType = {
  href: string;
  label: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

interface ColProps {
  title: string;
  list: ItemType[];
  hideDivider?: boolean;
}

const Col: Component<ColProps> = (props) => {
  return (
    <>
      <ColStyled item xs={12} sm={6} md lg>
        <TileStyled variant='h4'>{props.title}</TileStyled>
        <ListStyled component='ul'>
          <For
            each={props.list}
            children={({ icon: IconProp, href, label }) => (
              <ListItemStyled component='li'>
                {IconProp && <IconStyled children={<IconProp />} />}
                <Link href={href}>{label}</Link>
              </ListItemStyled>
            )}
          />
        </ListStyled>
      </ColStyled>
      <Show when={!props.hideDivider} children={<DividerSm />} />
    </>
  );
};

const ColStyled = styled(Grid)(({ theme }) => ({}));

const TileStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBlockStart: 8,
  marginBlockEnd: 18,
  color: theme.palette.grey[900],
  fontSize: 21,
  [theme.breakpoints.down('sm')]: {
    marginBlockStart: 16,
    marginBlockEnd: 8,
  },
}));

const ListStyled = styled(Box)(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    marginBlock: 8,
  },
}));

const ListItemStyled = styled(Box)(({ theme }) => ({
  '& > a': {
    textDecoration: 'none',
    color: theme.palette.grey[600],
    position: 'relative',
  },
  '& a:before': {
    position: 'absolute',
    top: 20,
    content: '""',
    height: 2,
    backgroundColor: theme.palette.primary.main,
    width: 0,
    transition: '.5s ease',
  },
  '&:hover > a:before': {
    width: '100%',
    height: 2,
    transition: '.5s ease',
  },
  fontSize: 17,
  paddingBlockStart: 12,
  display: 'flex',
  gap: 8,
}));

const IconStyled = styled(Icon)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: 19,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    fontSize: 15,
  },
}));

export { Col };
