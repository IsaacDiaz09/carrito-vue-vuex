<template>
  <div class="container mt-2 text-center">
    <h2>Carrito de compras - Vue + Vuex</h2>
    <hr />
    <div class="row" id="prods">
      <card v-for="prod of products" :item="prod" :key="prod.id" @buy="buy(prod)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import card from "@/components/Card.vue"
import { State, useStore } from "@/store/store";
import { Store, } from "vuex";
import { Product } from './model/product.entity';

export default defineComponent({
  name: 'App',
  components: { card },
  setup() {
    const store: Store<State> = useStore()
    store.dispatch("fetchData");
    // obj envuelto en un computedRef<Product[]>
    const products = computed(() => store.state.products);
    // metodo comprar
    const buy = (prod: Product) => {
      console.log(prod)
    }
    return { products, buy }
  }
});
</script>