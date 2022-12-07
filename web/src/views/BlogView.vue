<template>
  <div class="blog">
    <h1>Welcome to your Vue + Sanity Blog</h1>
    <div v-for="filter in filters" :key="`${filter}`">
      <input
        type="checkbox"         
        :name="`${filter}-check`"
        :value="filter"
        v-model="selectedFilters"
      />
      <label for="`${filter}-check`"> {{ filter }}</label>
    </div>

    <div class="posts">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="container">
        <blog-view-item v-for="post in filteredPosts" class="post-item" :key="post.id" :post="post" ></blog-view-item>
 
      </div>
    </div>
  </div>
</template>

<script lang="js">
import sanity from "../client";
import BlogViewItem from "../components/blog/BlogViewItem.vue";

// const selectedFilters = ref([]);

// const filters = ref([
//   "All",
//   "Web Development",
//   "Product Management",
//   "Data Analysis",
//   "Music",
//   "Personal",
// ]);

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
  name: "BlogView",
  components:{
    BlogViewItem
  },
  data() {
    return {
      loading: true,
      posts: [],
      filteredPosts: [],
      filters: [
        "All",
        "Web Development",
        "Product Management",
        "Data Analysis",
        "Music",
        "Personal",
      ],
      selectedFilters: [],
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (posts) => {
          this.loading = false;
          this.posts = posts;
          this.filteredPosts = posts;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
  watch: {
    selectedFilters: {
      async handler(selectedCategories) {
        if (selectedCategories.length < 1) {
          this.filteredPosts = this.posts;
          return;
        }

        this.filteredPosts = this.posts.filter((post) =>
          selectedCategories.some((category) => post.categories.map(c=>c.title).includes(category))
        );
      },
      immediate: true,
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
