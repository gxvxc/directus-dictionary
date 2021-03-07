<template>
  <div>
    <v-notice v-if="!dictionary" type="warning">
      Dictionary configured incorrectly
    </v-notice>
    <div class="info">
      <v-progress-linear :value="ratio()*100" rounded />
    </div>
    <div
      class="entry"
      v-for="entry in dictionary"
      :key="entry.key"
    >
      <div class="key">
        <h3>{{entry.key}}</h3>
        <p>{{entry.description}}</p>
      </div>
      <div class="value">
        <v-input
          :value="getValue(entry.key)"
          :nullable="false"
          placeholder="Enter value..."
          @input="handleInput(entry.key,$event)"
          :required="true"
        >
          <template #append>
            <v-icon v-if="!getValue(entry.key)" name="warning" />
          </template>
        </v-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import VueCompositionAPI,{ defineComponent, PropType, computed } from "@vue/composition-api";
Vue.use(VueCompositionAPI)


type IncomingRecord = {
  key: string,
  description?: string
}

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<Record<string, string>>,
      default: null
    },
    dictionary: {
      type: Array as PropType<IncomingRecord[]>
    }
  },
  setup(props,{emit}){
    const completed = () => {
      const t = computed(()=>Object.keys(props.value || {}).length);
      return t.value;
    }
    const ratio = ()=> {
      const r = computed(()=>(completed() / props.dictionary.length));
      return r.value;
    }
    const getValue = (key:string) => {
      const c = computed( () => {
        if(!props.value || !props.value[key]){
          return null
        }
        return props.value[key]
      });
      return c.value;
    }
    const handleInput = (key:string,value:string) => {
      const input = { [key]: value }
      const tValue = value.trim()

      // Record first entry
      if(props.value === null && tValue) {
        return emit("input", input);
      }

      const {[key]: _, ...values } = props.value;

      // Record entry change or remove if value is an empty string
      if(props.value[key]){
        if(tValue){
          return emit("input", {...values, ...input});
        }
        if(Object.keys(values).length===0){
          return emit("input", null);
        }
        return emit("input", values);
      }

      // Record new change or don't if value is an empty string
      return tValue ? emit("input", {...props.value, ...input}) : emit("input", values);
    }

    return {handleInput,getValue, ratio}
  }
})
</script>

<style lang="scss" scoped>
.info{
  margin-bottom: 16px;
}
.entry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  &:not(:last-child){
    margin-bottom: 32px;
  }
  .key{
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