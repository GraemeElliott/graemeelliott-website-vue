import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import PostView from '../views/PostView.vue';
// const posts = {};
// function fetchPostData(slug) {
//   let error = this.post = null;
//   let loading = true;
//   if(!!posts[slug]){
//     return true;
//   }

//   return sanity.fetch(query, { slug }).then(
//     (post) => {
//       this.loading = false;
//       posts[slug] = post;
//       this.blocks = post.body;

//       return true;
//     },
//     (error) => {
//       this.error = error;
//       return false;
//     }
//   );
// };

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView,
    children: [{
      path: ':slug',
      
      name: 'post',
      props:true,
      component: PostView,
    },]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
