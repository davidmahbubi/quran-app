<template>
  <div class="home">
    <SearchBar class="mt-5" placeholder="Cari Surah" />
    <b-row class="surah-list-container">
      <b-col :md="4" v-for="(surah, index) in surahList" :key="index">
        <router-link :to="{ path: `/surah/${surah.id}` }" class="surah-link">
          <b-card class="custom-card-shadow border-0">
            <b-card-body class="p-3">
              <h3 class="mb-1 font-weight-bold">{{ surah.title }}</h3>
              <span>{{ surah.translation }}</span>
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'Home',
  data: () => ({
    surahList: [
      {
        id: 1,
        title: 'Al-Fatihah',
        translation: 'Pembukaan',
      },
      {
        id: 2,
        title: 'Al-Baqarah',
        translation: 'Sapi Betina',
      },
    ],
  }),
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.surah-list-container {
  margin: 60px 0;
}

.custom-card-shadow {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
}

.surah-link {
  text-decoration: none;
  color: rebeccapurple;
}

.surah-link:hover {
  color: rgb(77, 37, 117);
}

.surah-link:hover > .card {
  transform: scale(1.02);
}
</style>
