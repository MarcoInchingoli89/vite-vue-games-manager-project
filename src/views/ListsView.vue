<script>
export default {
    name: 'ListsView',
}
</script>

<template>
    <div class="container-fluid">

        <section class="card_lists">
            <div class="container color_dark">
                <!-- card list titoli da giocare -->
                <div class="want_play_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="fs-3 text-center">Da giocare</h5>
                    </div>
                </div>
                <!-- card list titoli in corso -->
                <div class="playing_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="fs-3 text-center">Sto giocando a</h5>
                    </div>
                </div>
                <!-- card list titoli completati -->
                <div class="played_list mt-4 mb-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="fs-3 text-center">Completati</h5>
                    </div>
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
    background-image: url('../../public/img/tetris-bg.png');
    background-size: auto 50%;
    background-position: center;
    background-repeat: repeat-y;
}

.card {
    height: 450px;
    background-color: $gm-primary;

}

.color_dark {
    color: $gm-dark;
}
</style>