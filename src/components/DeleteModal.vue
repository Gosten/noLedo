<template>
    <div id="popup-container" class="popup-container" @click="hideModal">
            <div class="popup-window delete-problem-modal">
                <p>Czy na pewno chcesz usunąć {{selectedProblemName}}?</p>

                            <button
                class="button"
                @click="deleteProblem"
            >   
                Usuń
            </button>
            </div>

        </div>
</template>

<script>

    module.exports = {
        data(){
            return {
                saveNewList
            }
        },
        methods: {
            deleteProblem(){
                let newProblemList = this.problemList.filter(element => element.name !== this.selectedProblemName)
                this.saveNewList(newProblemList)
                this.$store.commit("selectScne", LOAD_PROBLEM)
                
            },
            hideModal(){
                this.$store.commit("toggleDeleteProblemModal")
            }
        },
        computed: {
            selectedProblemName(){ return this.$store.getters.getSelectedProblem.name },
            problemList(){ return this.$store.getters.getProblemList },

        }
    }
</script>

<style scoped>
    @import url("../css/PopupWindow.css");
    .delete-problem-modal{
        height: 10em;
        flex-direction: column;
        padding: 1em;
    }

</style>