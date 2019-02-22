<template>
  <el-main>
    <div style="display: flex">
      <el-input :span="10" v-model="search" placeholder="Type name to search"/>
      <el-button type="primary" size="large" align="right" @click="add_dialogFormVisible = true, Phonebook_user.date = getTime(), clearUser()" >Add User</el-button>
      <el-dialog :visible.sync="add_dialogFormVisible" title="Add user" align="center">
        <div style="margin: 20px;"/>
        <el-form ref="Phonebook_user" :model="Phonebook_user" :rules="AddRules" label-width="140px">
          <el-form-item label="Users date">
            <el-input v-model="Phonebook_user.date" disabled/>
          </el-form-item>
          <el-form-item
            label="Users numer"
            prop="numer">
            <el-input v-model.number="Phonebook_user.numer"/>
          </el-form-item>
          <el-form-item
            label="Users name"
            prop="name" >
            <el-input v-model="Phonebook_user.name"/>
          </el-form-item>
          <el-form-item label="Users info">
            <el-input v-model="Phonebook_user.info"/>
        </el-form-item></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="add_dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="validateForm('Phonebook_user'),add_dialogFormVisible = false, addUser(Phonebook_user), getUser()" >Add</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table
      :data="Phonebook.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="Date"
        prop="date"
        sortable/>
      <el-table-column
        label="Numer"
        prop="numer"
        sortable/>
      <el-table-column
        label="Name"
        prop="name"
        sortable/>
      <el-table-column
        label="Info"
        prop="info"/>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-button
            size="mini"
            @click="dialogFormVisible = true">Edit</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            id="button1"
            size="mini"
            @click="edit_dialogFormVisible = true, getIndex(scope.$index), fillUser(Phonebook[index])">Edit</el-button>
          <el-dialog :visible.sync="edit_dialogFormVisible" title="Edit user" align="center" >
            <div style="margin: 20px;"/>
            <el-form :model="Phonebook_user" label-width="140px">
              <el-form-item label="Users date">
                <el-input id="data_field" v-model="Phonebook_user.date" disabled/>
              </el-form-item>
              <el-form-item label="Users numer">
                <el-input v-model="Phonebook_user.numer" disabled/>
              </el-form-item>
              <el-form-item label="Users name">
                <el-input v-model="Phonebook_user.name"/>
              </el-form-item>
              <el-form-item label="Users info">
                <el-input v-model="Phonebook_user.info"/>
            </el-form-item></el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="edit_dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="edit_dialogFormVisible = false, editUser(Phonebook_user), getUser()" >Edit</el-button>
            </span>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click.native.prevent="getIndex(scope.$index), handleClose(false,Phonebook[index]), getUser()">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import axios from 'axios'
import ElMain from 'element-ui/packages/main/src/main'

export default {
  components: { ElMain },
  data() {
    this.getUser()
    const validateName = (rule, value, callback) => {
      var check = false
      for (var i = 0; i < this.Phonebook.length; i++) {
        if (value === '') {
          callback('Must be not null')
        } else {
          if (this.Phonebook[i].name === value) {
            console.log('Value - ' + value + ', name - ' + this.Phonebook[i].name)
            check = true
          }
        }
      }
      if (check) {
        callback(new Error('Name is already used'))
      } else {
        callback()
      }
    }
    const validateNumer = (rule, value, callback) => {
      var check = false
      if (value === '') {
        callback(new Error('Must be not null'))
      } else {
        for (var i = 0; i < this.Phonebook.length; i++) {
          if (this.Phonebook[i].numer === value) {
            check = true
          }
        }
      }
      if (check) {
        callback(new Error('Numer is already used'))
      } else {
        callback()
      }
    }
    return {
      AddRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        numer: [{ required: true, trigger: 'blur', validator: validateNumer }, { type: 'number', message: 'Must be a number' }]
      },
      edit_dialogFormVisible: false,
      add_dialogFormVisible: false,
      tableData: [],
      search: '',
      Phonebook: [],
      Phonebook_user: {
        date: '',
        numer: '',
        name: '',
        info: ''
      },
      Phonebook_user_new: {
        date: '',
        numer: '',
        name: '',
        info: ''
      }
    }
  },
  methods: {
    handleClose(done, user) {
      this.$confirm('Are you sure to delete?')
        .then(_ => {
          this.deleteUser(user)
          done()
        })
        .catch(_ => {})
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fillUser: function(user) {
      this.Phonebook_user.date = user.date
      this.Phonebook_user.name = user.name
      this.Phonebook_user.numer = user.numer
      this.Phonebook_user.info = user.info
    },
    clearUser: function() {
      this.Phonebook_user.numer = this.Phonebook_user.info = this.Phonebook_user.name = ''
    },
    getIndex: function(index) {
      this.index = index
      return this.index
    },
    getTime: function() {
      var date = new Date()
      var corrected_date = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes()
      return corrected_date
    },
    getUser: function() {
      this.Phonebook = []
      const url = 'http://localhost:7777/user/base'
      axios.get(url, {
        dataType: 'json' })
        .then(response => (this.Phonebook = response.data))
    },
    editUser: function(user, new_user) {
      var numer = user.numer
      const url = 'http://localhost:7777/user/edit/' + numer
      axios.put(url, user, {
        dataType: 'json'
      })
        .then(response => { console.log('edit_response' + response.data) })
    },
    addUser: function(user) {
      const url = 'http://localhost:7777/user/add'
      axios.post(url, user, {
        dataType: 'json'
      })
        .then(response => { })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    deleteUser(user) {
      var numer = user.numer
      const url = 'http://localhost:7777/user/delete/' + numer
      axios.delete(url)
    }
  }
}
</script>
