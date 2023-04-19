<template>
  <div class="main-menu">

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
          xmlns="http://www.w3.org/2000/svg" 
          height="25" 
          viewBox="0 96 960 960" 
          width="25"
          fill="#DFDFDF"
        >
          <path 
          d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" 
          />
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





    <button class="middleMain" @click="addNewFolder()">
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
</template>

<script>
export default {
  name: 'mainMenu',
  props: {
    taskFolderObject: {
      type: Object,
      default() {
        return {
          title: 'red',
          color: "red",
        }
      },
      required: true,
    },
  },
  methods: {
    changeFolderNameButton() {
      console.log("change");
    },
    addNewFolder(){
      console.log("add");
    },
  },
}
</script>

<style scoped>
.main-name{
  margin-top: 0.7rem;
  border-bottom: 1px solid;
  border-color: #F2F2F2;
  width: 85%;
  display: flex;
  align-items: center;
  font-size: 3rem;
  padding: calc(100%/25);
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
  width: 90%;
  margin-top: 1rem;
}
.taskInFolder {
  width: 95%;
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
}
* {
  color: black;
  
}
</style>