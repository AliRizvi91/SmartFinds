"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutStatus = exports.CommissionStatus = exports.ApplicationStatus = exports.CommissionType = exports.ProgramStatus = exports.UserRole = void 0;
__exportStar(require("./src/types/auth.types"), exports);
// Shared domain types used by both apps/web and apps/api.
// Kept framework-agnostic so either app can consume it.
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["ADVERTISER"] = "ADVERTISER";
    UserRole["PUBLISHER"] = "PUBLISHER";
})(UserRole || (exports.UserRole = UserRole = {}));
var ProgramStatus;
(function (ProgramStatus) {
    ProgramStatus["DRAFT"] = "DRAFT";
    ProgramStatus["PENDING"] = "PENDING";
    ProgramStatus["ACTIVE"] = "ACTIVE";
    ProgramStatus["PAUSED"] = "PAUSED";
    ProgramStatus["EXPIRED"] = "EXPIRED";
    ProgramStatus["REJECTED"] = "REJECTED";
})(ProgramStatus || (exports.ProgramStatus = ProgramStatus = {}));
var CommissionType;
(function (CommissionType) {
    CommissionType["PERCENTAGE"] = "PERCENTAGE";
    CommissionType["FIXED"] = "FIXED";
})(CommissionType || (exports.CommissionType = CommissionType = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["PENDING"] = "PENDING";
    ApplicationStatus["APPROVED"] = "APPROVED";
    ApplicationStatus["REJECTED"] = "REJECTED";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var CommissionStatus;
(function (CommissionStatus) {
    CommissionStatus["PENDING"] = "PENDING";
    CommissionStatus["APPROVED"] = "APPROVED";
    CommissionStatus["REJECTED"] = "REJECTED";
    CommissionStatus["PAID"] = "PAID";
})(CommissionStatus || (exports.CommissionStatus = CommissionStatus = {}));
var PayoutStatus;
(function (PayoutStatus) {
    PayoutStatus["REQUESTED"] = "REQUESTED";
    PayoutStatus["PROCESSING"] = "PROCESSING";
    PayoutStatus["PAID"] = "PAID";
    PayoutStatus["FAILED"] = "FAILED";
})(PayoutStatus || (exports.PayoutStatus = PayoutStatus = {}));
