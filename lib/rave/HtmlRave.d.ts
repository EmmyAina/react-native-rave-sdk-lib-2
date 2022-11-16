interface HtmlRaveInterface {
    FLW_PUBLIC_KEY: string;
    tx_ref: string;
    amount: number;
    currency: string;
    country: string;
    payment_options: string;
    redirect_url: string;
    consumer_id: number;
    consumer_mac: string;
    email: string;
    phone_number: string;
    name: string;
    title: string;
    description: string;
    logo: string;
}
export declare const HtmlRave: (props: HtmlRaveInterface) => any;
export {};
