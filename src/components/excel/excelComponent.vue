<template>
  <div class="main">
      <h1>{{this.$router.history.current.name}}导入导出</h1>
      <a href="javascript:;" class="file">导入表格
        <input id="upload" type="file" @change="importfExcel(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      </a>
  </div>
</template>
<script>
export default {
  name: 'Excel',
  data() {
    return {}
  },
  methods: {
    exportExcel() {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.excelData = this.dataList // 你要导出的数据list
        this.export2Excel()
      }).catch((e) => {
        alert(e)
      })
    },
    export2Excel() {
      var _this = this
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../assets/excel/Export2Excel.js') // 这里必须使用绝对路径
        const tHeader = ['id', 'withNum', 'userId', 'name', 'amount', 'status', 'amountIn', 'amountSuccess', 'createTime'] // 导出的表头名
        const filterVal = ['id', 'withNum', 'userId', 'name', 'amount', 'status', 'amountIn', 'amountSuccess', 'createTime'] // 导出的表头字段名
        const list = _this.excelData
        const data = _this.formatJson(filterVal, list)
        let time1, time2 = ''
        if (this.start !== '') {
          time1 = _this.moment(_this.start).format('YYYY-MM-DD')
        }
        if (this.end !== '') {
          time2 = _this.moment(_this.end).format('YYYY-MM-DD')
        }
        export_json_to_excel(tHeader, data, `[${time1}-${time2}]提现管理excel`) // 导出的表格名称，根据需要自己命名
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style scoped>

</style>
