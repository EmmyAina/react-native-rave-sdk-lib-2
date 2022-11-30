"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlRave = void 0;
const HtmlRave = (props) => {
	const {
		FLW_PUBLIC_KEY,
		tx_ref,
		amount,
		currency,
		country,
		payment_options,
		redirect_url,
		consumer_id,
		consumer_mac,
		email,
		phone_number,
		name,
		title,
		description,
		logo,
	} = props;
	return `
   <!DOCTYPE html>
   <html lang="en">
           <head>
               <meta charset="UTF-8">
               <meta http-equiv="X-UA-Compatible" content="ie=edge">
               <!-- Latest compiled and minified CSS -->
               <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
               <!-- Fonts -->
               <link rel="dns-prefetch" href="//fonts.gstatic.com">
               <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
               <title>React Native Rave SDK</title>
               <style>
                   body {
                       margin: 0;
                       padding:0,
                       width: 100vw;
                       height: 100vh;
                   };
                   form{
                       margin: 0;
                       padding:0,
                       width: 100vw;
                       height: 100vh;
                   }
               </style>
           </head>
           <body  onload="makePayment()" style="background-color:#fff;height:100vh ">
                <script src="https://checkout.flutterwave.com/v3.js"></script>
                <script>
                   window.onload = makePayment();
                   function makePayment() {
                       FlutterwaveCheckout({
                           public_key: "${FLW_PUBLIC_KEY}",
                           tx_ref: "${tx_ref}",
                           amount: ${amount},
                           currency: "${currency}",
                            meta: {
                                consumer_id: "${consumer_id}",
                                consumer_mac: "${consumer_mac}",
                            },
                            customer: {
                                email: "${email}",
                                phone_number: "${phone_number}",
                                name: "${name}",
                            },
                            customizations: {
                                title: "${title}",
                                description: "${description}",
                                logo: "${logo}",
                            },

                            callback: function (data) {
                                const txid = data.transaction_id
                                const resp = {event:data.status, transactionRef:data, txid};
                                window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                            },

                            onclose: function() {
                                const resp = {event:'cancelled'};
                                return window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                            },
                       });
                   }
               </script>
           </body>
   </html>`;
};
exports.HtmlRave = HtmlRave;
