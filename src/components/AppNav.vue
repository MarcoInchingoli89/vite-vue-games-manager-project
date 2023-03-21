<script>

export default {
    name: 'AppNav',
}
</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'my-lists' }"><img width="150"
                    src="../../img/games-keeper-logo.png" alt=""></router-link>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
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
    background-image: url('../../public/img/mario-navbar1.png');
    background-size: auto 235%;
    background-position: center;
}

li:hover {
    border-bottom: 2.5px solid $gm-primary;
}

a.router-link-active.router-link-exact-active.nav-link {
    color: $gm-secondary;
}

.nav-link {
    color: $gm-darker;
    font-size: 1.5rem;
}

a.nav-link.active {
    color: $gm-darker;
    font-size: 1.5rem;
}

.nav-link:hover {
    color: $gm-primary;
}
</style>