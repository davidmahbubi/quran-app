<template>
  <div class="search-bar">
    <div class="form-group">
      <label for="" v-if="label">{{ label }}</label>
      <input type="text" class="form-control" :placeholder="placeholder" />
      <button>
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'placeholder'],
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: row;
  justify-content: right;
}

input {
  margin-left: auto;
  border: none;
  border-bottom: 1.5px solid gray;
  border-radius: 0;
  outline: none;
  padding: 0;
  max-width: 300px;
  display: inline-block;
}

button {
  display: inline-block;
  border: none;
  border-radius: 25px;
  background-color: rebeccapurple;
  color: white;
  min-width: 50px;
  min-height: 50px;
  transition: 0.2s;
}

button:hover {
  background-color: rgb(58, 28, 88);
}

@media (max-width: 575px) {
  input {
    max-width: none;
  }
}
</style>
