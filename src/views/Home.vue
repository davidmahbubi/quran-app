<template>
  <div class="home">
    <SearchBar class="mt-5" placeholder="Cari Surah" />
    <b-row class="surah-list-container">
      <b-col
        :md="6"
        :lg="4"
        v-for="(surah, index) in surahList"
        :key="index"
        class="mb-4"
      >
        <router-link
          :to="{ path: `/surah/${surah.number}` }"
          class="surah-link"
        >
          <b-card class="custom-card-shadow border-0">
            <b-card-body class="p-3">
              <h3 class="mb-1 font-weight-bold" :title="surah.tafsir.id">
                {{ `${index + 1}. ${surah.name.transliteration.id}` }}
              </h3>
              <span>{{ surah.name.translation.id }}</span>
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { GET_SURAH_LIST } from './../store/actions.type';
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'Home',
  created() {
    this.fetchSurahList();
  },
  data: () => ({
    surahList: [],
  }),
  methods: {
    async fetchSurahList() {
      try {
        const surahList = await this.$store.dispatch(`surah/${GET_SURAH_LIST}`);
        this.surahList = surahList;
      } catch (err) {
        console.error(err);
      }
    },
  },
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

.surah-link .card {
  transition: 0.1s;
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
