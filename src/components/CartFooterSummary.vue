<template>
    <tr>
        <th scope='row' colspan='2'>Total productos</th>
        <td>
            <i>{{ totalQuantity }}</i>
        </td>
        <td>
            <button class='btn btn-danger btn-sm' @click='cleanCart'>Vaciar todo</button>
        </td>
        <td class='fw-bold'>
            $
            <span>{{ totalValue }}</span>
        </td>
    </tr>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'footer-summary',
    props: {
        totalQuantity: {
            type: Number,
            default: 0,
            required: true
        },
        totalValue: {
            type: Number,
            default: 0,
            required: true
        }
    },
    methods: {
        cleanCart(): void {
            this.$emit('cleanCart');
        }
    }
});
</script>
