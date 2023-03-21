<script>
export default {
    name: 'ListsView',
}
</script>

<template>
    <div class="container-fluid">

        <section class="card_lists">
            <div class="container">
                <!-- card list titoli da giocare -->
                <div class="want_play_list mt-2">
                    <h5 class="fs-4">Da giocare</h5>
                    <div class="card border-0 shadow-lg"></div>
                </div>
                <!-- card list titoli in corso -->
                <div class="playing_list mt-2">
                    <h5 class="fs-4">Sto giocando a</h5>
                    <div class="card border-0 shadow-lg"></div>
                </div>
                <!-- card list titoli completati -->
                <div class="played_list mt-2 mb-3">
                    <h5 class="fs-4">Completati</h5>
                    <div class="card border-0 shadow-lg"></div>
                </div>
            </div>

        </section>

    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.container-fluid {
    background-color: $gm-secondary;
    padding-top: 10px;
    padding-bottom: 10px;
}


.card {
    height: 450px;
    background-color: $gm-primary-soft;

}
</style>