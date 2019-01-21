<template>
  <el-main>
    <el-table :data="person">
      <el-table-column prop="name" label="Name" width="140"/>
      <el-table-column prop="password" label="Password" width="120"/>
      <el-table-column prop="old" label="Old" width="120"/>
      <el-table-column prop="Email" label="Email" width="120"/>
    </el-table>

    <!-- Form -->
    <el-button type="info" @click="dialogFormVisible = true">Add a person</el-button>

    <el-dialog :visible.sync="dialogFormVisible" title="Add Person">
      <div style="margin: 20px;"/>
      <el-form :model="new_person" label-width="140px">
        <el-form-item label="Person name">
          <el-input v-model="new_person.name"/>
        </el-form-item>
        <el-form-item label="Person password">
          <el-input v-model="new_person.password"/>
        </el-form-item>
        <el-form-item label="Person old">
          <el-input v-model="new_person.old"/>
        </el-form-item>
        <el-form-item label="Person Email">
          <el-input v-model="new_person.Email"/>
      </el-form-item></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false, postPerson()" >Add</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    this.getPerson()
    return {
      person: [],
      dialogFormVisible: false,
      new_person: {
        id: '',
        Email: '',
        password: '',
        old: ''
      }
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
    },
    postPerson: function() {
      const url = 'http://localhost:8080/api/names/users'
      axios.post(url, this.new_person, {
        dataType: 'json',
        'Access-Control-Allow-Origin': 'localhost:8080',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      })
        .then(response => {})
    }
  }
}
</script>
