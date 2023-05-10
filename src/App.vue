<template>
  <div id="app">
    <div class="main">
      <div class="main-window">
        <left-block 
          :tasksFolders="tasksFolders"
          @NewFolderTasks="NewFolderTasks"   
          @allTasksClick="FolderSelection"
          @folderTaskClick="folderTaskClick"
          @folderTaskClickDeleted="folderTaskClickDeleted"
        />
        <main-menu
          :tasksFolders="tasksFolders"
          :tasksFoldersObjects="tasksFoldersObjects"
          @newTask="newTask"
          @delTask="delTask"
          @changeIsDoneTask="changeIsDoneTask"
          @changeTitleFolder="changeTitleFolder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import leftBlock from "./components/leftBlock.vue";
import mainMenu from "./components/mainMenu.vue";

export default {
  name: 'App',
  components: {
    leftBlock, 
    mainMenu,
  },
  methods: {
    FolderSelection() {
      this.tasksFoldersObjects = [
        ...this.tasksFolders
      ]
    },
    folderTaskClick(index) {
      this.tasksFoldersObjects = [this.tasksFolders[index]]
      this.activeIndex = index
    },
    folderTaskClickDeleted(index) {
      this.tasksFoldersObjects = [this.tasksFolders[index-1]]
      this.tasksFolders.splice(index, 1)
    },
    NewFolderTasks(nameNewFolderTasks, colorNewFolderTasks) {
      this.tasksFolders.push({
        taskId: 5002,
        folderName: nameNewFolderTasks,
        folderColor: colorNewFolderTasks,
        date: new Date(),
        tasks: []
      })
      this.activeIndex = this.tasksFolders.length-1
      this.tasksFoldersObjects = [this.tasksFolders[this.activeIndex]]
    },
    newTask(text) {
      this.tasksFolders[this.activeIndex].tasks.push({
        idTask: 5,
        isDone: false,
        text: text,
      })
      localStorage.setItem('folders', JSON.stringify(this.tasksFolders))
    },
    delTask(index) {
      this.tasksFolders[this.activeIndex].tasks.splice(index, 1)
      localStorage.setItem('folders', JSON.stringify(this.tasksFolders))
    },
    changeIsDoneTask(index) {
      this.tasksFolders[this.activeIndex].tasks[index].isDone = !this.tasksFolders[this.activeIndex].tasks[index].isDone
      localStorage.setItem('folders', JSON.stringify(this.tasksFolders))
    },
    changeTitleFolder(newTitle) {
      if (newTitle != null) {
        this.tasksFolders[this.activeIndex].title = newTitle
        localStorage.setItem('folders', JSON.stringify(this.tasksFolders))
      }
    },
    async getTasks(index) {
      try {
        const response = await this.$axios.post(`/tasksinfolder`, //функция fetch для получение данных
          {
            "folderId": index
          }
        )
        let tasks = []
        for (let i = 0; i < response.data.data.massage.length; i++) {
          tasks.push({
            taskId: response.data.data.massage[i].taskId,
            taskText: response.data.data.massage[i].taskText,
            isDone: response.data.data.massage[i].isDone,
            folderId: response.data.data.massage[i].folderId
          })
        }
        this.tasksFolders[index].tasks = tasks
        console.log(response.data.data.massage);
      } catch (error) {
        console.log(error);
      }
    },
    async getFolders() {
      try {
        const response = await this.$axios.post(`/folders/select`)
        // console.log(response.data.data.massage);
        this.tasksFolders = response.data.data.massage
      } catch (error) {
        console.log(error);
      }
      console.log(this.tasksFolders);
    }
  },
  data() {
    return {
      tasksFolders: [],
      tasksFoldersObjects: [],
      activeIndex: 0,
    };
  },
  watch: {
    tasksFolders(newFolders) {
      localStorage.setItem('folders', JSON.stringify(newFolders))
    }
  },
  async created() {
    await this.getFolders()
    await this.getTasks(2)
    // this.tasksFolders = JSON.parse(localStorage.getItem('folders')) || []
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  background-color: #e5e5e5;
}
.main{
  width: 100%;
  display: flex;
  justify-content: center;
}
.main-window {
  background-color: #ffffff;
  display: flex;
  width: 80%;
  min-height: calc(100vw*0.4);
}
</style>
