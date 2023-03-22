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
                <div class="pacman_button">
                    <button class="button d-flex"><img height="20" class="pe-2" src="../../public/img/pacman-icon.png"
                            alt="">Cerca</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.search_container {
    background-color: $gm-darker;
    height: 68px;
    // margini container-fluid fixati
    margin-left: -15px;
    margin-right: -15px;
    // fixato margine superiore
    margin-top: -10px;

}

.search_bar {
    width: 900px;
}

.button {
    display: inline-block;
    padding: 8px 30px;
    font-size: 0.8rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: $gm-dark;
    background-color: $gm-primary;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px #999;
    vertical-align: middle;
}

.button:hover {
    background-color: $gm-secondary
}

.button:active {
    background-color: $gm-secondary;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
</style>