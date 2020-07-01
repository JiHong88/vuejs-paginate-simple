<template>
  <div style="padding: 20px;">
    <h2>vuejs-paginate-simple</h2>
    <hr>
    <div>
        <paginate
            v-model="page"
            :total-result="100"
            :rows-per-page="10"
            :page-count="5"
        ></paginate>
    </div>
  </div>
</template>

<script>
import Paginate from '../src/components/Paginate';

export default {
    name: 'App',
    components: {
        Paginate
    },
    data() {
        return {
            page: 1
        }
    }
}
</script>
