import { Product } from "@/model/product.entity";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export type State = {
  products: Product[],
  cart: Product[]
}

const state: State = {
  products: [], cart: []
};

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

      let current: Product[] | Product = state.cart.filter(current => current.id === prod.id);
      const exist: boolean = current.length === 1;
      // clonar estado
      const clone: Product[] = [...state.cart];

      if (exist) {
        // producto actual en el carrito
        current = current[0];
        current.quantity += 1;
        // reemplazar producto con cantidad actualizada
        const currentIndex = state.cart.indexOf(current)
        clone[currentIndex] = new Product(current.id, current.price, current.title, current.image, current.quantity);
        // commit
        Commit("setCart", clone);
      } else {
        // commit producto cantidad por defecto (1)
        clone.push(new Product(prod.id, prod.price, prod.title, prod.image));
        Commit("setCart", clone);
      }
    }
  }
});

export const useStore = (): Store<State> => baseUseStore(key);