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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_autoheight_webview_1 = __importDefault(require("react-native-autoheight-webview"));
const utils_1 = require("../utils");
const HtmlRave_1 = require("./HtmlRave");
function Rave(props) {
    const { FLW_PUBLIC_KEY, tx_ref, amount, currency, country, payment_options, redirect_url, consumer_id, consumer_mac, email, phone_number, name, title, description, logo, colour, buttonText } = props;
    const meta = {
        consumer_id,
        consumer_mac,
    };
    const customer = {
        email,
        phone_number,
        name,
    };
    const customizations = {
        title,
        description,
        logo,
    };
    const [value, setvalue] = (0, react_1.useState)({
        visible: false,
        loading: false,
        verify: false,
    });
    const { visible, loading, verify } = value;
    const mounted = react_1.default.useRef(true);
    const startTransaction = () => {
        setvalue(Object.assign(Object.assign({}, value), { visible: true }));
    };
    (0, react_1.useEffect)(() => {
        return () => {
            mounted.current = false;
        };
    }, []);
    const messageRecived = (data) => __awaiter(this, void 0, void 0, function* () {
        const webResponse = JSON.parse(data);
        switch (webResponse.event) {
            case "cancelled":
                {
                    try {
                        setvalue(Object.assign(Object.assign({}, value), { visible: false, loading: false }));
                        return props.onCancel({ "error": "Transaction was cancelled" });
                    }
                    catch (error) {
                        setvalue(Object.assign(Object.assign({}, value), { visible: false, loading: false }));
                        return props.onCancel({ "error": "Transaction was cancelled" });
                    }
                }
                break;
            case "failed":
                {
                    try {
                        setvalue(Object.assign(Object.assign({}, value), { visible: false, loading: false }));
                        return props.onFailed({ "error": "Transaction was Failed", data: webResponse });
                    }
                    catch (error) {
                        setvalue(Object.assign(Object.assign({}, value), { visible: false, loading: false }));
                        return props.onFailed({ "error": "Transaction was Failed", data: webResponse });
                    }
                }
                break;
            case "successful":
                {
                    try {
                        setvalue(Object.assign(Object.assign({}, value), { verify: true, visible: false, loading: false }));
                        const { FLW_SECRET_KEY } = props;
                        const ref = webResponse.txid;
                        const resp = yield (0, utils_1.verifyPayment)({ FLW_SECRET_KEY, ref });
                        if (resp.data.status === "successful" && resp.data.currency === props.currency && resp.data.amount === props.amount) {
                            setvalue(Object.assign(Object.assign({}, value), { verify: false, loading: false, visible: false }));
                            return props.onSuccess({ data: resp, deposit: resp.data.amount_settled });
                        }
                        else {
                            setvalue(Object.assign(Object.assign({}, value), { verify: false, loading: false, visible: false }));
                            return props.onVerifyingError({ "error": "Error in verifying user payment, However, user may bill" });
                        }
                    }
                    catch (error) {
                        setvalue(Object.assign(Object.assign({}, value), { visible: false, loading: false }));
                        return props.onFailed({ "error": "Transaction was Failed", data: webResponse });
                    }
                }
                break;
            default:
                try {
                    setvalue(Object.assign(Object.assign({}, value), { visible: false, loading: false }));
                    return props.onCancel({ "error": "Transaction errors", data: webResponse });
                }
                catch (error) {
                    return props.onCancel({ "error": "Transaction errors", data: webResponse });
                }
        }
    });
    const payLoad = {
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
    };
    return (<react_native_1.View style={styles.container}>
                <react_native_1.Modal style={styles.modalView} visible={visible} animationType="slide" transparent={true}>
                    <react_native_autoheight_webview_1.default source={{ html: (0, HtmlRave_1.HtmlRave)(payLoad) }} style={styles.wevView} onMessage={e => { messageRecived(e.nativeEvent.data); }} onLoadStart={() => setvalue(Object.assign(Object.assign({}, value), { loading: true }))} onLoadEnd={() => setvalue(Object.assign(Object.assign({}, value), { loading: false }))} javaScriptEnabled viewportContent={'width=device-width, user-scalable=no'}/> 
                    {loading && <react_native_1.ActivityIndicator size="large" color={colour}/>}
                </react_native_1.Modal>
                <>
                    {verify ?
            <>
                            <react_native_1.Modal style={styles.modalView} visible={verify} animationType="slide" transparent={false}>
                                <react_native_1.View style={{
                    flex: 1,
                    height,
                    width,
                    paddingHorizontal: 30,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                                    <react_native_1.Text>Wait !, verifying your payment </react_native_1.Text>
                                    <react_native_1.ActivityIndicator size="large" color={colour}/>
                                </react_native_1.View>
                            </react_native_1.Modal>
                            </>
            :
                <>
                                <react_native_1.Button color={colour} disabled={loading} title={buttonText} onPress={() => setvalue(Object.assign(Object.assign({}, value), { visible: true }))}/>
                            </>}
                </>
            </react_native_1.View>);
}
exports.default = Rave;
const { height, width } = react_native_1.Dimensions.get('screen');
const styles = react_native_1.StyleSheet.create({
    container: {},
    modalView: {
        flex: 1,
        height,
        width,
        margin: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    wevView: {
        height,
        width,
        marginVertical: 10,
    }
});
Rave.defaultProps = {
    buttonText: "Pay Now",
    color: '#EDB107',
    amount: 10,
    autoStart: false,
    currency: "NGN",
    country: "NG",
    payment_options: "card, mobilemoneyghana, ussd",
    consumer_id: 23,
    consumer_mac: "92a3-912ba-1192a",
    email: "test@test.com",
    phone_number: "09030304567",
    name: "Rave SDK",
    title: "Rave SDK",
    description: "React native Rave SDK",
    logo: "https://reactnative.dev/img/tiny_logo.png",
};
