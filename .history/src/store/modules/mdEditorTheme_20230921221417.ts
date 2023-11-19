import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeSwitch = defineStore('themeSwitch', () => {
  const active = ref(false)
  function changeActive(newActive) {
    active.value = newActive
  }

  return { active, changeActive }
})
