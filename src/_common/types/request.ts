import type { Request } from "express";

import type { IUser } from "./i-user.js";

export type _Request = Request & { user?: IUser };
