<template>
    <div id="popup-container" class="popup-container">
            <div class="popup-window">
                {{errorMessage}}
            </div>
        </div>
</template>

<script>

    module.exports = {
        data(){
            return {
            }
        },
        computed: {
            problmState() { return this.$store.getters.getAddProblemState},
            errorMessage() { return this.$store.getters.getErrorState.message } 
        }
    }
</script>

<style scoped>
    @import url("../css/PopupWindow.css");
</style>