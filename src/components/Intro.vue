<template>
    <div id="intro-scene">
        <div class="intro-container">
            <transition name="intro"> 
                
                <h1 v-if="fade">LED<span class="green">o</span>Wall</h1>
            </transition>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{
                fade:true,
            }
        },
        mounted(){
            setTimeout(() => this.fade = false, 800)
            setTimeout(() => this.$store.commit('toggleIntro'), 1500)
        }
    }
    
</script>

<style scoped>
    #intro-scene{
        background: black;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
        width: 100vw;
        height: 100vh;
        font-family: 'Russo One', sans-serif;
    }
    .intro-container{
        font-size: 1.5em;
        color: white;
    }

    .green{
        color:hsl(125, 100%, 50%);
    }
    .intro-enter-active{
        transition: opacity 0s;
    }
    .intro-leave-active{
        transition: opacity .5s;
    }
    .intro-enter, .intro-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>