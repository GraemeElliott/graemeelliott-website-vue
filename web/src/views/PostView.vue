<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h1>{{ post.title }}</h1>
      <img v-if="post.image" :src="imageUrlFor(post.image).width(480)" />

      <h6>By: {{ post.authorName }}</h6>
      <SanityBlocks :blocks="blocks" />
    </div>
  </div>
</template>

<script>
import { SanityBlocks } from 'sanity-blocks-vue-component';
import sanity from '../client';
import imageUrlBuilder from '@sanity/image-url';
const imageBuilder = imageUrlBuilder(sanity);
const query = `*[slug.current == $slug] {
    _id,
    title,
    slug,
    body, 
   "image": mainImage{
    asset->{
    _id,
    url
  }
  },
    "authorName": author->name,
    "authorImage": author->image,
    "authorTitle": author->title,
    "authorGithub": author->githubUrl,
    "authorLinkedIn": author->linkedInUrl,
    "authorInstagram": author->instagramUrl,
    "authorBio": author->bio,
    publishedAt,
    categories [] -> {
        title,
        slug
    },
    "nextPost": *[_type == "post" && ^.publishedAt < publishedAt]|order(publishedAt asc)[0]{
    title,
    "slug": slug.current
    },
    "previousPost": *[_type == "post" && ^.publishedAt > publishedAt]|order(publishedAt desc)[0]{
    title,
    "slug": slug.current
    }

  }[0]
  `;
export default {
  name: 'PostView',
  components: { SanityBlocks },
  data() {
    return {
      loading: true,
      post: [],
      blocks: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query, { slug: this.$route.params.slug }).then(
        (post) => {
          this.loading = false;
          this.post = post;
          this.blocks = post.body;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 42em;
}
h1 {
  text-align: center;
}
h6 {
  color: #aaa;
  padding: 1em;
}
</style>
