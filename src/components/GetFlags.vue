<template>
    <div>
        <img :src="getSrc(array.original_language)" alt="" v-if="getSrc(array.original_language)">
        <span v-else>
            {{array.original_language}}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        array: Object
    },
    methods: {
        getSrc(lang) {
            let src = "https://flagcdn.com/16x12/";
            switch (lang) {
                case "it":
                    src += "it";
                    break;
                case "es":
                    src += "es";
                    break;
                case "en":
                    src += "gb-eng";
                    break;
                case "ko":
                    src += "kr";
                    break;
                case "ja":
                    src += "jp";
                    break;
                case "te":
                    src += "in";
                    break;
                default:
                    return false;
            }
            src += ".png";
            return src;
        },
    }
}
</script>

<style>

</style>