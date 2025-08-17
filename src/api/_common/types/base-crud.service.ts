import type {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    Repository,
} from "typeorm";

import type { IBaseCrudService } from "../../../_common/types/i-base-crud-service.js";
import type { IListMeta } from "../../../_common/types/i-list-meta.js";
import type { IPaginate } from "../../../_common/types/i-paginate.js";
import type { BaseModel } from "../../../primary-database/models/base-model/base.model";

export abstract class BaseCrud<T extends BaseModel>
implements IBaseCrudService<T> {
    protected abstract readonly repository: Repository<T>;

    async findAll(searchOptions: FindManyOptions<T>): Promise<Array<T>> {
        return await this.repository.find(searchOptions);
    }

    async findOne(searchOptions: FindOneOptions<T>): Promise<T> {
        return this.repository.findOne(searchOptions);
    }

    async createOne(data: DeepPartial<T>): Promise<T> {
        const instance = this.repository.create(data);
        return this.repository.save(instance);
    }

    async updateOne(
        instanceToUpdate: T | number,
        data: DeepPartial<T>,
    ): Promise<boolean> {
        let instanceId: number;

        if (typeof instanceToUpdate === "number") {
            instanceId = instanceToUpdate;
        }
        else {
            instanceId = instanceToUpdate.id;
        }

        const updatedInstance = await this.repository.update(
            instanceId,
            data,
        );

        return updatedInstance.affected === 1;
    }

    async findAllAndPaginate(searchOptions: FindManyOptions<T>, options: IPaginate): Promise<{
        items: T[];
        meta: IListMeta;
    }> {
        const limit = Math.max(1, Math.min(100, Number(options.limit) || 10));
        const offset = Math.max(0, Number(options.offset) || 0);
        const pageNumber = Math.floor(offset / limit) + 1;

        const [items, count]: [T[], number] = await Promise.all([
            this.repository.find({ ...searchOptions, skip: offset, take: limit }),
            this.repository.count(searchOptions),
        ]);

        const pages = limit ? Math.ceil(count / limit) : 0;

        return {
            items,
            meta: {
                pageNumber,
                pages,
                items: count,
                itemsPerPage: limit,
            },
        };
    }
}
