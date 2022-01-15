<template>
    <div id="add-problem">
        
        
        <div class="grid-content">

            
            <div class="board-position">
                <transition name="board-fade">
                    <board v-if="!textInputFocus"></board>  
                </transition>
            </div>
            

            <div class="flex-container-blank">
                <div class="bottom" :class="{top: textInputFocus}">
                    <div class="input-container">
                        <div class="name-grade-container">
                            <div class="slider-width">
                                <grade-slider></grade-slider>
                            </div>
                            <div class="name-input-container">
                                <input
                                    id="add-problem-name-input"
                                    class="input-name input"
                                    :class="{
                                        'border-red': errorFlags.name || nameLengthLimit,
                                        'limit-description': 1}"
                                    name="nazwa"
                                    type="text"
                                    placeholder="nazwa"
                                    v-model="nameValue"
                                    @change="(e) => handleNameInput(e.target.value)"
                                    @focusin="() => handleFocus(true)"
                                    @focusout="() => handleFocus(false)"
                                />
                                <p :class="{ 'opacity': !nameLengthLimit }">Nazwa nie może mieć więcej niż 20 znaków</p>
                            </div>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="button" @click="addProblem">
                            Dodaj problem
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <transition name="fade">
            <error-modal v-if="errorState.active"></error-modal>
        </transition>

        <transition name="fade">
            <problem-modal v-if="addModal"></problem-modal>
        </transition>
    </div>
</template>

<script>
    module.exports = {
        mounted(){
            this.$store.commit("clearProblemState", this.BOARD_CONFIG.gripPositions)

            this.textInputHandle = document.getElementById('add-problem-name-input')
            this.textInputHandle.addEventListener('keyup', this.blurInput)
        },
        beforeUnmount(){
            this.textInputHandle.removeEventListener('keyup', this.blurInput)
        },
        data(){
            return {
                BOARD_CONFIG,
                nameValue: "",
                errorFlags: {
                    name: false,
                },
                mapGrade,
                textInputHandle: undefined,

            }
        },
        components: {
            'board': httpVueLoader('components/Board.vue'),
            'error-modal': httpVueLoader('components/ErrorModal.vue'),
            'problem-modal': httpVueLoader('components/AddProblemModal.vue'),
            'loading-modal': httpVueLoader('components/LoadingModal.vue'),
            'grade-slider': httpVueLoader('components/SingleSlider.vue'),
        },
        computed: {

            problmState() { return this.$store.getters.getAddProblemState},
            errorState() { return this.$store.getters.getErrorState},
            problemList() { return [...this.$store.getters.getProblemList]},
            addModal(){ return this.$store.getters.getAddProblemModal },
            gradeValue(){ return this.$store.getters.getSelectedGrade},
            nameLengthLimit(){ return this.nameValue.length >= 20 },
            textInputFocus(){ return this.$store.getters.getTextInputFocus },

        },
        methods: {
            handleChange(value) {this.gradeValue = value},

            blurInput(e){
                if (e.key == "Enter") this.textInputHandle.blur();
            },

            addProblem(){
                console.log(this.gradeValue)
                let newProblem =    {
                    name: this.nameValue,
                    grade: mapGrade(this.gradeValue),
                    grips: this.problmState,
                }
                if( this.validateProblem(newProblem) ) {
                    let newList = [...this.problemList, newProblem]

                    uibuilder.send({
                        topic: "save", 
                        payload: JSON.stringify(newList)
                    })
                    console.log(newList)
                    uibuilder.send({topic: TOPIC.LOAD})
                    
                    this.$store.commit("toggleAddProblemModal")
                    this.$store.commit("setAddProblemNewProblem", newProblem )
                }
            },

            validateProblem({name, grade, grips}){
                if(!name) return this.handleNameError("Wpisz nazwę problemu")
                
                let selecterGripsAmount =  Object
                    .keys(grips)
                    .filter(key => grips[key])
                    .length;

                if( selecterGripsAmount === 0 ) return this.handleError("Nie wybrano żadnego chwytu")

                return this.checkNameUniqueness(name)
            },

            checkNameUniqueness(name){ 
                let matchArray = this.problemList.filter(problem => problem.name === name)
                if(matchArray.length === 0) return true
                return this.handleNameError("Ta nazwa już istnieje")
            },

            handleError(errorMessage){
                this.$store.dispatch('toggleErrorModal', { active: true, message: errorMessage })
                console.warn(errorMessage)
                return false;
            },

            handleNameError(errorMessage){
                this.handleError(errorMessage);
                this.errorFlags.name = true;
            },

            handleNameInput(value){
                this.errorFlags.name = false
                let newValue = value.replace(/ +/g, " ") //reduce multiple spaces to a single one
                newValue = newValue.replace(/(^ *| *$)/g, "") //remove space from begining end end of name
                return this.nameValue = newValue
            },

            handleFocus(){
                this.$store.commit('toggleTextInputFocus')
            },
            handleFocus(inOut){
                if(inOut) return this.$store.commit('toggleTextInputFocus')
                return setTimeout(() => this.$store.commit('toggleTextInputFocus'), 200)
            },
        }
    }
</script>

<style scoped>
    @import url("../css/AddProblem.css");

    .fade-enter-active, .fade-leave-active{
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }





    .border-red{
        border-color: red !important;
    }
    .name-input-container > p{
        margin: 0 5px;
        color:red;
        font-size: 0.7em;
    }
    .name-input-container > input {
        margin-bottom: 0 !important;
    }
    .opacity{
        opacity: 0;
    }


</style>