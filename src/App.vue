<template>
  <div id="app">
    <div class="main">
      <div class="main-window">
        <left-block 
          :tasksFolders="tasksFolders"
                  
          @allTasksClick="FolderSelection()"
          @folderTaskClick="folderTaskClick"
        />
        <main-menu
          :taskFolderObject="taskFolderObject"
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
      this.taskFolderObject = {
        id: 5000,
        title:"все задачи",
        color: 'black',
      }
    },
    folderTaskClick(index) {
      
      this.taskFolderObject = this.tasksFolders[index]
      console.log(this.tasksFolders, this.tasksFolders[index]);
    },
    
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
      taskFolderObject: {
        id: 5000,
        title:"Выберете список задач",
        color: 'black',
      },
    };
  },
  // watch: {
  //   tasksFolders(newFolders) {
  //     localStorage.setItem('folders', JSON.stringify(newFolders))
  //   }
  // },
  // created() {
  //   this.tasksFolders = JSON.parse(localStorage.getItem('folders')) || []
  // }
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
  height: calc(100vw*0.4);
}
</style>
