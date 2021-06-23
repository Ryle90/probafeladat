<template>
  <div class="table-container">
    <table class="table is-narrow" v-if="dataForTable !== null">
      <thead>
        <tr>
          <th>id</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dataForTable in datasForTable" :key="dataForTable.id">
          <td>{{dataForTable.id}}</td>
          <td>{{dataForTable.text}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'data',

  data () {
    return {
      datasForTable: null
    }
  },

  created () {
    const token = window.localStorage.getItem('token');
    
    fetch('http://localhost:3000/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token
      }
    })
    .then(response => response.json())
    .then(data => {
      this.datasForTable = JSON.parse(data)
    })
  }
}
</script>

<style scoped>
  table {
    margin-top: 20px;
    margin-left: 15px;
    min-width: 50%
  }
</style>