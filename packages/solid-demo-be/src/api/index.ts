import { Router } from "express"
import optionRouter from './routes/options';

export default (rootDirectory: string): Router | Router[] => {
  // add your custom routes here
  return [optionRouter]
}
