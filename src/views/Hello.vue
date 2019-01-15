<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="date" label="Date" width="140"/>
      <el-table-column prop="name" label="Name" width="120"/>
      <el-table-column prop="some_inf" label="Some information"/>
    </el-table>
  </el-main>
</template>

<script>
export default {
  data() {
    const item = {
      date: 'None',
      name: 'John',
      some_inf: 'None'
    }
    return {
      tableData: Array(1).fill(item)
    }
  }
}
</script>
