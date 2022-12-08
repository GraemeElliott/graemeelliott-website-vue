<template>
  <v-app>
    <v-app-bar app flat>
    
      <h1>Welcome to your Vue + Sanity Blog</h1>
      <v-list-item to="/">Home</v-list-item>
      <v-list-item to="/blog">Blog</v-list-item>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
