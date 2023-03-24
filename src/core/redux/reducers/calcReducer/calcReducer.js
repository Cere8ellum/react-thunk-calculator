import * as types from "../../actions/calcAction";

const initialState = {
  carPrice: {
    value: 3300000,
    typingValue: 3300000,
  },
  initialFee: {
    value: 13,
    typingValue: 0,
  },
  leaseTerm: {
    value: 60,
    typingValue: 60,
  },
  loading: false,
  error: { status: false, text: null },
  result: null,
};

export const calcReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CAR_PRICE:
      if (action.payload)
        return {
          ...state,
          carPrice: {
            ...state.carPrice,
            value: action.payload,
            typingValue: action.payload,
          },
        };
    case types.CAR_PRICE_TYPING:
      if (action.payload)
        return {
          ...state,
          carPrice: { ...state.carPrice, typingValue: action.payload },
        };
    case types.INITIAL_FEE:
      return {
        ...state,
        initialFee: {
          ...state.initialFee,
          value: action.payload,
          typingValue: 0,
        },
      };
    case types.INITIAL_FEE_TYPING:
      return {
        ...state,
        initialFee: {
          ...state.initialFee,
          typingValue: action.payload,
        },
      };
    case types.LEASE_TERM:
      return {
        ...state,
        leaseTerm: {
          ...state.leaseTerm,
          value: action.payload,
          typingValue: action.payload,
        },
      };
    case types.LEASE_TERM_TYPING:
      return {
        ...state,
        leaseTerm: {
          ...state.leaseTerm,
          typingValue: action.payload,
        },
      };

    case types.SUBMIT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case types.SUBMIT_SUCCESS:
      return {
        ...state,
        result: action.payload,
      };

    case types.ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          status: action.payload[0],
          text: action.payload[1],
        },
      };

    default:
      return state;
  }
};
