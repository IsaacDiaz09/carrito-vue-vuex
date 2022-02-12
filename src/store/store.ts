import { Product } from "@/model/product.entity";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export type State = {
  products: Product[],
  cart: Product[]
}

const state: State = { products: [], cart: [] };

export const key: InjectionKey<Store<State>> = Symbol();

// export store
export const store = createStore<State>({
  state,
  mutations: {
    setProducts(state: State, prods: Product[]): void {
      state.products = prods;
    },
    setCart(state: State, cart: Product[]): void {
      state.cart = cart;
    },
    addToCart(state: State, prod: Product): void {
      state.cart.push(prod);
    },
  },
  actions: {
    async fetchData({ commit: Commit }): Promise<void> {
      try {
        const res = await fetch("db.json");
        const data = await res.json() as Product[];
        Commit("setProducts", data);
      } catch (error) {
        console.error(error);
      }
    },
    addCartDetail({ commit: Commit }, prod: Product): void {
      const alreadyExist: boolean = state.cart.indexOf(prod) > 0;
      let quantity = 1;

      if (alreadyExist) {
        quantity++;
        const clone = [...state.cart];
        clone[clone.indexOf(prod)] = { ...prod, quantity };
        Commit("setCart", clone);
      } else {
        Commit("addToCart", { ...prod, quantity });
      }
    }
  }
});

export const useStore = (): Store<State> => baseUseStore(key);