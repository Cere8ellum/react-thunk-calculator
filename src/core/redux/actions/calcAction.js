import { fetchResult } from "../../api/api";

export const CAR_PRICE = "CAR_PRICE";
export const CAR_PRICE_TYPING = "CAR_PRICE_TYPING";
export const INITIAL_FEE = "INITIAL_FEE";
export const INITIAL_FEE_TYPING = "INITIAL_FEE_TYPING";
export const LEASE_TERM = "LEASE_TERM";
export const LEASE_TERM_TYPING = "LEASE_TERM_TYPING";
export const SUBMIT_LOADING = "SUBMIT_LOADING";
export const SUBMIT_SUCCESS = "SUBMIT_SUCCESS";
export const ERROR = "ERROR";

/*ACTION CREATORS*/
export function setCarPrice(data) {
  return {
    type: CAR_PRICE,
    payload: data,
  };
}

export function setCarPriceTyping(data) {
  return {
    type: CAR_PRICE_TYPING,
    payload: data,
  };
}

export function setInitFee(data) {
  return {
    type: INITIAL_FEE,
    payload: data,
  };
}

export function setInitFeeTyping(data) {
  return {
    type: INITIAL_FEE_TYPING,
    payload: data,
  };
}

export function setLeaseTerm(data) {
  return {
    type: LEASE_TERM,
    payload: data,
  };
}

export function setLeaseTermTyping(data) {
  return {
    type: LEASE_TERM_TYPING,
    payload: data,
  };
}

export function setLoading(data = false) {
  return {
    type: SUBMIT_LOADING,
    payload: data,
  };
}

export function setResult(data = null) {
  return {
    type: SUBMIT_SUCCESS,
    payload: data,
  };
}

export function setError(status = false, data = null) {
  return {
    type: ERROR,
    payload: [status, data],
  };
}

export const getCalcResult = () => {
  return (dispatch) => {
    try {
      dispatch(setError());
      dispatch(setResult());
      dispatch(setLoading(true));

      return fetchResult()
        .then(
          (res) => {
            dispatch(setLoading());
            dispatch(setError());
            dispatch(setResult(res));
          },
          (rej) => {
            dispatch(setLoading());
            dispatch(setError(true, rej));
          }
        )
        .catch((e) => dispatch(setError(true, e.message)));
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};
