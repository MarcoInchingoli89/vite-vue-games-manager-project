<script>
export default {
    name: 'AppTutorial',
    props: ['welcome', 'tutorial']
}
</script>

<template>
    <div class="intro shadow-sm">
        <div class="container">
            <h1 class="pt-3 text-center">{{ welcome }}</h1>
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

h1,
p {
    font-family: $gm-satisfy
}

p {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
}
</style>