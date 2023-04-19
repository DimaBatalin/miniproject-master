<template>
<div class="left-block">

  <div class="allTasksButton">
    <button
      @click="allTasksButton()"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        height="30" 
        viewBox="0 96 960 960" 
        width="30">
        <path 
          d="M149.825 776Q137 776 128.5 767.325q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5Zm0-170Q137 606 128.5 597.325q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5Zm0-170Q137 436 128.5 427.325q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5ZM290 776v-60h550v60H290Zm0-170v-60h550v60H290Zm0-170v-60h550v60H290Z"
        />
      </svg>
      Все задачи
    </button>
  </div>

  <div class="middleMenu">

    <div v-if="tasksFolders.length === 0">
      папок нет
    </div>

    <div 
      v-for="(taskFolder, index) in tasksFolders"
      :key="index"
      class="task"
    >
      <div 
        @click="taskFolderSelection(index)"  
        class="folderTask"
      >
        <div 
          class="folderColorTasksСircle" 
          :style="{ backgroundColor: taskFolder.color }"
        ></div>
        <div class="folderNameTasks">  
          {{ taskFolder.title }}
        </div>
      </div>
    </div>
    
    
  </div>

  <div class="addFolderTasks">
    <button 
      class="addFolderTasksButton"
      @click="addFolderTasksButton()"
      type="button"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="30" 
        viewBox="0 96 960 960" 
        width="30">
        <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
      /></svg>
      Добаить папку
    </button>
  </div>

  <modal-test
    v-show="isModalVisible"
    :ArrayColor="ArrayColor"
    @closeModal="closeModal"
  />

</div>
</template>

<script>

import modalTest from "./modalTest.vue"

export default {
  name: 'LeftBlock',
  props: {
    tasksFolders: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
  components: {
    modalTest,
  },
  data() {
    return {
      ArrayColor: [
        "#C9D1D3",
        "#42B883",
        "#64C4ED",
        "#FFBBCC",
        "#B6E6BD",
        "#C355F5",
        "#09011A",
        "#FF6464"
      ],
      isModalVisible: false,
    }
  },
  methods: {
    taskFolderSelection(index) {
      this.$emit("folderTaskClick", index)
    },
    allTasksButton() {
      this.$emit("allTasksClick")
    },
    addFolderTasksButton() {
      this.isModalVisible = true
      console.log('open Modal');
    },
    closeModal() {
      this.isModalVisible = false
      console.log("close Modal");
    }
  },
}
</script>

<style scoped>
.left-block {
  padding: 1rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  background: #F4F6F8;
}
.allTasksButton {
  display: flex;
  align-items: center;
  padding-top: 2rem;
}
.allTasksButton button{
  font-size: 1.2rem;
  font-family:Arial, Helvetica, sans-serif;
  background-color: #F4F6F8;
  border: 0px;
  display: flex;
  align-items: center;
  color: black;
  font-weight: bold;
}
.allTasksButton button svg{
  fill: #7C7C7C;
  margin-right: 1rem;
}
.middleMenu {
  padding: 1rem;
}
.addFolderTasks {
  display: flex;
}
.addFolderTasksButton {
  border: 0px;
  margin-top: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  color: #868686;
  background-color: #F4F6F8;
}
.addFolderTasksButton svg{
  fill: #868686;
  margin-right: 1rem;
}
.folderColorTasksСircle {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-right: 1rem;
}
.folderTask {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-family:Arial, Helvetica, sans-serif;
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: #F4F6F8;
}
</style>