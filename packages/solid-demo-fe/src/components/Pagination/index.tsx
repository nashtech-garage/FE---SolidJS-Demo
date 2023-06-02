import { Grid, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@suid/material';
import ChevronLeftIcon from '@suid/icons-material/ChevronLeft';
import ChevronRightIcon from '@suid/icons-material/ChevronRight';
import { createEffect, createSignal } from 'solid-js';

interface IPaginationProps {
  count: number;
  activePage: number;
  itemsPerPage: number;
  onChange: (page: number) => void;
}
function Pagination(props: IPaginationProps) {
  const [pageList, setPageList] = createSignal<number[]>([]);
  const [maxPage, setMaxPage] = createSignal<number>(0);

  createEffect(() => {
    setMaxPage(Math.ceil(props.count / props.itemsPerPage));
  });

  createEffect(() => {
    const pageNumbers = [];
    for (let i = 0; i < maxPage(); i++) {
      pageNumbers.push(i);
    }
    if (props.activePage === 0) {
      setPageList(pageNumbers.slice(0, 3));
    } else if (props.activePage === maxPage()) {
      setPageList(pageNumbers.slice(Math.max(props.activePage - 3, 0), props.activePage + 1));
    } else {
      setPageList(pageNumbers.slice(Math.max(props.activePage - 1, 0), props.activePage + 2));
    }
  });

  const gotoNextPage = (newPage: number) => {
    if (newPage <= 0) return props.onChange(0);
    if (newPage >= maxPage()) return props.onChange(maxPage());
    return props.onChange(newPage);
  };

  return (
    <div class='pagination'>
      <Grid container width={'100%'}>
        <Grid item xs={6} sm={6}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => gotoNextPage(props.activePage - 1)} disabled={props.activePage === 0}>
                <ListItemIcon>
                  <ChevronLeftIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {pageList()?.map((page) => (
              <ListItem disablePadding>
                <ListItemButton class={page === props.activePage ? 'active' : ''} onClick={() => gotoNextPage(page)}>
                  <ListItemText primary={page + 1} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => gotoNextPage(props.activePage + 1)}
                disabled={props.activePage === maxPage() - 1}>
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} sm={6}>
          <div class='pagination__text'>
            Showing Products {props.activePage * props.itemsPerPage + 1}-
            {Math.min((props.activePage + 1) * props.itemsPerPage, props.count)} of {props.count} Result
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Pagination;
