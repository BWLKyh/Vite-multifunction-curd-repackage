<script setup>
import { useRouter, RouterLink, RouterView } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="container">
    <nav>
      <span v-for="item in router.options.routes" :key="item.name">
        <RouterLink v-if="item.type !== 'edit'" :to="item.path">{{
          item.type === 'list' ? item.name + '(mockData)' : item.name
        }}</RouterLink>
      </span>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 86vw;
}
:deep(.el-pagination) {
  margin-top: 20px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
