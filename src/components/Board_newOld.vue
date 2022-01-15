<template>

        <div class="board-container">
            <div class="board-grid-container" >
                <div
                    v-for="(grip, index) in BOARD_CONFIG.gripPositions"
                    :key="index"
                    :style="gripContainerWidth"
                    class="grip-container grip-selector"
                    :class="{'grip-active': gripClassCondition(index)}"
                    @click="handleClick(index)">
                    <div class="grip" :class="{[gripColors[index]]: true}">
            
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
    module.exports = {
        methods: {
            handleClick(index){
                if(this.BOARD_CONFIG.gripPositions[index]){
                    console.log("clicked", index)
                    if(this.isScene(ADD_PROBLEM)) this.$store.commit("toggleProblemState", index)
                    if(this.isScene(EDIT_PROBLEM)) this.$store.commit("editProblemStateGrip", index)
                    this.sendGripMessage(index)
                }
            },
            sendGripMessage(index){
                let i = this.diodeIndexes[index];
                let diodeState = this.problemState[index] ? 255 : 0;
                let msg = `${i},0,${diodeState},0`
                uibuilder.send(msg)
            },
            gripClassCondition(index) { 
                
                if( this.isScene(LOAD_PROBLEM)) 
                    return this.selectedProblem.grips[index]
                if( this.isScene(ACTIVE_PROBLEM)) 
                    return this.activeProblem.grips[index]
                if( this.isScene(ADD_PROBLEM) ) {
                    return this.problemState[index]
                }
                if( this.isScene(EDIT_PROBLEM) ) {
                    return this.editedProblem.grips[index]
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
                ACTIVE_PROBLEM,
                BOARD_CONFIG,
                gripColors: BOARD_CONFIG.gripPositions.map(color => `grip-color-${color}`),
                gripContainerWidth: {
                    width: `calc( 100% / ${BOARD_CONFIG.columns} )`
                },
            }
        },
        mounted(){
        }



    }
</script>

<style scoped>
    @import '../css/Board.css';
    @import '../css/app_config.css';

    
</style>