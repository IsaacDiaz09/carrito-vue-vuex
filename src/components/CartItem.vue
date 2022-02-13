<template>
    <tr>
        <th scope='row'>{{ id }}</th>
        <td>{{ itemTitle }}</td>
        <td>{{ quantity }}</td>
        <td>
            <button class='btn btn-primary btn-sm' @click='increase'>+</button>&nbsp;|&nbsp;
            <button class='btn btn-danger btn-sm' @click='decrease'>-</button>
        </td>
        <td>
            $
            <span>{{ subTotal }}</span>
        </td>
    </tr>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'cart-item',
    props: {
        id: {
            type: Number,
            required: true
        },
        itemTitle: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        subTotal: {
            type: Number,
            required: true
        }
    },
    methods: {
        increase(): void { 
            this.$emit('increase');
        },
        decrease(): void { 
            this.$emit('decrease');
        },
    }
});
</script>