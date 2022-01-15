<template>
    <div id="edit-problem">
        <div class="grid-content">

            <div class="board-position">
                <transition name="board-fade">
                    <board v-if="!textInputFocus"></board>  
                </transition>
            </div>

            <div class="flex-container-blank">
                <div class="bottom" :class="{top: textInputFocus}">
                    <div class="input-container">
                        <div className="name-grade-container">
                            <div class="slider-width">
                                <grade-slider></grade-slider>
                            </div>
                            <input
                                id="add-problem-name-input"
                                class="input-name input"
                                :class="{'border-red': errorFlags.name}"
                                name="nazwa"
                                type="text"
                                placeholder="nazwa"
                                v-model="nameValue"
                                @change="() => errorFlags.name = false"
                                @focusin="() => handleFocus(true)"
                                @focusout="() => handleFocus(false)"
                            />
                        </div>
                    </div>
                
                    <div class="button-container">
                        <button class="button" @click="deleteProblem">
                            Usuń
                        </button>
                        <button class="button" @click="saveProblem">
                            Zapisz
                        </button>
                    </div>
                </div>
            </div>
        </div>

        
        <transition name="fade">
            <error-modal v-if="errorState.active"></error-modal>
        </transition>

        <transition name="fade">
            <delete-modal v-if="editProblemState.deleteModal"></delete-modal>
        </transition>
        
    </div>
</template>

<script>
    module.exports = {
        components: {
            'board': httpVueLoader('components/Board.vue'),
            'grade-slider': httpVueLoader('components/SingleSlider.vue'),
            'error-modal': httpVueLoader('components/ErrorModal.vue'),
            'delete-modal': httpVueLoader('components/DeleteModal.vue'),

        },
        data(){
            return{
                nameValue: "",
                errorFlags: {
                    name: false,
                },
                mapGrade,
                oldGrips: [],
                oldName: "",
                saveNewList,
                textInputHandle: undefined,
            }
        },
        watch: {
            windowHeight(newWidth) {
                console.log(newWidth)
        }
        },
        mounted() {
            this.nameValue = this.editProblemState.editedProblem.name
            this.oldGrips = Object.assign({}, this.editProblemState.editedProblem).grips
            this.oldName = this.editProblemState.editedProblem.name
            sendProblem(this.editProblemState.editedProblem)

            this.textInputHandle = document.getElementById('add-problem-name-input')
            this.textInputHandle.addEventListener('keyup', this.blurInput)
        },
        beforeUnmount(){
            this.textInputHandle.removeEventListener('keyup', this.blurInput)
        },
        computed: {

            editProblemState() { return this.$store.getters.getEditProblemState },
            problemList(){ return [...this.$store.getters.getProblemList] },
            selectedProblem(){ return this.$store.getters.getSelectedProblem },
            errorState() { return this.$store.getters.getErrorState},
            activeProblem(){ return this.$store.getters.getActiveProblem },
            textInputFocus(){ return this.$store.getters.getTextInputFocus },

        },
        methods: {
            deleteProblem(){ this.$store.commit("toggleDeleteProblemModal")},

            blurInput(e){
                if (e.key == "Enter") this.textInputHandle.blur();
            },

            saveProblem(){
                let errorMessage = "Nie wprowadzono zmian"
                let editModalmessage = "Wprowadzono zmiany"
                if(!this.hasProblemChanged()) return this.handleError(errorMessage);
                let newProblem = {
                    name: this.nameValue,
                    grade: this.editProblemState.newGrade,
                    grips: this.editProblemState.editedProblem.grips,
                }
                if(this.validateProblem(newProblem)){
                    let newList = this.problemList.map( problem => {
                        if(problem.name === this.oldName) return newProblem
                        return problem
                    })
                    if(this.activeProblem)
                        if(this.activeProblem.name === this.oldName)
                            this.$store.commit('setActiveProblem', newProblem )

                    this.$store.dispatch('toggleEditModal', { active: true, message: editModalmessage })
                    this.saveNewList(newList)
                }
            },

            hasProblemChanged(){
                let nameChanged = !(this.nameValue === this.oldName)
                let gripsChanged = !this.compareGrips(this.selectedProblem.grips, this.editProblemState.editedProblem.grips)
                let gradeChanged = !(this.editProblemState.newGrade === this.selectedProblem.grade)
                let condition = !(gripsChanged || nameChanged || gradeChanged)
                if( condition ) return false
                return true
            },

            compareGrips(grips1, grips2){
                let difference = Object.keys(grips1).filter((key) => grips1[key]!==grips2[key])
                if(difference.length == 0 ) return true
                return false
            },

            handleError(errorMessage){
                this.$store.dispatch('toggleErrorModal', { active: true, message: errorMessage })
                console.warn(errorMessage)
                return false;
            },

            validateProblem({name, grips}){
                if(!name) return this.handleNameError("Wpisz nazwę problemu")
                
                let selecterGripsAmount =  Object
                    .keys(grips)
                    .filter(key => grips[key])
                    .length;

                if( selecterGripsAmount === 0 ) return this.handleError("Nie wybrano żadnego chwytu")

                return this.checkNameUniqueness(name)
            },

            handleNameError(errorMessage){
                this.handleError(errorMessage);
                this.errorFlags.name = true;
            },

            checkNameUniqueness(name){ 
                let matchArray = this.problemList.filter(problem => problem.name === name)
                if(matchArray.length === 0) return true
                if(matchArray[0].name === this.oldName) return true
                return this.handleNameError("Ta nazwa już istnieje")
            },

            handleFocus(inOut){
                if(inOut) return this.$store.commit('toggleTextInputFocus')
                return setTimeout(() => this.$store.commit('toggleTextInputFocus'), 200)
            },
        }
    }
</script>

<style>
    @import url("../css/AddProblem.css");

    .fade-enter-active, .fade-leave-active{
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .content-container{
        padding-top: calc(60px + 1em) !important;
    }

</style>