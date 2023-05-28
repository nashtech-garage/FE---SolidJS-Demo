import { Component, splitProps } from 'solid-js';
import { IFilter } from '.';
import Filter from './Filter';

interface IFilterWrapper {
  data: IFilter[];
}
const FilterWrapper: Component<IFilterWrapper> = (props) => {
  return (
    <div class='filter-wrapper'>
      {props.data.map(({ title, values }) => {
        return <Filter title={title} values={values} />;
      })}
    </div>
  );
};

export default FilterWrapper;
