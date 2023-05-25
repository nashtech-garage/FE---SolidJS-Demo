import { Component } from 'solid-js';
import { IFilter } from '.';
import Filter from './Filter';

interface IFilterWrapper {
  data: IFilter[];
}
const FilterWrapper: Component<IFilterWrapper> = ({ data }) => {
  return (
    <div class='filter-wrapper'>
      {data.map(({ title, values }) => {
        return <Filter title={title} values={values} />;
      })}
    </div>
  );
};

export default FilterWrapper;
