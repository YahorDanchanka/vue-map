<template>
  <div class="container mt-3">
    <div class="row g-3">
      <div class="col-lg-8">
        <div id="map"></div>
      </div>
      <div class="col-lg-4">
        <ul class="list-group">
          <li class="list-group-item active">Егор Данченко</li>
          <li class="list-group-item">Егорова Мария</li>
          <li class="list-group-item">Ефремов Максим</li>
          <li class="list-group-item">Мельников Леонид</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import L from 'leaflet'

onMounted(() => {
  const map = L.map('map').setView([52.42416, 31.014281], 16)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
})
</script>

<style lang="sass" scoped>
#map
  height: 450px
</style>
