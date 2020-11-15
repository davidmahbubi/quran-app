<template>
  <div id="app">
    <div class="custom-hero">
      <i class="fas fa-quran main-logo"></i>
      <h1>The Holly Qur'an</h1>
    </div>
    <b-container>
      <router-view :key="$route.name + ($route.params.id || '')" />
    </b-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuVisible: false,
  }),
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Nunito&display=swap);

#app {
  font-family: 'Nunito', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.custom-hero {
  padding: 60px 0;
  text-align: center;
  color: white;
  background-color: rebeccapurple;
}

.custom-hero h1 {
  font-weight: bold;
}

.main-logo {
  font-size: 80px !important;
  margin-bottom: 25px;
}

.form-control:focus {
  border-color: rebeccapurple;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.custom-card-shadow {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
}
</style>
