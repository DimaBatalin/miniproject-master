<template>
<div class="left-block">

  <div class="allTasksButton">
    <button
      @click="allTasksButton()"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 14 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z" fill="#7C7C7C"/>
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
    @AddNewFolderTasks="AddNewFolderTasks"
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
    },
    AddNewFolderTasks(nameNewFolderTasks, colorNewFolderTasks) {
      this.$emit('NewFolderTasks', nameNewFolderTasks, colorNewFolderTasks)
    }
  },
}
</script>

<style scoped>
.left-block {
  padding: 1rem;
  width: 20%;
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