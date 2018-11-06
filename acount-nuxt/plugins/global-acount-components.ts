import Vue from 'vue'

import AcountNotifications from '~/components/notifications.vue'
import AcountProgress from '~/components/ui/progress.vue'
import AcountMarkdown from '~/components/markdown.vue'
import { AcountTabs, AcountTab } from '~/components/tabs'
import { AcountSheet } from '~/components/paper'

Vue.component(`acount-notifications`, AcountNotifications)
Vue.component(`acount-progress`, AcountProgress)
Vue.component(`acount-markdown`, AcountMarkdown)
Vue.component(`acount-tabs`, AcountTabs)
Vue.component(`acount-tab`, AcountTab)
Vue.component(`acount-paper`, AcountSheet)
