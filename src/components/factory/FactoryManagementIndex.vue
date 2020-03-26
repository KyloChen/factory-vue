<template>
  <div>
  <el-row :gutter="24">
    <el-col :span="24">
      <div style="width: 100%; height: auto; text-align: center; padding: 5px 0; background: gray">
        <span style="color: whitesmoke; font-size: 18px">酒窖无线测温管理系统</span>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="24">
    <el-col :span="4">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">设备详情</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">设备总览</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>基础数据</span>
          </template>
          <el-menu-item-group>
            <template slot="title">基站及设备</template>
            <el-menu-item index="3-1">基站管理</el-menu-item>
            <el-menu-item index="3-2">设备管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="用户管理">
            <el-menu-item index="3-3">用户管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="摄像头管理">
            <el-menu-item index="3-3">摄像头管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <div>
        <div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, i) in breadcrumbItems" :key="i">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div style="margin-top:10px">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import NavMenu from '../common/NavMenu'
export default {
  name: 'FactoryManagementIndex',
  components: {NavMenu},
  data () {
    return {
      breadcrumbItems: ['设备详情']
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getPlantId()
    })
  },
  methods: {
    getPlantId () {
      let plantId = this.$utils.getUrlKey('plantId')
      console.log(plantId + 'aaaaaaaaaaa')
    },

    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/pitSelector')
          this.breadcrumbItems = ['设备详情']
          break
        case '2':
          this.$router.push('/Page2')
          this.breadcrumbItems = ['导航二']
          break
        case '3':
          this.$router.push('/Page3')
          this.breadcrumbItems = ['导航三']
          break
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
</style>
