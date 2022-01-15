<template>
    <div id="popup-container" class="popup-container" @click="hideModal">
            <div class="popup-window add-problem-modal">
                <p>Dodano nowy problem</p>

                            <button
                class="button"
                @click="goToProblem"
            >   
                Przejdź do problemu
            </button>
            </div>

        </div>
</template>

<script>

    module.exports = {
        data(){
            return {
                ACTIVE_PROBLEM
            }
        },
        methods: {
            goToProblem(){
                this.$store.commit("setActiveProblem", this.newProblem )
                this.$store.commit("selectScne", ACTIVE_PROBLEM)
            },
            hideModal(){
                this.$store.commit("toggleAddProblemModal")
            }
        },
        computed: {
            newProblem(){ return this.$store.getters.getAddProblemNewProblem }

        }
    }
</script>

<style scoped>
    @import url("../css/PopupWindow.css");
    .add-problem-modal{
        height: 10em;
        flex-direction: column;
        padding: 1em;
    }

</style>