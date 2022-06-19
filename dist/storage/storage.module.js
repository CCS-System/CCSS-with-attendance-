"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const storage_controller_1 = require("./storage.controller");
const mime_types_1 = require("mime-types");
const multer_1 = require("multer");
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploads',
                storage: (0, multer_1.diskStorage)({
                    destination: "./uploads",
                    filename: function (req, { filename, mimetype }, cb) {
                        const file = Buffer.from(`${filename}_${Date.now()}`).toString('base64url') + `.${(0, mime_types_1.extension)(mimetype)}`;
                        cb(null, file);
                    }
                }),
            }),
        ],
        controllers: [storage_controller_1.StorageController]
    })
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map