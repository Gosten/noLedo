<template>
    <div>
        <menu-bar></menu-bar>
        
        
        <transition name="component-fade">
            <add-problem v-if="isAddProblem"></add-problem>
        </transition>
        <transition name="component-fade">
            <load-problem v-if="isLoadProblem"></load-problem>
        </transition>
        <transition name="active-component-fade">
            <active-problem v-if="isActiveProblem"></active-problem>
        </transition>
        <transition name="active-component-fade">
            <edit-problem v-if="isEditProblem"></edit-problem>
        </transition>
        <transition name="intro-component-fade">
            <intro v-if="intro"></intro>
        </transition>

    </div>
</template>

<script>
    module.exports = {
        components: {
            'add-problem': httpVueLoader('components/AddProblem.vue'),
            'load-problem': httpVueLoader('components/LoadProblem.vue'),
            'active-problem': httpVueLoader('components/ActiveProblem.vue'),
            'edit-problem': httpVueLoader('components/EditProblem.vue'),
            'menu-bar': httpVueLoader('components/Menu.vue'),
            'intro': httpVueLoader('components/Intro.vue'),
        },
        computed: {
            isAddProblem() { return this.$store.getters.getActiveScene === ADD_PROBLEM },
            isLoadProblem() { return this.$store.getters.getActiveScene === LOAD_PROBLEM },
            isActiveProblem() { return this.$store.getters.getActiveScene === ACTIVE_PROBLEM },
            isEditProblem() { return this.$store.getters.getActiveScene === EDIT_PROBLEM },
            intro() { return this.$store.getters.getIntro }
        }
    }
</script>

<style scoped>
    .component-fade-enter-active, .component-fade-leave-active{
        transition: opacity .5s;
    }
    .component-fade-enter, .component-fade-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .active-component-fade-enter-active{
        transition: opacity .5s;
        transition-delay: .5s;
    }
    .active-component-fade-leave-active{
        transition: opacity .5s;
    }
    .active-component-fade-enter, .active-component-fade-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .intro-component-fade-enter-active{
        transition: opacity 0s;
    }
    .intro-component-fade-leave-active{
        transition: opacity .5s;
    }
    .intro-component-fade-enter, .intro-component-fade-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>