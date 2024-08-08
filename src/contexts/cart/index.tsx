import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';

interface OrderItem {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderList {
  [storeName: string]: {
    [itemName: string]: OrderItem;
  };
}

interface CartState {
  orders: OrderList | any;
  voucherValue: number;
  voucherCode: string;
}

interface CartContextType extends CartState {
  addOrderItem: (storeName: string, item: OrderItem) => void;
  removeOrderItem: (storeName: string, itemName: string) => void;
  setVoucherCode: (text: string) => void;
  handleCheckorRemoveVoucher: () => void;
  completeOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  deleteAllOrderOfOne: (storeName: string, itemName: string) => void;
}

type CartAction =
  | { type: 'ADD_ORDER_ITEM'; payload: { storeName: string; item: OrderItem } }
  | {
      type: 'REMOVE_ORDER_ITEM';
      payload: { storeName: string; itemName: string };
    }
  | { type: 'SET_VOUCHER_CODE'; payload: string }
  | { type: 'HANDLE_CHECK_OR_REMOVE_VOUCHER' }
  | { type: 'COMPLETE_ORDER'; payload: string }
  | { type: 'DELETE_ORDER'; payload: string }
  | {
      type: 'DELETE_ALL_ORDER_OF_ONE';
      payload: { storeName: string; itemName: string };
    };

const initialState: CartState = {
  orders: {},
  voucherValue: 0,
  voucherCode: '',
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM': {
      const { storeName, item } = action.payload;
      const storeOrders = state.orders[storeName] || {};
      const existingItem = storeOrders[item.name];

      return {
        ...state,
        orders: {
          ...state.orders,
          [storeName]: {
            ...storeOrders,
            [item.name]: existingItem
              ? { ...existingItem, quantity: existingItem.quantity + 1 }
              : item,
          },
        },
      };
    }
    case 'REMOVE_ORDER_ITEM': {
      const { storeName, itemName } = action.payload;
      const storeOrders = state.orders[storeName];

      if (!storeOrders) return state;

      const existingItem = storeOrders[itemName];
      if (!existingItem) return state;

      const updatedStoreOrders = { ...storeOrders };
      if (existingItem.quantity > 1) {
        updatedStoreOrders[itemName] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      } else {
        delete updatedStoreOrders[itemName];
      }

      return {
        ...state,
        orders: {
          ...state.orders,
          [storeName]: Object.keys(updatedStoreOrders).length
            ? updatedStoreOrders
            : undefined,
        },
      };
    }

    case 'SET_VOUCHER_CODE':
      return { ...state, voucherCode: action.payload };
    case 'HANDLE_CHECK_OR_REMOVE_VOUCHER':
      return {
        ...state,
        voucherValue: state.voucherValue > 0 ? 0 : 5,
        voucherCode: state.voucherValue > 0 ? '' : state.voucherCode,
      };
    case 'COMPLETE_ORDER': {
      const { payload: storeId } = action;
      const { [storeId]: _, ...remainingOrders } = state.orders;
      return {
        ...state,
        orders: remainingOrders,
        voucherCode: '',
        voucherValue: 0,
      };
    }
    case 'DELETE_ORDER': {
      const { payload: storeId } = action;
      const { [storeId]: _, ...remainingOrders } = state.orders;
      return {
        ...state,
        orders: remainingOrders,
        voucherCode: '',
        voucherValue: 0,
      };
    }

    case 'DELETE_ALL_ORDER_OF_ONE': {
      const { storeName, itemName } = action.payload;
      const newOrders = { ...state.orders };

      if (newOrders[storeName] && newOrders[storeName][itemName]) {
        delete newOrders[storeName][itemName];
        if (Object.keys(newOrders[storeName]).length === 0) {
          delete newOrders[storeName];
        }
      }

      return {
        ...state,
        orders: newOrders,
      };
    }
    default:
      return state;
  }
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addOrderItem = useCallback((storeName: string, item: OrderItem) => {
    dispatch({ type: 'ADD_ORDER_ITEM', payload: { storeName, item } });
  }, []);

  const removeOrderItem = useCallback((storeName: string, itemName: string) => {
    dispatch({ type: 'REMOVE_ORDER_ITEM', payload: { storeName, itemName } });
  }, []);

  const setVoucherCode = (text: string) => {
    dispatch({ type: 'SET_VOUCHER_CODE', payload: text });
  };

  const handleCheckorRemoveVoucher = () => {
    dispatch({ type: 'HANDLE_CHECK_OR_REMOVE_VOUCHER' });
  };

  const completeOrder = (id: string) => {
    dispatch({ type: 'COMPLETE_ORDER', payload: id });
  };

  const deleteOrder = (id: string) => {
    dispatch({ type: 'DELETE_ORDER', payload: id });
  };

  const deleteAllOrderOfOne = (storeName: string, itemName: string) => {
    dispatch({
      type: 'DELETE_ALL_ORDER_OF_ONE',
      payload: { storeName, itemName },
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addOrderItem,
        removeOrderItem,
        setVoucherCode,
        handleCheckorRemoveVoucher,
        completeOrder,
        deleteOrder,
        deleteAllOrderOfOne,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
