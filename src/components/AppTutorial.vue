<script>
export default {
    name: 'AppTutorial',
    props: ['welcome', 'tutorial']
}
</script>

<template>
    <div class="intro shadow-sm">
        <div class="container">
            <h2 class="pt-3 text-center">{{ welcome }}</h2>
            <p class="text-center">{{ tutorial }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.intro {
    background-color: $gm-dark;
    color: $gm-primary;
    margin-left: 15px; //bordo laterale scoperto sinistro
    margin-right: 15px; // bordo laterale scoperto destro
}

h2,
p {
    font-family: $gm-press-start;
}

p {
    font-size: 0.8rem;
    padding-bottom: 0.5rem;
}
</style>