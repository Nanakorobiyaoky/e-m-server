import type { Router } from "express";

export type IController = {
    readonly _router: Router;
};
