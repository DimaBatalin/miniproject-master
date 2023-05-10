<template>
  <div class="main_main">
    <div
      v-if="tasksFolders.length==0"
      class="notHaveFolders"
    >
      Задачи отсутствуют 
    </div>

    <div
      v-else-if="tasksFoldersObjects.length==0"
      class="notHaveFolders"
    >
      Выберете задачу
    </div>


    <div
      class="main-menu"
      v-for="(taskFolderObject, index) in tasksFoldersObjects"
      :key="index"  
    >
      <div 
        class="main-name"  
        :style="{color: taskFolderObject.folderColor}"
      >
        {{ taskFolderObject.folderName }}
        <div
          style="align-items: center; display: flex;"
          @click="changeFolderNameButton(index)"
          v-if="tasksFoldersObjects.length==1"
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
        <div style="display: flex; align-items: center;">

          <div 
            v-if="task.isDone == true"
            class="InputTaskInFolder Done" 
            @click="changeIsDone(index)"
          >
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div
            v-else
            class="InputTaskInFolder notDone" 
            @click="changeIsDone(index)"
          >
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div>
            {{ task.text }}
          </div>

        </div>
        <div 
          v-if="task.isDone==true"
          @click="deletedTask(index)"
        >
          <svg 
            width="11" 
            height="11" 
            viewBox="0 0 11 11" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="#E3E3E3"/>
          </svg>
            
        </div>
      </div>

      <button 
        v-if="tasksFoldersObjects.length===1 && taskFolderObject.title != 'все задачи' && taskFolderObject.title != 'Выберете список задач' && !isModalVisiblPole" 
        class="middleMain" 
        @click="addNewTask"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="#B4B4B4"
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
    tasksFolders: {
      type: Array,
      default() {
        return []
      },
      required: true,
    }
  },
  data() {
    return {
      isModalVisiblPole: false,
    }
  },
  methods: {
    changeFolderNameButton(index) {

      let newTitle = prompt("Новое название папки", this.tasksFoldersObjects[index].title) 
      this.$emit("changeTitleFolder", newTitle)
      console.log(newTitle, index);
    },
    addNewTask() {
      this.isModalVisiblPole = true
    },
    closeModal() {
      this.isModalVisiblPole = false
    },
    addTask(text) {
      this.$emit("newTask", text)
    },
    deletedTask(index) {
      this.$emit("delTask", index)
    },
    changeIsDone(index) {
      this.$emit("changeIsDoneTask", index)
    }
    
  },
  beforeUpdate() {
    if (this.tasksFoldersObjects.length>1) {
      this.isModalVisiblPole = false
    }
  }
}
</script>

<style scoped>
.notHaveFolders {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 5rem;
  color: #C9D1D3;
}
.main_main{
  width: 100%;
  display: flex;
  flex-direction: column;
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
.main-menu:last-child{
  padding-bottom: 5rem;
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
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-between;
}
.InputTaskInFolder {
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
  margin-right: 0.5rem;
  border: 2px solid #E8E8E8;
}
.InputTaskInFolder:hover {
  background-color: #F2F2F2;
  border-color: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Done {
  background-color: #4DD599;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #4DD599;
}
.notDone {
  border: 3px solid #E8E8E8;
  display: flex;
}
.modal {
  display: flex;
  justify-content: center;
  width: 100%;
}
* {
  color: black;
}
</style>