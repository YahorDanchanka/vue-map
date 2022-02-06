<template>
  <ul class="list-group">
    <li
      v-for="user in users"
      class="list-group-item"
      :class="{ active: user.id === socketId }"
    >
      {{ user.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IUser } from '@/store'

const props = defineProps({
  users: {
    type: Array as PropType<IUser[]>,
    required: true,
  },
  socketId: String,
})
</script>
