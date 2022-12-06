<template>
  <div class="blog">
    <h1>Welcome to your Vue + Sanity Blog</h1>
    <p v-for="filter in filters" :key="filter" @click="filterPosts(filter)">
      {{ filter }}
    </p>
    <div class="posts">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="container">
        <div v-for="post in posts" class="post-item" :key="post.id">
          <router-link :to="`/blog/${post.slug.current}`">
            <h2>{{ post.title }}</h2>
            <h2>{{ post.categoryTitles.toString() }}</h2>
          </router-link>
          <p>{{ post.description }}</p>
          <p v-for="category in post.categories" :key="category">
            {{ category.title }}
          </p>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from '../client';
import { ref } from 'vue';

const filters = ref([
  'All',
  'Web Development',
  'Product Management',
  'Data Analysis',
  'Music',
  'Personal',
]);

const activeFilter = ref('');

function filterPosts(type) {
  activeFilter.value = type;
}
const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    titleColour,
    slug,
    postCardType,
    "authorName": author->name,
    publishedAt,
    body,
    description,
    mainImage{
        asset -> {
            _id,
            url
        }
    },
    categories [] -> {
      title,
      slug
    },
    "categoryTitles": categories[]->title,
  }`;

export default {
  name: 'BlogView',
  data() {
    return {
      loading: true,
      posts: [],
      filters,
      filterPosts,
      activeFilter,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (posts) => {
          this.loading = false;
          this.posts = posts;
        },
        (error) => {
          this.error = error;
        }
      );
    },
    async mounted() {
      this.posts = await this.fetchData();
    },
  },
};
</script>

<style scoped>
.blog h1 {
  text-align: center;
}
.container {
  margin: 0 auto;
  max-width: 42em;
  width: 100%;
}
.post-item {
  box-sizing: border-box;
}
</style>
