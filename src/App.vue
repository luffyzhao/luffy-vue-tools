<template>
    <markdown></markdown>
</template>

<script>

import Markdown from "./components/editor/markdown";

export default {
    components: {Markdown},
    name: 'App',
}
</script>

<style>
    html,body{
        height: 100%;
        width: 100%;
        margin: 0;
    }
</style>