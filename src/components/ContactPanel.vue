<template>
  <div class="panel contact-panel">
    <div class="panel-content">
      <p class="panel-title">Contact</p>

      <p style="margin-left: 10px">Send comments to <a href="mailto:info@giscube.org">info@giscube.org</a>

      <p style="margin-left: 10px">
  <span class="contact-title">Giscube</span><br>
  github.com/giscube<br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPanel',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.contact-panel {
  .contact-title {
    font-weight: bold;
  }
}
</style>
