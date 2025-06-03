<template>
  <view class="debug-panel" v-if="showDebug">
    <view class="debug-header">
      <text>SVG 参数调试</text>
      <button @click="showDebug = false">关闭</button>
    </view>
    
    <view class="debug-content">
      <view class="debug-item">
        <text>距离 (distance):</text>
        <input type="range" v-model="debugDistance" min="0" max="500" step="1" />
        <text>{{ debugDistance }}</text>
      </view>
      
      <view class="debug-item">
        <text>宽度 (width):</text>
        <input type="range" v-model="debugWidth" min="100" max="500" step="1" />
        <text>{{ debugWidth }}</text>
      </view>
      
      <view class="debug-item">
        <text>控制点1 Y:</text>
        <input type="range" v-model="controlPoint1Y" min="0" max="50" step="1" />
        <text>{{ controlPoint1Y }}</text>
      </view>
      
      <view class="debug-item">
        <text>控制点2 Y:</text>
        <input type="range" v-model="controlPoint2Y" min="0" max="50" step="1" />
        <text>{{ controlPoint2Y }}</text>
      </view>
      
      <view class="debug-preview">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" :viewBox="`0 0 ${debugWidth} 50`">
          <path fill="#f3d76a" :d="`M 0 10 L 0 40 Q ${debugWidth/2} ${controlPoint1Y}, ${debugWidth} 50 L ${debugWidth} 0 Q ${debugWidth/2} ${controlPoint2Y}, 0 10 Z`"></path>
        </svg>
      </view>
      
      <view class="debug-info">
        <text>当前路径:</text>
        <text class="path-d">{{ `M 0 10 L 0 40 Q ${debugWidth/2} ${controlPoint1Y}, ${debugWidth} 50 L ${debugWidth} 0 Q ${debugWidth/2} ${controlPoint2Y}, 0 10 Z` }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDebug = ref(true)
const debugDistance = ref(300)
const debugWidth = ref(300)
const controlPoint1Y = ref(20)
const controlPoint2Y = ref(30)
</script>

<style scoped>
.debug-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  z-index: 9999;
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.debug-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.debug-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.debug-preview {
  width: 100%;
  height: 100px;
  background: white;
  margin: 10px 0;
}

.debug-info {
  font-size: 12px;
}

.path-d {
  word-break: break-all;
  font-family: monospace;
}
</style> 