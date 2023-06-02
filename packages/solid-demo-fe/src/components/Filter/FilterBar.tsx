import { Grid, List, ListItem, ListItemIcon, MenuItem, Select, styled } from '@suid/material';
import { FormatListBulleted, Apps } from '@suid/icons-material';

import List2Items from '../../assets/icons/2.png';
import List3Items from '../../assets/icons/3.png';
import List4Items from '../../assets/icons/4.png';
import List6Items from '../../assets/icons/6.png';
import { ProductFilterAction, dispatchProductFilter, productFilterStore } from '../../store';
import { IDisplayTypes, enumDisplayTypes } from '../../types/ProductFilter';
import { Component, Show, onCleanup } from 'solid-js';

interface IFilterBarProps {
  count: number;
  offset: number;
  limit: number;
}
const FilterBar: Component<IFilterBarProps> = (props) => {
  const productFilterData = () => productFilterStore.data;
  const onSortingItems = async (event: any) => {
    const sort = event.target.value;
    await dispatchProductFilter(ProductFilterAction.SortProduct, {
      ...productFilterData(),
      sort,
    });
  };

  const onChangeDisplayType = async (type: IDisplayTypes) => {
    await dispatchProductFilter(ProductFilterAction.FilterProduct, {
      ...productFilterData(),
      displayType: type,
    });
  };

  const onChangeNumberOfColumns = async (num: number) => {
    await dispatchProductFilter(ProductFilterAction.FilterProduct, {
      ...productFilterData(),
      numberOfColumns: num,
    });
  };

  return (
    <FilterBarStyled>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item lg={4}>
          Showing Products {props.offset * props.limit + 1}-{Math.min(props.count, (props.offset + 1) * props.limit)} Of {props.count} Result
        </Grid>
        <Grid item lg={5} sx={groupStyled}>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item lg={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Apps onclick={() => onChangeDisplayType(enumDisplayTypes.GRID)} />
              <FormatListBulleted onclick={() => onChangeDisplayType(enumDisplayTypes.LIST)} />
            </Grid>
            <Grid item lg={7}>
              <Show when={productFilterData()?.displayType === enumDisplayTypes.GRID}>
                <List sx={{ display: 'flex', padding: 0 }}>
                  <ListItem sx={{ width: 'auto' }}>
                    <ListItemIcon sx={{ minWidth: 'auto' }} onclick={() => onChangeNumberOfColumns(2)}>
                      <img src={List2Items} alt='2' elementtiming={''} fetchpriority={'auto'} />
                    </ListItemIcon>
                  </ListItem>
                  <ListItem sx={{ width: 'auto' }}>
                    <ListItemIcon sx={{ minWidth: 'auto' }} onclick={() => onChangeNumberOfColumns(3)}>
                      <img src={List3Items} alt='2' elementtiming={''} fetchpriority={'auto'} />
                    </ListItemIcon>
                  </ListItem>
                  <ListItem sx={{ width: 'auto' }}>
                    <ListItemIcon sx={{ minWidth: 'auto' }} onclick={() => onChangeNumberOfColumns(4)}>
                      <img src={List4Items} alt='2' elementtiming={''} fetchpriority={'auto'} />
                    </ListItemIcon>
                  </ListItem>
                  <ListItem sx={{ width: 'auto' }}>
                    <ListItemIcon sx={{ minWidth: 'auto' }} onclick={() => onChangeNumberOfColumns(6)}>
                      <img src={List6Items} alt='2' elementtiming={''} fetchpriority={'auto'} />
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Show>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} sx={{ padding: '0 20px' }}>
          <Select variant='standard' onChange={onSortingItems} fullWidth>
            <MenuItem value={-1}>Sorting Items</MenuItem>
            <MenuItem value={0}>Alphabetically A-Z</MenuItem>
            <MenuItem value={1}>Alphabetically Z-A</MenuItem>
            <MenuItem value={2}>Price Low to High</MenuItem>
            <MenuItem value={3}>Price High to Low</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </FilterBarStyled>
  );
};

const FilterBarStyled = styled('div')({
  borderBottom: '1px solid #dddddd',
  borderTop: '1px solid #dddddd',
  marginBottom: '16px',
});

const groupStyled = {
  borderLeft: '1px solid #dddddd',
  borderRight: '1px solid #dddddd',
  padding: '20px',
};

export default FilterBar;
