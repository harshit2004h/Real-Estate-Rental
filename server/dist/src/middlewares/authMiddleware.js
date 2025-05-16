"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (allowedRules) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            const userRole = decoded["custom:role"] || "";
            req.user = {
                id: decoded.sub,
                role: userRole,
            };
            const hasAccess = allowedRules.includes(userRole.toLowerCase());
            if (!hasAccess) {
                res.status(403).json({ message: "Access Denied" });
                return;
            }
        }
        catch (error) {
            console.error("Failed to decode token: ", error);
            res.status(400).json({ message: "Invalid token" });
            return;
        }
        next();
    };
};
exports.AuthMiddleware = AuthMiddleware;
