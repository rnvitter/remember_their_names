<template>
  <div class="card-buttons">
    <link-button
      v-if="item.custom_link_name && item.custom_link_value"
      color="var(--accent-color)"
      textColor="#000000"
      :text="item.custom_link_name"
      :link="item.custom_link_value">
    </link-button>
    <link-button
      v-if="item.youtube && item.is_youtube_trailer === 'FALSE'"
      color="#FF0000"
      textColor="#ffffff"
      text="Youtube"
      :link="item.youtube">
      <youtube-icon slot="icon" size="26"></youtube-icon>
    </link-button>
    <link-button
      v-if="item.netflix"
      color="#E50914"
      textColor="#ffffff"
      text="Netflix"
      :link="item.netflix">
      <netflix-icon slot="icon" size="20"></netflix-icon>
    </link-button>
    <link-button
      v-if="item.hulu"
      color="#000000"
      textColor="#3DBB3D"
      text="Hulu"
      :link="item.hulu">
      <hulu-icon slot="icon" size="20"></hulu-icon>
    </link-button>
    <link-button
      v-if="item.prime_video"
      color="#00A8E1"
      textColor="#ffffff"
      text="prime video"
      :link="item.prime_video">
      <amazon-icon slot="icon" size="20"></amazon-icon>
    </link-button>
    <link-button
      v-if="item.youtube && item.is_youtube_trailer === 'TRUE'"
      color="#FF0000"
      textColor="#ffffff"
      text="Trailer"
      :link="item.youtube">
      <youtube-icon slot="icon" size="26" style="color: #FF0000;"></youtube-icon>
    </link-button>
    <img
      v-if="item.apple_store"
      src="@/assets/app-store.png"
      style="height: 36px; margin-right: 10px;"
      @click="goTo(item.apple_store)">
    <img
      v-if="item.google_play"
      src="@/assets/google-play-store.png"
      style="height: 36px;"
      @click="goTo(item.google_play)">
    <!-- <link-button
      color="#FF0000"
      textColor="var(--accent-color)"
      text="More"
      :textButton="true">
    </link-button> -->
    <link-button
      v-if="item.hbo"
      color="#ffffff"
      textColor="#000000"
      :link="item.hbo">
      <img
      slot="icon"
      src="@/assets/hbo.png" style="height: 16px;">
    </link-button>
    <link-button
      v-if="item.spotify"
      color="#1DB954"
      textColor="#ffffff"
      text="Spotify"
      :link="item.spotify">
      <spotify-icon slot="icon" size="20"></spotify-icon>
    </link-button>
    <link-button
      v-if="item.apple_music"
      color="#B166CC"
      textColor="#ffffff"
      text="Apple Music"
      :link="item.apple_music">
      <apple-icon slot="icon" size="20"></apple-icon>
    </link-button>
    <link-button
      v-if="item.goodreads"
      color="#F4F1EA"
      textColor="#000000"
      text="goodreads"
      :link="item.goodreads">
      <goodreads-icon slot="icon" size="20"></goodreads-icon>
    </link-button>
    <link-button
      v-if="item.amazon"
      color="#FF9900"
      textColor="#000000"
      text="Amazon"
      :link="item.amazon">
      <amazon-icon slot="icon" size="20"></amazon-icon>
    </link-button>
    <link-button
      v-if="item.google_books"
      color="#d14836"
      textColor="#ffffff"
      text="Google Books"
      :link="item.google_books">
      <google-icon slot="icon" size="20"></google-icon>
    </link-button>
    <link-button
      v-if="item.wikipedia"
      color="#ffffff"
      textColor="#222222"
      text="Wikipedia"
      :link="item.wikipedia">
      <wikipedia-icon slot="icon" size="20"></wikipedia-icon>
    </link-button>
  </div>
</template>

<script>
import AmazonIcon from 'mdi-vue/Amazon.vue'
import AndroidIcon from 'mdi-vue/Android.vue'
import AppleIcon from 'mdi-vue/Apple.vue'
import GoodreadsIcon from 'mdi-vue/Goodreads.vue'
import GoogleIcon from 'mdi-vue/Google.vue'
import HuluIcon from 'mdi-vue/Hulu.vue'
import NetflixIcon from 'mdi-vue/Netflix.vue'
import SpotifyIcon from 'mdi-vue/Spotify.vue'
import YoutubeIcon from 'mdi-vue/Youtube.vue'
import WikipediaIcon from 'mdi-vue/Wikipedia.vue'

import LinkButton from './LinkButton'
import mixin from '@/mixin'

const mixins = [mixin]

const props = {
  item: {
    type: Object,
    required: true
  }
}

const components = {
  AmazonIcon,
  AndroidIcon,
  AppleIcon,
  GoodreadsIcon,
  GoogleIcon,
  HuluIcon,
  LinkButton,
  NetflixIcon,
  SpotifyIcon,
  YoutubeIcon,
  WikipediaIcon
}

export default {
  name: 'Buttons',
  mixins,
  props,
  components
}
</script>

<style>
.card-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.card-buttons .link-button {
  margin: 10px 10px 0 0;
}
</style>
