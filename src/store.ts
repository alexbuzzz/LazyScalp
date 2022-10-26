import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // Modal workspace
      isWorkspaceOpen: false,
      workspaceTicker: '',

      // Chart columns
      chartColumns: 3,

      //Grid view timeframe
      gridTimeframe: '1m'
    }
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store') || ''))
        )
      }
    },

    saveSettings(state) {
      localStorage.setItem('store', JSON.stringify(state))
      console.log('Saved to localstorage')
    },

    openWorkspace(state, ticker) {
      state.isWorkspaceOpen = true
      state.workspaceTicker = ticker
    },

    changeGridTimeframe(state, interval) {
      state.gridTimeframe = interval
    }
  }
})

export default store
