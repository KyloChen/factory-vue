<template>
  <div>
    <img style="position: absolute">
    <img class="plant" v-for="(item, index) in items"
         :style="{left: item.clientX + 'px', top: item.clientY + 'px'}" :key="index" :plantId="item.plantId"
         src="../../assets/Marker-blue.png" style="position: absolute"
         @click="intoManagement($event)"
    >
    <el-button type="primary" id="addPlantBtn" @click="addPlant">添加车间</el-button>
    <!-- 模态框部分 -->
    <div style="z-index: 9998" id="loading" class="loading" @click="showShade">
      <div class="gif">点击页面确认新增车间位置</div>
    </div>
    <el-dialog
      id="addPlantDialog"
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form :label-position="labelPosition" :inline="true" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="plantForm.plantCode">
                <template slot="prepend">车间号：</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="plantForm.plantName">
                <template slot="prepend">车间名：</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="plantForm.clientX" :disabled="true">
                <template slot="prepend">横坐标：</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="plantForm.clientY" :disabled="true">
                <template slot="prepend">纵坐标：</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePlant">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <canvas id="mapCanvas">
    </canvas>
  </div>
</template>

<script>
import ElRow from 'element-ui/packages/row/src/row'
import $ from 'jquery'
// import qs from 'qs'
export default {
  components: {ElRow},
  inject: ['reload'],
  name: 'PlantMapIndex',
  data () {
    return {
      labelPosition: 'right',
      dialogVisible: false,
      plantForm: {
        plantCode: '',
        plantName: '',
        clientX: '',
        clientY: ''
      },
      items: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initPlant()
    })
  },
  methods: {
    addPlant: function () {
      console.log('111')
      $('#loading').css('display', 'block')
    },
    showShade (e) {
      console.log('clientX: ' + e.clientX + ', clientY: ' + e.clientY)
      this.plantForm.clientX = e.clientX
      this.plantForm.clientY = e.clientY
      this.dialogVisible = true
      $('#loading').css('display', 'none')
    },
    initPlant () {
      this.$axios
        .get('/getPlant')
        .then(resp => {
          if (resp && resp.status === 200) {
            console.log(resp)
            if (resp.data === '') {
              alert('无车间数据，请添加并刷新页面')
            }
            for (let i = 0; i < resp.data.length; i++) {
              console.log(resp.data[i].clientX)
              let item = {}
              item.plantId = resp.data[i].plantId
              item.clientX = resp.data[i].clientX
              item.clientY = resp.data[i].clientY
              console.log(item)
              this.items.push(item)
            }
            console.log(this.items)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    savePlant () {
      console.log('start save plant')
      console.log(this.plantForm.plantCode)
      this.$axios
        .post('/savePlant', {
          plantCode: this.plantForm.plantCode,
          plantName: this.plantForm.plantName,
          clientX: this.plantForm.clientX,
          clientY: this.plantForm.clientY
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            console.log(resp.data)
            this.dialogVisible = false
            this.reload()
          }
        })
    },
    intoManagement (e) {
      let plantId = e.target.getAttribute('plantId')
      this.$router.replace({path: '/management?plantId=' + plantId})
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}

</script>

<style scoped>
#mapCanvas{
  width: 100%;
  height: 100%;
  background:  white url(../../assets/factorymap.png) 0 50% no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
#addPlantBtn{
  position: absolute;
  left: 0;
  top: 0;
}
/* 模态框样式 */
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  opacity: 0.4;
  z-index: 9998;
  display:  none;
}

/* 动图样式 */
.loading .gif {
  color: whitesmoke;
  position: fixed;
  left: 37%;
  top: 50%;
  margin-left: -16px;
  margin-top: -16px;
  font-size: 30px;
}
</style>
