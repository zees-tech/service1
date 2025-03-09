import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost } from "inversify-express-utils";
import  TYPES  from "../../config/types";
import { Router, Request, Response } from 'express';
import { ok } from 'assert';

@controller('/product')
export class ProxyController {
  public router: Router;

  constructor() {
    this.router = Router();
    // this.router.get('/:service/:endpoint', this.forward.bind(this));
  }

  @httpGet('/getProduct')
  async getProduct(req: Request, res: Response){
    res.status(200).json({"id":1})
  }


}