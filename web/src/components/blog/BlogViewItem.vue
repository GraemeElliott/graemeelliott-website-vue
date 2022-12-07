<template>
  <div>
    <router-link :to="`/blog/${post.slug.current}`">
      <header>
        <h2>{{ post.title }}</h2>
        <h3>{{ post.categoryTitles.toString() }}</h3>
      </header>
    </router-link>
    <p>{{ post.description }}</p>
    <p v-for="category in post.categories" :key="category">
      {{ category.title }}
    </p>
    <hr />
  </div>
</template>

<script>
export default {
  name: "BlogViewItem",
  props: ["post"]
};
</script>
