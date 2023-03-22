<script>
export default {
    name: 'AppSearch'
}
</script>

<template>
    <div class="search_container d-flex justify-content-center">
        <div class="search_bar">
            <form class="d-flex p-3" role="search">
                <input class="form-control me-2" type="search" placeholder="Scrivi qui il nome di un gioco!"
                    aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Cerca</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.search_container {
    background-color: $gm-darker;
    height: 65px;
    // margini container-fluid fixati
    margin-left: -15px;
    margin-right: -15px;
    // fixato margine superiore
    margin-top: -10px;

}

.search_bar {
    width: 900px;
}
</style>