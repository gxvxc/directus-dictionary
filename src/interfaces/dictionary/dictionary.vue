<template>
  <div>
    <v-notice v-if="!dictionary" type="warning">
      Dictionary configured incorrectly
    </v-notice>
    <div
      class="entry"
      v-for="entry in dictionary"
      :key="entry.key"
    >
      <div class="info">
        <h2>{{entry.key}}</h2>
        <p>{{entry.description}}</p>
      </div>
      <div class="form">
        <v-input
          :value="Object.values((value || []).find(e=>Object.keys(e)[0]===entry.key) || {})[0]  || null"
          :nullable="false"
          placeholder="Enter value..."
          @input="handleInput({[entry.key]:$event})"
          :required="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import VueCompositionAPI,{ defineComponent, PropType } from "@vue/composition-api";
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
    dictionary: {
      type: Array as PropType<IncomingRecord[]>
    }
  },
  setup(props,{emit}){
    const handleInput = (input:Record) => {
      if(props.value === null || props.value.length === 0) {
        return emit("input", [input])
      }
      const entryExists = props.value.find(p=>Object.keys(p)[0]===Object.keys(input)[0])
      if(entryExists){
        const values = props.value.filter(p=>Object.keys(p)[0]!==Object.keys(input)[0])
        return emit("input", [...values,input])
      }
      emit("input", [...props.value, input])
    }

    return {handleInput}
  }
})
</script>

<style lang="scss" scoped>
.entry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  &:not(:last-child){
    margin-bottom: 32px;
  }
  .info{
    h2{
      font-weight: 600;
      margin-bottom: 8px;
    }
    p {
      color: var(--foreground-subdued);
    }
  }
}
</style>