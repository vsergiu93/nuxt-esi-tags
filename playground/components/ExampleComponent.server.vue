<template>
  <span>{{ mainProp }}</span>
</template>

<script lang="ts" setup>
import { setHeaders } from "h3";

defineOptions({
  name: 'ExampleComponentEsi'
})

defineProps<{
  mainProp: string,
}>()

const event = useRequestEvent()

setHeaders(event, {
  'Another-Header': 'New',
  'Cache-Tag': 'esi, tag'
});
</script>
