<script>

export default {
    name: 'AppNav',
}
</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-dark">
        <div class="container">
            <!-- logo -->
            <router-link class="navbar-brand" :to="{ name: 'my-lists' }"><img width="150"
                    src="../../img/games-keeper-logo.png" alt=""></router-link>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <!-- menu navbar -->
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0 d-flex flex-column align-items-center">
                    <li class="nav-item">
                        <router-link class="nav-link active" :to="{ name: 'my-lists' }" aria-current="page">Le mie
                            liste<span class="visually-hidden">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'discovery' }">Scopri</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;


.navbar {
    background-image: url('../../public/img/mario-navbar.png'); // background super mario
    background-size: auto 235%;
    background-position: center;
}

li:hover {
    border-bottom: 2px solid $gm-primary;
}

a.router-link-active.router-link-exact-active.nav-link {
    color: $gm-secondary;
}

.nav-link {
    color: $gm-darker;
    font-size: 1.2rem;
    font-family: $gm-press-start;
}

a.nav-link.active {
    color: $gm-darker;
    font-size: 1.2rem;
}

.nav-link:hover {
    color: $gm-primary;
}
</style>