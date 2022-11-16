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
exports.verifyPayment = void 0;
const verifyPayment = ({ FLW_SECRET_KEY, ref }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.flutterwave.com/v3/transactions/${ref}/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'accept': 'application/json',
                'Authorization': `Bearer ${FLW_SECRET_KEY}`
            },
        });
        const data = yield response.json();
        return data;
    }
    catch (error) {
        return { "status": "error", "message": "Server Errors", data: { amount: 0, status: "error", currency: "NG", amount_settled: 0 } };
    }
});
exports.verifyPayment = verifyPayment;
