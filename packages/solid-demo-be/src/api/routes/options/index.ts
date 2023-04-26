import { Router } from 'express';
import {
  ProductOption,
  ProductService,
  ProductOptionValue,
} from '@medusajs/medusa';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const groupByCategory = (
  arr: ProductOption[]
): Record<string, ProductOption[]> =>
  arr.reduce((group, option) => {
    const { title } = option;
    group[title] = group[title] ?? [];

    group[title].push(option);
    return group;
  }, {});

type ValueResponse = {
  id: string;
  value: string;
};

interface IDataResponse {
  title: string;
  values: ValueResponse[];
}

router.get('/store/option-filter', async (req, res) => {
  const productService: ProductService = req.scope.resolve('productService');
  const options = await productService
    .list({}, { relations: ['options', 'options.values'] })
    .then((result): ProductOption[] =>
      result.reduce((pre, curr) => [...pre, ...curr.options], [])
    );

  const optionGroups = groupByCategory(options);

  const dataRes: IDataResponse[] = [];

  for (const property in optionGroups) {
    console.log(`${property}: ${optionGroups[property]}`);
    const currValues: ProductOptionValue[] = optionGroups[property].reduce(
      (pre, curr): ProductOptionValue[] => [...pre, ...curr.values],
      []
    );
    const valueFiltered: ValueResponse[] = Array.from(
      new Set(currValues.map((curr) => curr.value))
    ).map((val) => ({ id: uuidv4(), value: val }));
    const newGroupObj: IDataResponse = {
      title: property,
      values: valueFiltered,
    };
    dataRes.push(newGroupObj);
  }

  res.json({
    data: dataRes,
  });
});

export default router;
