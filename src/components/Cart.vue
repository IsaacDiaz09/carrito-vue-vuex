<template>
    <div class='cart'>
        <table class='table table-sm table-hover'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Accion</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <slot name='body'></slot>
            </tbody>
            <tfoot>
                <slot name='footer'></slot>
            </tfoot>
        </table>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'cart'
});
</script>