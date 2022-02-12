<template>
  <div class="container mt-2 text-center">
    <h2>Carrito de compras - Vue + Vuex</h2>
    <hr />
    <div class="row" id="prods">
      <card v-for="prod of products" :item="prod" :key="prod.id" @buy="buy(prod)" />
    </div>
    <h3>Carrito</h3>
    <hr />
    <cart>
      <template v-slot:body>
        <cartItem
          v-for="item of cartItems"
          :key="item.id"
          :id="item.id"
          :itemTitle="item.title"
          :quantity="item.quantity"
          :subTotal="subTotal(item)"
        />
      </template>
      <template v-slot:footer>
        <cartFooterIfEmpty v-if="cartItems.length === 0"/>
        <cartFooterSummary v-else />
      </template>
    </cart>
  </div>
</template>

<script lang="ts">
import card from "@/components/Card.vue"
import cart from "@/components/Cart.vue";
import cartFooterIfEmpty from "@/components/CartFooterIfEmpty.vue";
import cartFooterSummary from "./components/CartFooterSummary.vue";
import cartItem from "@/components/CartItem.vue";
import { defineComponent, computed } from 'vue';
import { State, useStore } from "@/store/store";
import { Store, } from "vuex";
import { Product } from './model/product.entity';

export default defineComponent({
  name: 'App',
  components: { card, cart, cartItem, cartFooterIfEmpty, cartFooterSummary },
  setup() {
    const store: Store<State> = useStore()
    store.dispatch("fetchData");
    // obj envuelto en un computedRef<Product[]>
    const products = computed(() => store.state.products);
    // obtener los productos del carrito
    const cartItems = computed(() => store.state.cart);

    // metodo comprar
    const buy = (prod: Product): void => {
      store.dispatch("addCartDetail", prod);
    }
    return { products, buy, cartItems }
  },
  methods: {
    // hallar subtotal 
    subTotal(prod: Product): number { return prod.price * prod.quantity }
  }
});
</script>