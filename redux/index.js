import {configureStore} from '@reduxjs/toolkit'
import {reducer as pagesListSliceReducer} from './pages/list'
import {reducer as pagesPathsSliceReducer} from './pages/paths'
import {reducer as pagesUrlsSliceReducer} from './pages/urls'
import {reducer as uiLayoutHeaderNotificationSliceReducer} from './ui/layout-header-notification'
import {reducer as pagesInitialSliceReducer} from './pages/initial'
const store = configureStore({
  reducer: {
    pagesList: pagesListSliceReducer,
    pagesPaths: pagesPathsSliceReducer,
    pagesUrls: pagesUrlsSliceReducer,
    uiLayoutHeaderNotification: uiLayoutHeaderNotificationSliceReducer,
    pagesInitial: pagesInitialSliceReducer
  }
})
export default store