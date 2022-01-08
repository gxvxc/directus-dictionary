<template>
  <div>
    <v-notice v-if='!dictionary' type='warning'>
      Dictionary configured incorrectly
    </v-notice>
    <div class='info'>
      <v-progress-linear :value='getRatio() * 100' rounded />
    </div>
    <div
        class='entry'
        v-for='entry in dictionary'
        :key='entry.key'
    >
      <div class='key'>
        <h3>{{ entry.key }}</h3>
        <p>{{ entry.description }}</p>
      </div>
      <div class='value'>
        <v-input
            :model-value='getEntryValue(entry.key)'
            placeholder='Enter value...'
            @input='emitValue(entry.key, $event)'
            :nullable='false'
            :required='true'
        >
          <template #append>
            <v-icon v-if='!value || !value[entry.key]' name='warning' />
          </template>
        </v-input>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';

type IncomingRecord = {
  key: string,
  description?: string
}

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<Record<string, string>>,
      default: {}
    },
    dictionary: {
      type: Array as PropType<IncomingRecord[]>
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    const getCompleted = () => computed(() => Object.keys(props.value || {}).length).value;

    const getRatio = () => computed(() => (getCompleted() / props.dictionary?.length)).value;

    const getEntryValue = (key: string) => computed(() => props?.value?.[key] || null).value;

    const emitValue = (key: string, event: InputEvent) => {
      const value = (event.target as HTMLInputElement).value.trim();

      const input = { [key]: value };

      // Record as first entry
      if(!props.value && value) {
        return emit('input', input);
      }

      // Get the rest of the entries
      const { [key]: _, ...values } = props.value;

      // Record the entry change or remove it if value is an empty string
      if(props?.value?.[key]) {
        if(value) {
          return emit('input', { ...values, ...input });
        }

        if(Object.keys(values).length === 0) {
          return emit('input', null);
        }

        return emit('input', values);
      }

      // Record new change or don't if value is an empty string
      return value ? emit('input', { ...props.value, ...input }) : emit('input', values);
    };

    return { emitValue, getRatio, getEntryValue };
  }
});
</script>

<style lang='scss' scoped>
.info {
  margin-bottom: 16px;
}

.entry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  &:not(:last-child) {
    margin-bottom: 32px;
  }

  .key {
    h2 {
      font-weight: 600;
      margin-bottom: 8px;
    }

    p {
      color: var(--foreground-subdued);
    }
  }
}
</style>
