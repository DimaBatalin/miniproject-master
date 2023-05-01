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
      this.tasksFolders.splice(index, 1)
    },
    NewFolderTasks(nameNewFolderTasks, colorNewFolderTasks) {
      this.tasksFolders.push({
        id: 5001,
        title: nameNewFolderTasks,
        color: colorNewFolderTasks,
        date: new Date(),
        tasks: []
      })
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
    }
  },
  data() {
    return {
      tasksFolders: [
        {
          id: 0,
          title: 'Test1',
          color: "#42B883",
          date: new Date(),
          tasks: [
            {
              idTask: 0, 
              isDone: false,
              text: "посапать1",
            },
          ]
        },
        {
          id: 1,
          title: 'Test2',
          color: "#64C4ED",
          date: new Date(),
          tasks: [
            {
              idTask: 1, 
              isDone: true,
              text: "посапать2",
            },
          ]
        },
        {
          id: 1,
          title: 'Test2',
          color: "#64C4ED",
          date: new Date(),
          tasks: [
          ],
        },
      ],
      tasksFoldersObjects: [],
      activeIndex: 0,
    };
  },
  watch: {
    tasksFolders(newFolders) {
      localStorage.setItem('folders', JSON.stringify(newFolders))
    }
  },
  created() {
    this.tasksFolders = JSON.parse(localStorage.getItem('folders')) || []
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
