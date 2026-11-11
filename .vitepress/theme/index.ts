import DefaultTheme from 'vitepress/theme'
import './style.css'

import CouponCard from './components/CouponCard.vue'
import SpeedtestReport from './components/SpeedtestReport.vue'
import UnlockMatrix from './components/UnlockMatrix.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import AffiliateButton from './components/AffiliateButton.vue'
import AirportFilter from './components/AirportFilter.vue'
import MobileStickyBar from './components/MobileStickyBar.vue'
import ClusterIndex from './components/ClusterIndex.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CouponCard', CouponCard)
    app.component('SpeedtestReport', SpeedtestReport)
    app.component('UnlockMatrix', UnlockMatrix)
    app.component('NetworkTopology', NetworkTopology)
    app.component('AffiliateButton', AffiliateButton)
    app.component('AirportFilter', AirportFilter)
    app.component('MobileStickyBar', MobileStickyBar)
    app.component('ClusterIndex', ClusterIndex)
  }
}
