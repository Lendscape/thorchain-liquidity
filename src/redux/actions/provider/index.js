import { NETWORK, PHRASE, POOLDATA } from "../../constants";

export const onchange_network = (params) => {
    return (dispatch) => {
        dispatch({
            type: NETWORK,
            payload: { network: params },
        });
    };
};

export const onsave_phrase = (params) => {
    return (dispatch) => {
        dispatch({
            type: PHRASE,
            payload: { phrase: params },
        });
    };
};

export const onsave_pooldata = (params) => {
    return (dispatch) => {
        dispatch({
            type: POOLDATA,
            payload: { phrase: params },
        });
    };
};
