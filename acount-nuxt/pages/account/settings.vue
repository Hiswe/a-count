<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import clonedeep from 'lodash.clonedeep'

import { UserState } from '~/types/acount-store'
import { AcountParty } from '~/components/paper'

const i18n = {
  messages: {
    en: {
      from: `from`,
      'default-product': `Default product`,
      mentions: `Footer mentions`,
      reference: `Reference number`,
    },
    fr: {
      from: `Coordonnées`,
      'default-product': `Produit par défaut`,
      mentions: `Bas de page`,
      reference: `Nº de référence`,
    },
  },
}
const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA`,
}
const currencies = [
  { value: `USD`, label: `US Dollars` },
  { value: `EUR`, label: `Euros` },
  { value: `THB`, label: `Thai Bahts` },
]
const languages = [
  { value: `fr`, label: `français` },
  { value: `en`, label: `english` },
]

export default Vue.extend({
  name: `page-settings`,
  i18n,
  components: {
    AcountParty,
  },
  meta: {
    authRequired: true,
  },
  data() {
    return { form: {} }
  },
  computed: {
    ...mapState<UserState>(`user`, {
      user: state => state.user,
    }),
  },
  created() {
    this.form = clonedeep(this.user)
  },
})
</script>

<template lang="pug">
acount-main-content(title="#settings")
  acount-tabs
    template(slot="header")
      | {{ user.lang }}
      |
      | {{ user.currency }}
    acount-tab.account-settings-panel.account-settings-panel--from(
      :title="$t(`from`)"
    )
      acount-paper(part="top-left")
        acount-party(title="from" :people="form" )
    acount-tab(:title="$t(`default-product`)")
      | {{$t(`default-product`)}}
    acount-tab(:title="$t(`mentions`)")
      | {{$t(`footer-mentions`)}}
    acount-tab(:title="$t(`reference`)")
      | {{$t(`reference`)}}
</template>

<style lang="scss" scoped>
.account-settings-panel {
  &--from {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--s-big-gutter);
  }
}
</style>

