<template>
  <div class="main">
    <div
      class="main-menu"
      v-for="(taskFolderObject, index) in tasksFoldersObjects"
      :key="index"  
    >
      <div 
        class="main-name"  
        @click="changeFolderNameButton()"
        :style="{color: taskFolderObject.color}"
      >
        {{ taskFolderObject.title }}
        <div
          v-if="taskFolderObject.title != 'все задачи' && taskFolderObject.title != 'Выберете список задач'"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z" fill="#DFDFDF"/>
          </svg>
          
        </div>
      </div>

      <div v-if="taskFolderObject.tasks.lenght == 0">
        Нет задач
      </div>

      <div
        v-for="(task, index) in taskFolderObject.tasks"
        :key="index"
        class="taskInFolder"
      >

        <input class="InputTaskInFolder" type="checkbox" v-bind:checked="task.isDone" @click="task.isDone = !task.isDone">
        <div>{{ task.text }}</div>

      </div>

      <button 
        v-if="tasksFoldersObjects.length===1 && taskFolderObject.title != 'все задачи' && taskFolderObject.title != 'Выберете список задач' && !isModalVisiblPole" 
        class="middleMain" 
        @click="addNewTask"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30" 
          viewBox="0 96 960 960" 
          width="30"
          fill="#B4B4B4"
        >
          <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
        /></svg>
        Новая задача
      </button>
    </div>
    <div class="modal">
      <modalAddTask
        v-show="isModalVisiblPole"
        @closeModal="closeModal"
        @addTask="addTask"
      ></modalAddTask>
    </div>
  </div>
</template>

<script>
import modalAddTask from './modalAddTask.vue'
export default {
  name: 'mainMenu',
  components: {
    modalAddTask,
  },
  props: {
    tasksFoldersObjects: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
  data() {
    return {
      isModalVisiblPole: false,
    }
  },
  methods: {
    changeFolderNameButton() {
      console.log("change");
    },
    addNewTask() {
      this.isModalVisiblPole = true
    },
    closeModal() {
      this.isModalVisiblPole = false
    },
    addTask(text) {
      this.$emit("newTask", text)
    }
  },
}
</script>

<style scoped>
.main{
  width: 100%;
}
.main-name{
  margin-top: 2.7rem;
  border-bottom: 1px solid;
  border-color: #F2F2F2;
  width: 85%;
  display: flex;
  align-items: center;
  font-size: 3rem;
  padding-bottom: calc(100%/25);
}
.main-name svg {
  margin-left: 1rem; 
  background-color: #ffffff; 
  border: 0px;
}
.main-menu {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.middleMain{
  border: 0px;
  background-color: #ffffff;
  color: #B4B4B4;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  width: 85%;
  margin-top: 1rem;
}
.taskInFolder {
  width: 85%;
  display: flex;
  padding: 0.5rem;
  margin: 0.5rem;
  margin-left: 3rem;
  font-size: 1.4rem;
  align-items: center;
}
.InputTaskInFolder {
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin-right: 0.5rem;
  border: 2px solid #E8E8E8;
}
.modal {
  display: flex;
  justify-content: center;
}
* {
  color: black;
  
}
</style>