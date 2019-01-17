<template>
  <el-main>
    <el-table :data="person">
      <el-table-column prop="name" label="Name" width="140"/>
      <el-table-column prop="password" label="Password" width="120"/>
      <el-table-column prop="old" label="Old" width="120"/>
      <el-table-column prop="Email" label="Email" width="120"/>
    </el-table>
  </el-main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    this.getPerson()
    return {
      person: []
    }
  },
  methods: {
    getPerson: function() {
      const url = 'http://localhost:8080/api/names'
      axios.get(url, {
        dataType: 'json',
        'Access-Control-Allow-Origin': 'localhost:8080',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE' })
        .then(response => (this.person = response.data))
    }
  }
}
</script>
