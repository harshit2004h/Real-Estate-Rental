"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteProperty = exports.addFavoriteProperty = exports.getCurrentResidences = exports.updateTenant = exports.createTenant = exports.getTenant = void 0;
const client_1 = require("@prisma/client");
const wkt_1 = require("@terraformer/wkt");
const prisma = new client_1.PrismaClient();
const getTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const tenant = yield prisma.tenant.findUnique({
            where: {
                cognitoId: cognitoId,
            },
            include: {
                favorites: true,
            },
        });
        if (tenant) {
            res.json(tenant);
        }
        else {
            res.status(404).json({ message: "Tenant not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving tenant: , ${error.message}` });
    }
});
exports.getTenant = getTenant;
const createTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const tenant = yield prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });
        res.status(201).json(tenant);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating tenant: , ${error.message}` });
    }
});
exports.createTenant = createTenant;
const updateTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        const updateTenant = yield prisma.tenant.update({
            where: {
                cognitoId: cognitoId,
            },
            data: {
                name,
                email,
                phoneNumber,
            },
        });
        res.json(updateTenant);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error upadating tenant: , ${error.message}` });
    }
});
exports.updateTenant = updateTenant;
const getCurrentResidences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const properties = yield prisma.property.findMany({
            where: {
                tenants: { some: { cognitoId: cognitoId } },
            },
            include: {
                location: true,
            },
        });
        const residencesWithFormattedLocation = yield Promise.all(properties.map((property) => __awaiter(void 0, void 0, void 0, function* () {
            const coordinates = yield prisma.$queryRaw `SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;
            const geoJSON = (0, wkt_1.wktToGeoJSON)(coordinates[0].coordinates || "");
            const longitude = geoJSON.coordinates[0];
            const latitude = geoJSON.coordinates[1];
            return Object.assign(Object.assign({}, property), { location: Object.assign(Object.assign({}, property.location), { coordinates: {
                        longitude,
                        latitude,
                    } }) });
        })));
        res.json(residencesWithFormattedLocation);
    }
    catch (error) {
        res.status(500).json({
            message: `Error getting current Residences: , ${error.message}`,
        });
    }
});
exports.getCurrentResidences = getCurrentResidences;
const addFavoriteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId, propertyId } = req.params;
        const tenant = yield prisma.tenant.findUnique({
            where: {
                cognitoId: cognitoId,
            },
            include: {
                favorites: true,
            },
        });
        const propertyIdNumber = Number(propertyId);
        const existingFavorite = (tenant === null || tenant === void 0 ? void 0 : tenant.favorites) || [];
        if (!existingFavorite.some((fav) => fav.id === propertyIdNumber)) {
            const updatedTenant = yield prisma.tenant.update({
                where: {
                    cognitoId: cognitoId,
                },
                data: {
                    favorites: {
                        connect: { id: propertyIdNumber },
                    },
                },
                include: {
                    favorites: true,
                },
            });
            res.json(updatedTenant);
        }
        else {
            res.status(409).json({
                message: "Property is already in favorites",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error adding favorite property: , ${error.message}`,
        });
    }
});
exports.addFavoriteProperty = addFavoriteProperty;
const removeFavoriteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId, propertyId } = req.params;
        const propertyIdNumber = Number(propertyId);
        const updatedTenant = yield prisma.tenant.update({
            where: {
                cognitoId: cognitoId,
            },
            data: {
                favorites: {
                    disconnect: { id: propertyIdNumber },
                },
            },
            include: {
                favorites: true,
            },
        });
        res.json(updatedTenant);
    }
    catch (error) {
        res.status(500).json({
            message: `Error removing favorite property: , ${error.message}`,
        });
    }
});
exports.removeFavoriteProperty = removeFavoriteProperty;
