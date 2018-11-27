<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VuejsDatepicker from 'vuejs-datepicker'
import { en, fr } from 'vuejs-datepicker/dist/locale'
import dayjs from 'dayjs'

import numberFormats from '~/locales/number-formats'
import { LOCALE } from '~/store/user'

const now = new Date()
const datepickerLocales = {
  en,
  fr,
}
const i18n = {
  numberFormats,
  messages: {
    en: {
      placeholder: `dd/mm/yyyy`,
    },
    fr: {
      placeholder: `jj/mm/aaaa`,
    },
  },
}

export default Vue.extend({
  name: `acount-datepicker`,
  i18n,
  components: {
    VuejsDatepicker,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    value: {
      type: [String, Date],
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      highlighted: {
        dates: [now],
      },
      disabledDates: {
        from: now,
      },
    }
  },
  computed: {
    htmlFor() {
      return this.id || this.name
    },
    language() {
      return datepickerLocales[this.locale]
    },
    wrapperClasses() {
      return { 'acount-datepicker--no-label': !this.label }
    },
    ...mapGetters(`user`, {
      locale: LOCALE,
    }),
  },
  methods: {
    onInput(value) {
      this.$emit(`input`, value)
    },
    format(date) {
      return dayjs(date).format(`DD/MM/YYYY`)
    },
  },
})
</script>

<template lang="pug">
.acount-datepicker(:class="wrapperClasses")
  label.acount-datepicker__label(
    v-if="label"
    :for="htmlFor"
  ) {{ label }}
  vuejs-datepicker.acount-datepicker__input(
    :name="name"
    :id="htmlFor"
    :placeholder="$t( `placeholder` )"
    :value="value"
    :monday-first="true"
    @input="onInput"
    :format="format"
    :highlighted="highlighted"
    :disabledDates="disabledDates"
    :language="language"
  )
</template>

<style lang="scss" scoped>
@import './form-mixins';
.acount-datepicker {
  @include input-base();
  @include input-bottom-border();
  @include input-floating-label();

  /deep/ .day {
    border-radius: 100%;
    &:not(.blank):not(.disabled):not(.selected):hover {
      border: 0 none;
      background-color: var(--c-accent-lightest);
    }
  }
  /deep/ .highlighted {
    background: none;
    font-weight: bold;
  }
  /deep/ .selected {
    background-color: var(--v-accent-base);
    color: white;
  }
}
</style>
