<template>
  <div class="home">
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
        if (this.$store.getters[`surah/getSurahList`].length > 0) {
          this.surahList = this.$store.getters[`surah/getSurahList`];
        } else {
          this.surahList = await this.$store.dispatch(
            `surah/${GET_SURAH_LIST}`
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.surah-list-container {
  margin: 60px 0;
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
