import Vue from 'vue'

import AcountNotifications from '~/components/notifications.vue'
import AcountMainContent from '~/components/main-content.vue'
import AcountProgress from '~/components/ui/progress.vue'
import AcountMarkdown from '~/components/markdown.vue'
import AcountGrid from '~/components/grid.vue'
import { AcountTabs, AcountTab } from '~/components/tabs'
import {
  AcountSheet,
  AcountParty,
  AcountMentions,
  AcountReference,
} from '~/components/paper'

Vue.component(`acount-notifications`, AcountNotifications)
Vue.component(`acount-main-content`, AcountMainContent)
Vue.component(`acount-progress`, AcountProgress)
Vue.component(`acount-markdown`, AcountMarkdown)
Vue.component(`acount-grid`, AcountGrid)
Vue.component(`acount-tabs`, AcountTabs)
Vue.component(`acount-tab`, AcountTab)
Vue.component(`acount-paper`, AcountSheet)
Vue.component(`acount-party`, AcountParty)
Vue.component(`acount-mentions`, AcountMentions)
Vue.component(`acount-reference`, AcountReference)
