<script>

export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer class="bg_dark fixed-bottom d-flex justify-content-end align-items-end">
        <div class="text-white text-center pt-1 pb-2 pe-2">
            © 2023 Copyright:
            <a class="text-decoration-none" href="#">Marco Inchingoli</a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.bg_dark {
    background-image: url('../../public/img/space-footer.png');
    background-size: auto 250%;
    height: 130px;
}

a {
    color: $gm-primary;
}
</style>