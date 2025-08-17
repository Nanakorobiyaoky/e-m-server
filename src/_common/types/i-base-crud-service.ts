import type { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

import type { IListMeta } from "./i-list-meta.js";
import type { IPaginate } from "./i-paginate.js";

export type IBaseCrudService<T> = {
    createOne: (data: DeepPartial<T>) => Promise<T>;
    findAll: (searchOptions: FindManyOptions<T>) => Promise<Array<T>>;
    findOne: (searchOptions: FindOneOptions<T>) => Promise<T>;
    updateOne: (instanceToUpdate: T | number, data: DeepPartial<T>,) => Promise<boolean>;
    findAllAndPaginate: (searchOptions: FindManyOptions<T>, options: IPaginate) => Promise<{ items: T[]; meta: IListMeta }>;
};
