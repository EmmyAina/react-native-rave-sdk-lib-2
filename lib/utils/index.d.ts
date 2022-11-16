export interface VerifyPaymentInterface {
    FLW_SECRET_KEY: string;
    ref: string;
}
export interface InResponse {
    status: string;
    message: string;
    data: {
        amount: number;
        status: string;
        currency: string;
        amount_settled: number;
    };
}
export declare const verifyPayment: ({ FLW_SECRET_KEY, ref }: VerifyPaymentInterface) => Promise<InResponse>;
