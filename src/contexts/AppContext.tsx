import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

// =================================================================================
type InitialState = { cart: CartItem[]; isHeaderFixed: boolean };

export type CartItem = {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};

type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: CartItem };
type LayoutActionType = { type: "TOGGLE_HEADER"; payload: boolean };
type ActionType = CartActionType | LayoutActionType;

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

const INITIAL_STATE = { cart: getInitialCart(), isHeaderFixed: false };

interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let existIndex = cartList.findIndex((item) => item.id === cartItem.id);

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
        // If the item doesn't exist, add it to the cart
        cartList.push(cartItem);
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
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
