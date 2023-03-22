<script>
import AppSearch from '../components/AppSearch.vue'
export default {
    name: 'DiscoveryView',
    components: { AppSearch }
}
</script>

<template>
    <div class="container-fluid">
        <AppSearch />
        <section class="cards_discovery">
            <div class="container color_dark">
                <!-- card titoli recenti -->
                <div class="want_play_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="fs-3 text-center">Giochi recenti</h5>
                    </div>
                </div>
                <!-- card titoli popolari -->
                <div class="playing_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="fs-3 text-center">Giochi popolari</h5>
                    </div>
                </div>
                <!-- card titoli in arrivo -->
                <div class="played_list mt-4 mb-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="fs-3 text-center">Giochi in arrivo</h5>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.card {
    height: 450px;
}
</style>