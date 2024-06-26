"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource(app_module_1.ormConfig);
