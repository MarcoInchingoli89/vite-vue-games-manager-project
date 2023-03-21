<script>
export default {
    name: 'ListsView',
}
</script>

<template>
    <div class="container-fluid">

        <section class="card_lists">
            <div class="container">
                <div class="card border-0 mt-2"></div>
                <div class="card border-0 my-4"></div>
                <div class="card border-0 mb-2"></div>
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