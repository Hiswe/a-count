import Vue from 'vue'

import AcountNotifications from '~/components/notifications.vue'
import AcountMainContent from '~/components/main-content.vue'
import AcountHeader from '~/components/header.vue'
import AcountProgress from '~/components/ui/progress.vue'
import AcountMarkdown from '~/components/markdown.vue'
import AcountGrid from '~/components/grid.vue'
import { AcountTabs, AcountTab } from '~/components/tabs'
import {
  AcountTableProducts,
  AcountTableEditProducts,
} from '~/components/table'
import { AcountDate } from '~/components/format'
import {
  AcountInput,
  AcountTextarea,
  AcountSelect,
  AcountDatepicker,
  AcountCheckbox,
} from '~/components/form'
import {
  AcountSheet,
  AcountParty,
  AcountPartyUser,
  AcountMentions,
  AcountReference,
} from '~/components/paper'

Vue.component(`acount-notifications`, AcountNotifications)
Vue.component(`acount-main-content`, AcountMainContent)
Vue.component(`acount-header`, AcountHeader)
Vue.component(`acount-progress`, AcountProgress)
Vue.component(`acount-markdown`, AcountMarkdown)
Vue.component(`acount-grid`, AcountGrid)
Vue.component(`acount-input`, AcountInput)
Vue.component(`acount-textarea`, AcountTextarea)
Vue.component(`acount-select`, AcountSelect)
Vue.component(`acount-datepicker`, AcountDatepicker)
Vue.component(`acount-checkbox`, AcountCheckbox)
Vue.component(`acount-tabs`, AcountTabs)
Vue.component(`acount-tab`, AcountTab)
Vue.component(`acount-paper`, AcountSheet)
Vue.component(`acount-party`, AcountParty)
Vue.component(`acount-party-user`, AcountPartyUser)
Vue.component(`acount-mentions`, AcountMentions)
Vue.component(`acount-reference`, AcountReference)
Vue.component(`acount-table-products`, AcountTableProducts)
Vue.component(`acount-table-edit-products`, AcountTableEditProducts)
Vue.component(`acount-date`, AcountDate)
