import { createStore } from 'vuex'
import L from 'leaflet'

export type Waypoints = L.LatLng[]

export interface IUser {
  id: string
  name: string
  waypoints?: Waypoints
}

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
})
