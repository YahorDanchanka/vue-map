<template>
  <div class="container mt-3">
    <div class="row g-3">
      <div class="col-lg-8">
        <div id="map"></div>
      </div>
      <div class="col-lg-4">
        <UserList :users="users" :socket-id="socketId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onDeactivated, onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { io, Socket } from 'socket.io-client'
import { IUser } from '@/store'
import UserList from '@/components/UserList.vue'

const users = ref<IUser[]>([])
const socketId = ref('')

let socket: Socket | null = null

onMounted(() => {
  const map = L.map('map').setView([52.42416, 31.014281], 16)

  L.Marker.prototype.options.icon = L.icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  socket = io(`${location.hostname}:3000`)

  socket.on('connect', () => {
    socketId.value = socket?.id || ''

    socket?.on('usersChange', (usersList: IUser[]) => {
      users.value = usersList
    })

    const controls: L.Routing.Control[] = []

    socket?.on('getWaypoints', (usersList: IUser[]) => {
      controls.forEach((control) => control.remove())

      usersList.forEach((user) => {
        if (user.waypoints) {
          const control = L.Routing.control({
            waypoints: user.waypoints,
            show: false,
            fitSelectedRoutes: false,
            routeWhileDragging: true,
            useZoomParameter: true,
            lineOptions: {
              styles: [
                {
                  color: user.id === socket?.id ? 'red' : 'green',
                  opacity: 1,
                  weight: 5,
                },
              ],
            },
          }).addTo(map)
          controls.push(control)
        }
      })

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        socket?.emit('getWaypoints', [
          L.latLng(coords.latitude, coords.longitude),
          L.latLng(52.41969, 31.008933),
        ])
      })
    })
  })
})

onDeactivated(() => {
  socket?.disconnect()
})
</script>

<style lang="sass" scoped>
#map
  height: 450px
</style>
