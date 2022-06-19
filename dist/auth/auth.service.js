"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/user.entity");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async hashPassword(password) {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    async onApplicationBootstrap() {
        try {
            const hashedPassword = await this.hashPassword("12345678");
            await this.userService.create({
                fullname: "Admin",
                email: "admin@demo.com",
                role: user_entity_1.UserRole.ADMIN,
                password: hashedPassword,
            });
            console.log("admin created");
        }
        catch (e) {
            console.log("ADMIN: skipping seed");
        }
    }
    createAccessToken({ userId, role, fullname, email }) {
        return (0, jsonwebtoken_1.sign)({ userId, role, fullname, email }, process.env.ACCESS_TOKEN_SECRET || "1234567890", {
            expiresIn: '15m',
        });
    }
    createRefreshToken({ userId, tokenVersion }) {
        return (0, jsonwebtoken_1.sign)({ userId, tokenVersion }, process.env.REFRESH_TOKEN_SECRET || "1234567890", {
            expiresIn: '7d',
        });
    }
    assignTokens({ userId, role, email, fullname, tokenVersion }) {
        return {
            accessToken: this.createAccessToken({ userId, role, email, fullname }),
            refreshToken: this.createRefreshToken({ userId, tokenVersion }),
        };
    }
    async refreshTokens(refreshToken) {
        const decodedRefreshToken = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET || "1234567890");
        const user = await this.userService.findOneById(decodedRefreshToken.userId);
        if (!user || user.tokenVersion !== decodedRefreshToken.tokenVersion) {
            throw new Error('Please register or sign in.');
        }
        const { id, role, email, fullname, tokenVersion } = user;
        const tokens = await this.assignTokens({ userId: id, role, email, fullname, tokenVersion });
        return Object.assign({ user }, tokens);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map