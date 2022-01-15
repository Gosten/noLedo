<template>
    <div id="board-container">
        <div id="scianka-container" :class="{'scale-up': isScene(ACTIVE_PROBLEM)}" >
                    <div class="scianka-img">
                        <img
                            v-for="imgKey in Object.keys(gripImages.default)"
                            :key="imgKey"
                            :src="gripImages.default[imgKey]"
                            :alt="imgKey"
                        />
                    </div>
                    <div class="scianka-img">
                        <img
                            v-for="(imgKey, index) in Object.keys(gripImages.active)"
                            :key="imgKey"
                            :src="gripImages.active[imgKey]"
                            :alt="imgKey"
                            :class="{'ch-inactive': gripClassCondition(index)}"
                        />
                    </div>
                    <div id="scianka-action-board" v-if="interactionCondition">
                        <div v-for="(key, index) in Object.keys(gripImages.default)"
                            :key="`${index}-box`"
                            :id="`grip-${index}-box`"
                            class="click-box"
                            @click="() => handleClick(index)"
                        >
                        </div>
                    </div>
        </div>

    </div>
</template>

<script>
    module.exports = {
        methods: {
            handleClick(index){
                if(this.isScene(ADD_PROBLEM)) this.$store.commit("setProblemState", index)
                if(this.isScene(EDIT_PROBLEM)) this.$store.commit("editProblemStateGrip", index)
                this.sendGripMessage(index)
            },
            sendGripMessage(index){
                let i = this.diodeIndexes[index];
                let diodeState = this.problemState[index] ? 255 : 0;
                let msg = `${i},0,${diodeState},0`
                uibuilder.send(msg)
            },
            gripClassCondition(index) { 
                if( this.isScene(LOAD_PROBLEM)) 
                    return !this.selectedProblem.grips[index]
                if( this.isScene(ACTIVE_PROBLEM)) 
                    return !this.activeProblem.grips[index]
                if( this.isScene(ADD_PROBLEM) ) {
                    return !this.problemState[index]
                }
                if( this.isScene(EDIT_PROBLEM) ) {
                    return !this.editedProblem.grips[index]
                }
                    
            },
            isScene(sceneType){
                return this.$store.getters.getActiveScene === sceneType
            },
            onResize() {
                console.log("resize ", window.innerWidth)
                this.windowWidth = window.innerWidth
                console.log(windowWidth)
            }
        },
        computed: {
            problemState() { return this.$store.getters.getAddProblemState },
            editedProblem() { return this.$store.getters.getEditedProblem },
            interactionCondition() { 
                return this.activeScene === ADD_PROBLEM || this.activeScene === EDIT_PROBLEM},
            activeProblem(){ return this.$store.getters.getActiveProblem },
            activeScene(){ return this.$store.getters.getActiveScene },
            selectedProblem(){ return this.$store.getters.getSelectedProblem },
            diodeIndexes: () => diodeIndexes,
            gripImages: () => gripImages,

        },
        data(){
            return{
                ACTIVE_PROBLEM
            }
        }



    }
</script>

<style scoped>
    @import '../css/Board.css';
    @import '../css/gripPositions.css';
    .uneven-image-offset{
        transform: translateX(10px)
    }
    .scale-up{
        transform: translateX(10px);
        width: 90vw !important;
        height: 75vw !important;
    }
    
</style>