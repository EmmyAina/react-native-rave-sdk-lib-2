interface RavePropInterface {
	FLW_PUBLIC_KEY: string;
	FLW_SECRET_KEY: string;
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
	onCancel?: any;
	onFailed?: any;
	onSuccess?: any;
	onVerifyingError?: any;
	colour: string;
	buttonText: string;
	customButton: boolean;
	submitPendingTrx?: any;
}
declare function Rave(
	props: RavePropInterface,
	{
		children,
	}: {
		children: any;
	}
): any;
declare namespace Rave {
	var defaultProps: {
		buttonText: string;
		color: string;
		amount: number;
		autoStart: boolean;
		currency: string;
		country: string;
		payment_options: string;
		consumer_id: number;
		consumer_mac: string;
		email: string;
		phone_number: string;
		name: string;
		title: string;
		description: string;
		logo: string;
	};
}
export default Rave;
