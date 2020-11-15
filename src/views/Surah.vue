<template>
  <div class="surah">
    <b-overlay :show="!ready">
      <b-card class="mt-5 custom-card-shadow border-0">
        <b-card-body class="p-0 toolbar">
          <b-row v-if="ready">
            <b-col :cols="4" class="d-flex left-toolbar">
              <div class="content" v-if="surah.number - 1 !== 0">
                <router-link
                  :to="{ path: `/surah/${surah.number - 1}` }"
                  replace
                >
                  <i class="fas fa-arrow-left back-icon"></i>
                  <h3 class="d-inline-block ml-3 font-weight-bold number">
                    {{ surah.number - 1 }}
                  </h3>
                </router-link>
              </div>
            </b-col>
            <b-col :cols="4" class="text-center">
              <h3 class="mb-1">{{ surah.name.short }}</h3>
              <span>{{
                `${surah.name.transliteration.id} (${surah.name.translation.id})`
              }}</span>
            </b-col>
            <b-col :cols="4" class="d-flex right-toolbar">
              <div
                class="content text-right w-100"
                v-if="surah.number + 1 !== 115"
              >
                <router-link
                  :to="{ path: `/surah/${surah.number + 1}` }"
                  replace
                >
                  <h3 class="d-inline-block mr-3 font-weight-bold number">
                    {{ surah.number + 1 }}
                  </h3>
                  <i class="fas fa-arrow-right next-icon"></i>
                </router-link>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-overlay>
    <b-list-group class="my-4 border-0 custom-card-shadow" v-if="ready">
      <b-list-group-item
        v-for="(verse, index) in surah.verses"
        :key="index"
        :id="`verse-${verse.number.inSurah}`"
        class="verse-item pt-5 pb-4 px-5"
      >
        <div class="text-right mb-3">
          <h3 class="verse-text">{{ verse.text.arab }}</h3>
        </div>
        <span class="d-block">
          {{ `${verse.number.inSurah}. ${verse.text.transliteration.en}` }}
        </span>
        <span class="d-block my-3">
          {{ verse.translation.id }}
        </span>
        <ul class="btn-list">
          <li>
            <button
              :id="`bt-play-${verse.number.inSurah}`"
              @click="togglePlay([verse.number.inSurah, index])"
            >
              <i class="fas fa-play"></i>
            </button>
          </li>
          <li>
            <button
              v-b-popover.click.blur="verse.tafsir.id.short"
              :title="
                `Tafsiran ayat ${verse.number.inSurah} surat ${surah.name.transliteration.id}`
              "
            >
              <i class="fas fa-info"></i>
            </button>
          </li>
        </ul>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { GET_SURAH } from './../store/actions.type';

export default {
  created() {
    this.surahNum = this.$route.params.id;
    this.getSurah(this.surahNum);
  },
  data: () => ({
    surahNum: 0,
    surah: {},
    ready: false,
    player: {
      currentPlayedEl: null,
      playedButtonEl: null,
      playedNumber: 0,
    },
  }),
  methods: {
    async getSurah(surahNumber) {
      try {
        const surah = await this.$store.dispatch(
          `surah/${GET_SURAH}`,
          surahNumber
        );
        this.surah = surah;
        this.ready = true;
      } catch (err) {
        console.error(err);
      }
    },
    togglePlay([number, index]) {
      const audioEl = document.querySelector(`#verse-audio-${number}`);
      const audioTag = audioEl || this.makeAudioTag(number, index);
      const playedBt = document.querySelector(`#bt-play-${number}`);
      if (this.player.currentPlayedEl) this.pause();
      this.appendPlayerInfo(audioTag, number, playedBt);
      this.play(audioTag, number, playedBt);
    },
    makeAudioTag(number, index) {
      const audioTag = document.createElement('audio');
      audioTag.setAttribute('src', this.surah.verses[index].audio.primary);
      audioTag.setAttribute('id', `verse-audio-${number}`);
      document.querySelector(`#verse-${number}`).appendChild(audioTag);
      return audioTag;
    },
    play() {
      this.player.currentPlayedEl.play();
    },
    pause() {
      this.player.currentPlayedEl.pause();
    },
    appendPlayerInfo(audioTag, number, playedButtonEl) {
      this.player.playedNumber = number;
      this.player.currentPlayedEl = audioTag;
      this.player.playedButtonEl = playedButtonEl;
      this.player.currentPlayedEl.addEventListener('pause', () => {
        playedButtonEl.innerHTML = `<i class="fas fa-play"></i>`;
      });
      this.player.currentPlayedEl.addEventListener('play', () => {
        playedButtonEl.innerHTML = `<i class="fas fa-pause"></i>`;
      });
    },
    setTafsir() {},
  },
  computed: {
    getComputedSurah() {
      return this.surah;
    },
    getPlayedIndex() {
      console.log(this.player.playedNumber);
      return this.player.playedNumber;
    },
    buttonCollapse() {
      return window.innerWidth < 768;
    },
  },
};
</script>

<style scoped>
.toolbar .back-icon,
.toolbar .next-icon {
  font-size: 30px;
  align-content: flex-end;
  color: rebeccapurple;
}

.toolbar .back-icon:hover,
.toolbar .next-icon:hover {
  transform: scale(1.1);
}

.right-toolbar,
.left-toolbar {
  align-items: center;
}

.toolbar h3 {
  margin-left: auto;
  margin-bottom: 0;
}

.number {
  text-decoration: none;
  color: rebeccapurple;
}

.verse-text {
  line-height: 50px;
}

.control-bt {
  opacity: 0;
}

.verse-item:hover > .control-bt {
  opacity: 1;
}

.btn-list {
  padding: 0;
  margin-top: 10px;
}

.btn-list li {
  list-style-type: none;
  display: inline-block;
  margin-right: 6px;
}

.btn-list li button {
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rebeccapurple;
  color: white;
  padding: 0;
}

.btn-list li button:hover {
  background-color: rgb(66, 31, 100);
}
</style>
