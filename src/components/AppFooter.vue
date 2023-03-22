<script>

export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer class="bg_space d-flex justify-content-end align-items-end">
        <!-- copyright -->
        <div class="text-white text-center pt-1 pb-2 pe-2">
            © 2023 Copyright:
            <a class="text-decoration-none" href="https://github.com/MarcoInchingoli89" target="_blank">Marco Inchingoli</a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.bg_space {
    background-image: url('../../public/img/space-footer.png'); // background space invaders
    background-size: auto 250%;
    height: 130px;
}

a {
    color: $gm-primary;
}

a:hover {
    color: $gm-secondary;
}
</style>