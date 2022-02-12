<template>
  <div class="col-12 col-md-4 col-sm-6 col-lg-3 mb-2">
    <div class="card">
      <div class="card-header">
        <h5>{{ item.title }}</h5>
      </div>
      <img class="card-img-top" :src="item.image" :alt="item.title" :title="item.title" />
      <div class="card-body">
        <p class="card-text fw-bold">${{ item.price }}</p>
        <div class="d-grid gap-1">
          <button type="button" class="btn btn-dark" @click="buy">Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Product } from "@/model/product.entity";

export default defineComponent({
  name: "card",
  props: {
    item: {
      type: Product,
      required: true,
    },
  },
  methods: {
    buy(): void {
      this.$emit("buy");
    }
  }
},

);
</script>