import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import BrandCard from './components/BrandCard.vue'
import SpeedTestReport from './components/SpeedTestReport.vue'
import UnlockMatrix from './components/UnlockMatrix.vue'
import AffiliateButton from './components/AffiliateButton.vue'
import DisclaimerBox from './components/DisclaimerBox.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BrandCard', BrandCard)
    app.component('SpeedTestReport', SpeedTestReport)
    app.component('UnlockMatrix', UnlockMatrix)
    app.component('AffiliateButton', AffiliateButton)
    app.component('DisclaimerBox', DisclaimerBox)
  }
} satisfies Theme
