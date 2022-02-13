<template>
  <div class='container mt-2 text-center'>
    <h2>Carrito de compras - Vue + Vuex</h2>
    <hr />
    <div class='row' id='prods'>
      <card v-for='prod of products' :item='prod' :key='prod.id' @buy='buy(prod)' />
    </div>
    <h3>Carrito</h3>
    <hr />
    <cart>
      <template v-slot:body>
        <cartItem
          v-for='item of cartItems'
          :key='item.id'
          :id='item.id'
          :itemTitle='item.title'
          :quantity='item.quantity'
          :subTotal='subTotal(item)'
          @increase='increase(item)'
          @decrease='decrease(item)'
        />
      </template>
      <template v-slot:footer>
        <cartFooterIfEmpty v-if='cartItems.length === 0' />
        <cartFooterSummary
          v-else
          :totalQuantity='calcTotalProdsCart()'
          :totalValue='calcTotalValueCart()'
          @cleanCart='cleanCart'
        />
      </template>
    </cart>
  </div>
</template>

<script lang='ts'>
import card from '@/components/Card.vue'
import cart from '@/components/Cart.vue';
import cartFooterIfEmpty from '@/components/CartFooterIfEmpty.vue';
import cartFooterSummary from '@/components/CartFooterSummary.vue';
import cartItem from '@/components/CartItem.vue';
import { defineComponent, computed } from 'vue';
import { Product } from '@/model/product.entity';
import { myStore } from '@/store/store'

export default defineComponent({
  name: 'App',
  components: { card, cart, cartItem, cartFooterIfEmpty, cartFooterSummary },
  setup() {
    myStore.dispatch('fetchData');
    // obj envuelto en un computedRef<Product[]>
    const products = computed(() => myStore.state.products);
    // obtener los productos del carrito
    const cartItems = computed(() => myStore.state.cart);
    // aumentar cantidad del producto seleccionado
    const increase = (prod: Product): void => {
      prod.quantity += 1;
      myStore.dispatch('setCartDetailQuantity', prod);
    }
    // reducir cantidad del producto seleccionado
    const decrease = (prod: Product): void => {
      prod.quantity -= 1;
      myStore.dispatch('setCartDetailQuantity', prod);
    }
    // metodo para limpiar el carrito
    const cleanCart = (): void => {
      myStore.dispatch('cleanCart');
    }
    // metodo comprar
    const buy = (prod: Product): void => {
      myStore.dispatch('addCartDetail', prod);
    }
    return { products, buy, cartItems, increase, decrease, cleanCart }
  },
  methods: {
    // hallar subtotal 
    subTotal(prod: Product): number { return prod.price * prod.quantity },
    // calcular valor total productos carrito
    calcTotalValueCart(): number { return myStore.state.cart.reduce((acc, { price, quantity }) => acc + quantity * price, 0) },
    // calcular total productos
    calcTotalProdsCart(): number { return myStore.state.cart.reduce((acc, { quantity }) => acc + quantity, 0) },
  }
});
</script>