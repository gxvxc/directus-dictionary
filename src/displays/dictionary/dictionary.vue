<template>
	<div v-if="interfaceOptions.dictionary">
      <div class="label warning">
        {{completed}} <v-icon small name="warning" />
      </div>
      
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import VueCompositionAPI,{ defineComponent, PropType, computed } from "@vue/composition-api";
Vue.use(VueCompositionAPI)

type Record = {
  key: string,
  value: string | null
}

type IncomingRecord = {
  key: string,
  description?: string
}

export default defineComponent({
  props: {
    value: {
      type: Array as PropType<Record[]>,
      default: null
    },
    type: {
      type: String
    },
    interface: {
      type: String
    },
    interfaceOptions: {
      type: Object as any
    },
    field: {
      type: String
    },
    collection: {
      type: String
    },
  },
  setup(props){
    console.log((props.value).length / props.interfaceOptions.dictionary.length)
    const completed = (props.value || []).length
    const total = props.interfaceOptions.dictionary.length
    const ratio = completed/total

    return {completed, total, ratio}
  }
})
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: var(--border-radius);
  &.warning {
    color: #ffc107;
    background-color: rgba(255, 193, 7, 0.15);
  }

  .v-icon {
    margin-left: 4px;
  }
}
</style>