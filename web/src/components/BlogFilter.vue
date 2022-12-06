<template>
  <p v-for="filter in filters" :key="filter" @click="() => filterPosts(filter.slug)">
    {{ filter.name }}
  </p>
</template>

<script>
const filters = [
  { slug: 'web-development', name: 'Web Development' },
  { slug: 'product-management', name: 'Product Management' },
];

export default {
  name: 'BlogFilter',
  data() {
    return {
      filters,
    };
  },
};
</script>
