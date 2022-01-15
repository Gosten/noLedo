<template>
        <div class="container" :class="{'overflow-scroll': aspectRatio > 1}">
            <div class="board-position" :style="scaleBoard" :class="{'left-0': aspectRatio > 1}">
                <board></board>
            </div>
        </div>
</template>

<script>
    module.exports = {
        components: {
            'board': httpVueLoader('components/Board.vue'),
        },
        data(){
            return{
                BOARD_CONFIG,
                aspectRatio: BOARD_CONFIG.columns / BOARD_CONFIG.rows,
                scaleBoard: {},
                ACTIVE_PROBLEM_SCALING,
            }
        },
        mounted() {
            uibuilder.send({
                topic: "saveState",
                payload: JSON.stringify(this.activeProblem)
            })
            sendProblem(this.activeProblem)
            if(ACTIVE_PROBLEM_SCALING){
                this.scaleBoard = { 'transform': this.getTransform()}
            }
            console.log(this.scaleBoard)
        },
        computed: {
            activeProblem(){ return this.$store.getters.getActiveProblem },
        },
        methods: {
            getScale(){
                 if(this.aspectRatio < 1 ){
                    let columnWidth = window.innerHeight / this.BOARD_CONFIG.columns
                    let windowAspectRatio = window.innerWidth / (window.innerHeight - 60)
                    let containerWidth = window.innerWidth
                    let containerHeight = window.innerHeight 
                    if(this.aspectRatio > windowAspectRatio) {
                        containerWidth = window.innerWidth + columnWidth// window width - 2em
                        containerHeight = window.innerHeight  // window height - menu height
                    }else{
                        containerWidth = window.innerWidth // window width - 2em
                        containerHeight = window.innerHeight - 60 // window height - menu height
                    }
                    return containerHeight / containerWidth
                }
                if(this.aspectRatio > 1){
                    let containerWidth = window.innerWidth // window width - 2em
                    let containerHeight = window.innerHeight // window height - menu height
                    console.log(containerHeight / containerWidth , this.aspectRatio)
                    return containerHeight / containerWidth * this.aspectRatio * this.BOARD_CONFIG.horizontalActiveBoardZoomModifier
                }
                return 1
            },
            getTransform(){
                return `scale(${ this.getScale()})`
            },
        },
    }
</script>

<style scoped>
    .container{
        display: flex;
        padding-top: 60px;
        height: 100vh;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .board-position{
        width: 100vw !important;
        --container-width: min( calc(100vw - 2em ), calc(100vh - 60px - 2em ));
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .left-0{
        transform-origin: 16px 50%;
    }

    .overflow-scroll{
        overflow-x: scroll;
    }
</style>