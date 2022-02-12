<template>
    <tr>
        <th scope="row" colspan="2">Total productos</th>
        <td>Cantidad</td>
        <td>
            <button class="btn btn-danger btn-sm">Vaciar todo</button>
        </td>
        <td class="fw-bold">
            $
            <span>Total</span>
        </td>
    </tr>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "footer-summary"
});
</script>
