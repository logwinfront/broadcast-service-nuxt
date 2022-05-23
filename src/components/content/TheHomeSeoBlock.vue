<template>
  <div class="q-pb-md q-py-xl">
    <div class="seo-block">
      <h2>
        Онлайн-кинотеатр ivi: фильмы в хорошем качестве всегда приносят
        настоящее удовольствие
      </h2>

      <div class="text-gray-200" :class="classes">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          quo, sequi. Aspernatur eligendi mollitia nesciunt odit quas, tempora
          tempore voluptate.
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          officiis perferendis, perspiciatis placeat porro possimus repellat
          soluta tenetur. Accusamus amet commodi cumque neque. Aperiam dolorem
          error nam quibusdam velit? A ad aperiam architecto beatae deserunt
          dicta distinctio dolor dolorum eaque, earum enim ex explicabo illum
          impedit laborum modi non numquam odio quia quibusdam recusandae,
          repudiandae saepe sit soluta, tempore voluptatem voluptatibus. Ad,
          adipisci alias aliquam animi aperiam asperiores at consequuntur
          cupiditate deserunt dignissimos distinctio, doloremque dolores dolorum
          eveniet exercitationem fugiat harum id in iure labore laboriosam
          magnam maiores, natus necessitatibus nesciunt nobis numquam officia
          perspiciatis praesentium provident quasi quod reiciendis suscipit ut
          voluptate voluptatem voluptatum! Ducimus labore laborum modi
          reprehenderit?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          officiis perferendis, perspiciatis placeat porro possimus repellat
          soluta tenetur. Accusamus amet commodi cumque neque. Aperiam dolorem
          error nam quibusdam velit? A ad aperiam architecto beatae deserunt
          dicta distinctio dolor dolorum eaque, earum enim ex explicabo illum
          impedit laborum modi non numquam odio quia quibusdam recusandae,
          repudiandae saepe sit soluta, tempore voluptatem voluptatibus. Ad,
          adipisci alias aliquam animi aperiam asperiores at consequuntur
          cupiditate deserunt dignissimos distinctio, doloremque dolores dolorum
          eveniet exercitationem fugiat harum id in iure labore laboriosam
          magnam maiores, natus necessitatibus nesciunt nobis numquam officia
          perspiciatis praesentium provident quasi quod reiciendis suscipit ut
          voluptate voluptatem voluptatum! Ducimus labore laborum modi
          reprehenderit?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          officiis perferendis, perspiciatis placeat porro possimus repellat
          soluta tenetur. Accusamus amet commodi cumque neque. Aperiam dolorem
          error nam quibusdam velit? A ad aperiam architecto beatae deserunt
          dicta distinctio dolor dolorum eaque, earum enim ex explicabo illum
          impedit laborum modi non numquam odio quia quibusdam recusandae,
          repudiandae saepe sit soluta, tempore voluptatem voluptatibus. Ad,
          adipisci alias aliquam animi aperiam asperiores at consequuntur
          cupiditate deserunt dignissimos distinctio, doloremque dolores dolorum
          eveniet exercitationem fugiat harum id in iure labore laboriosam
          magnam maiores, natus necessitatibus nesciunt nobis numquam officia
          perspiciatis praesentium provident quasi quod reiciendis suscipit ut
          voluptate voluptatem voluptatum! Ducimus labore laborum modi
          reprehenderit?
        </p>
      </div>
      <p
        class="font-medium text-white text-center cursor-pointer"
        @click="updateShowFullText(!showFullText)"
      >
        {{ textButton }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHomeSeoBlock',
  data() {
    return {
      showFullText: false,
    }
  },
  computed: {
    classes() {
      return this.showFullText ? '' : 'line-clamp-5'
    },
    textButton() {
      return this.showFullText ? this.$t('collapse') : this.$t('expand')
    },
  },
  methods: {
    updateShowFullText(value) {
      this.showFullText = value
    },
  },
}
</script>

<style lang="scss">
.seo-block {
  h2 {
    margin-top: 0;
    font-size: 20px;
    line-height: 24px;
    font-weight: 900;
    font-style: normal;
    color: #fff;
  }
  p {
    font-size: 15px;
    line-height: 22px;
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>
