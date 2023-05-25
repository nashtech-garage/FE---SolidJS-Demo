import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@suid/material';
import { Component, splitProps } from 'solid-js';
import { ProductFilterAction, dispatchProductFilter, productFilterStore } from '../../store/product';

export interface IFilter {
  title: string;
  values: {
    id: string;
    value: string;
  }[];
}
const Filter: Component<IFilter> = (props) => {
  const productFilterData = () => productFilterStore.data;
  const [{ title, values: options }] = splitProps(props, ['title', 'values']);

  const onFilter = async (value: string) => {
    const filterData = productFilterData();
    const type = title.toLocaleLowerCase();
    const group = filterData?.options.find((option) => option.type === type);

    await dispatchProductFilter(ProductFilterAction.FilterProduct, {
      ...filterData,
      options: group
        ? filterData?.options.map((option) => {
            if (option.type !== type) return option;
            const isChecked = option.values?.find((_value) => _value === value);
            if (isChecked)
              return {
                type,
                values: option.values.filter((_value) => _value !== value),
              };

            return {
              type,
              values: [...option.values, value],
            };
          })
        : [
            ...(filterData?.options ?? []),
            {
              type,
              values: [value],
            },
          ],
    });
  };

  const checkIsChecked = (value: string) => {
    const data = productFilterData();
    const group = data?.options.find(({ type }) => type === title.toString().toLocaleLowerCase());
    if (group) {
      return !!group.values.find((_value) => _value === value);
    }
    return false;
  };

  return (
    <div class='filter-option'>
      <TiltleStyled>{title}</TiltleStyled>
      <div class='filter-option__content'>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {options.map(({ id, value }) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={id} sx={{ padding: '0 8px' }}>
                <ListItemButton role={undefined} onClick={() => onFilter(value)} dense>
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <CheckboxStyled
                      edge='start'
                      tabIndex={-1}
                      checked={checkIsChecked(value)}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

const CheckboxStyled = styled(Checkbox)({
  padding: 0,
  marginRight: '16px',
});

const TiltleStyled = styled('div')({
  position: 'relative',
  cursor: 'pointer',
  textTransform: 'uppercase',
  fontSize: '16px',
  color: '#444',
  fontWeight: 600,
  margin: '30px 0 0',
});

export default Filter;
