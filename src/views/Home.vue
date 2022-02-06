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
import { io, Socket } from 'socket.io-client'
import { IUser } from '@/store'
import UserList from '@/components/UserList.vue'

const users = ref<IUser[]>([])
const socketId = ref('')

let socket: Socket | null = null

onMounted(() => {
  const map = L.map('map').setView([52.42416, 31.014281], 16)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  socket = io('localhost:3000')

  socket.on('connect', () => {
    socketId.value = socket?.id || ''

    socket?.on('usersChange', (usersList: IUser[]) => {
      users.value = usersList
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
