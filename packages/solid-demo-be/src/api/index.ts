import { Router } from "express"
import optionRouter from './routes/options';
import productFilter from './routes/filterProduct';

export default (rootDirectory: string): Router | Router[] => {
  // add your custom routes here
return [optionRouter, productFilter]
}
