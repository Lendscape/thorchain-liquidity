import {
    BCHADDRESS,
    BNBADDRESS,
    BTCADDRESS,
    NETWORK,
    PHRASE,
    POOLDATA,
    THORADDRESS,
} from "../../constants";

const Provider = (state = {}, action) => {
    switch (action.type) {
        case NETWORK: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case PHRASE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case POOLDATA: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case THORADDRESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case BNBADDRESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case BTCADDRESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case BCHADDRESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return { ...state };
        }
    }
};
export default Provider;
