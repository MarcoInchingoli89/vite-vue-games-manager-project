<script>

export default {
    name: 'AppNav',
}
</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'my-lists' }">Games Manager Project</router-link>
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

<style lang="scss" scoped></style>