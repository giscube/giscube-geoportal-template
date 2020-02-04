<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {
  AppGeoportal
} from '@giscube/geoportal'

require('@giscube/geoportal/dist/lib/giscube-geoportal.min.css')

export default {
  name: 'App',
  extends: AppGeoportal,
  methods: {
    automaticVersioning () {
      return process.env.NODE_ENV === 'production'
    }
  }
}
</script>

<style lang="scss">
.panel {
  .q-table {
    background-color: transparent;
  }
  .q-table.striped-odd tr:nth-child(odd) {
    background-color: rgba(0,0,0,.027);
  }
  .q-table > tbody > tr > th, .q-table > tbody > tr > td {
    font-size: 1em;
    padding: 3px;
    margin-bottom: 0;
    height: auto;
    border-top: 1px solid #dee2e6;
  }
  .q-table > tbody > tr > th {
    font-size: 1em;
    font-weight: bold;
    color: #212529;
    text-align: left;
  }
}
</style>
