import { NETWORK, PHRASE, POOLDATA } from "../../constants";

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
        default: {
            return { ...state };
        }
    }
};
export default Provider;
