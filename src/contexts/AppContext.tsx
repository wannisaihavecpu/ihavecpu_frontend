import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

// =================================================================================
type InitialState = {
  cart: CartItem[];
  isHeaderFixed: boolean;
  customerDetail: CustomerDetails[];
};

export type CartItem = {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  optionId?: number;
};

export type CustomerDetails = {
  customOption?: number;
  ship_firstname?: string;
  ship_lastname?: string;
  ship_email?: string;
  ship_mobile?: string;
  ship_address1?: string;
  ship_subdistrict?: string;
  ship_state?: string;
  ship_city?: string;
  ship_postcode?: string;
  bill_firstname?: string;
  bill_lastname?: string;
  bill_companyname?: string;
  bill_tax_id?: string;
  bill_mobile?: string;
  bill_address1?: string;
  bill_subdistrict?: string;
  bill_state?: string;
  bill_city?: string;
  bill_postcode?: string;
  paymentMethod?: string;
  deliveryOption?: string;
  request_tax?: boolean;
  shippingOption?: number;
  paymentOption?: number;
  bankOption?: number;
  termOption?: number;
  use_point?: number;
  code_coupon?: number;
};

type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: CartItem };
type UpdateCustomerDetailsPurchaseActionType = {
  type: "UPDATE_CUSTOMER_DETAILS_PURCHASE";
  payload: CustomerDetails;
};
type LayoutActionType = { type: "TOGGLE_HEADER"; payload: boolean };
type ActionType =
  | CartActionType
  | LayoutActionType
  | UpdateCustomerDetailsPurchaseActionType;

const INITIAL_CUSTOMER_DETAILS: CustomerDetails = {
  customOption: 1,
  ship_firstname: "",
  ship_lastname: "",
  ship_email: "",
  ship_mobile: "",
  ship_address1: "",
  ship_subdistrict: "",
  ship_state: "",
  ship_city: "",
  ship_postcode: "",

  bill_firstname: "",
  bill_lastname: "",
  bill_companyname: "",
  bill_tax_id: "",
  bill_mobile: "",
  bill_address1: "",
  bill_subdistrict: "",
  bill_state: "",
  bill_city: "",
  bill_postcode: "",
  request_tax: false,
  paymentMethod: "",
  deliveryOption: "",
  shippingOption: null,

  paymentOption: null,
  bankOption: null,
  termOption: null,

  use_point: null,
  code_coupon: null,
};

// =================================================================================

const getInitialCart = () => {
  if (typeof window !== "undefined") {
    // check if window (browser) is defined, indicating it's running on the client side
    const cartJSON = localStorage.getItem("cart");
    return cartJSON ? JSON.parse(cartJSON) : [];
  } else {
    // if running on the server side (server-side rendering) return an empty array
    return [];
  }
};

const INITIAL_CART = getInitialCart();

const INITIAL_STATE: InitialState = {
  cart: INITIAL_CART,
  isHeaderFixed: false,
  customerDetail: [INITIAL_CUSTOMER_DETAILS],
};

interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
  updateCustomerDetailsPurchase: (details: CustomerDetails) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {},
  updateCustomerDetailsPurchase: () => {},
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "UPDATE_CUSTOMER_DETAILS_PURCHASE":
      return { ...state, customerDetail: [action.payload] };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let existIndex;

      if (cartItem.optionId) {
        // If the item has an optionId, check both id and optionId
        existIndex = cartList.findIndex(
          (item) =>
            item.id === cartItem.id && item.optionId === cartItem.optionId
        );
      } else {
        // If the item doesn't have an optionId, check only id
        existIndex = cartList.findIndex((item) => item.id === cartItem.id);
      }

      if (cartItem.qty < 1) {
        // If quantity is less than 1, remove the item from the cart
        if (existIndex !== -1) {
          cartList.splice(existIndex, 1);
          if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartList));
          }
        }
        return { ...state, cart: [...cartList] };
      }

      if (existIndex !== -1) {
        // If the item exists in the cart, update the quantity
        cartList[existIndex].qty = cartItem.qty;
      } else {
        // If the item doesn't exist, add it to the cart with a unique optionId
        const newCartItem: CartItem = {
          ...cartItem,
          optionId:
            cartItem.optionId !== undefined
              ? parseInt(cartItem.optionId.toString())
              : undefined,
        };
        cartList.push(newCartItem);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cartList));
      }

      return { ...state, cart: [...cartList] };

    default:
      return state;
  }
};

// =======================================================
type AppProviderProps = { children: ReactNode };
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const updateCustomerDetailsPurchase = (details: CustomerDetails) => {
    dispatch({ type: "UPDATE_CUSTOMER_DETAILS_PURCHASE", payload: details });
  };
  const contextValue = useMemo(
    () => ({ state, dispatch, updateCustomerDetailsPurchase }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
