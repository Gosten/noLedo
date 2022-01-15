<template>
    <div class="slider-container">
        <input type="text" id="slider2" class="slider">
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{
                GRADES,
                sliderInstance: undefined,
                DEFAULT_GRADE,
                ADD_PROBLEM,
                EDIT_PROBLEM,
            }
        },
        mounted(){
            
            this.sliderInstance = new rSlider({
                target: '#slider2',
                values: {min: 0, max: this.GRADES.length - 1},
                step: 1,
                range: false,
                scale: true,
                labels: false,
                onChange: function (vals) {
                    let activeScene = store.getters.getActiveScene;
                    if(activeScene === ADD_PROBLEM) store.commit("setSelectedGrade", vals)
                    if(activeScene === EDIT_PROBLEM) store.commit("editProblemStateGrade", mapGrade(vals)) 
                }
            });
            if(this.activeScene === this.ADD_PROBLEM) this.sliderInstance.setValues(this.DEFAULT_GRADE)
            if(this.activeScene === this.EDIT_PROBLEM) this.sliderInstance.setValues(GRADES.indexOf(this.problemState.editedProblem.grade))
        },
        computed: {
            problemState() { return this.$store.getters.getEditProblemState },
            activeScene() { return this.$store.getters.getActiveScene },
        },
        beforeUnmount(){
            this.sliderInstance.destroy()
        }
    }

</script>

<style scoped>
    
    .slider-container{
        width: 100%;
        margin: 2em 1em 0 1em;
    }
    .rs-container .rs-scale span:last-child{
        position:absolute;
        right: 0;
    }
</style>