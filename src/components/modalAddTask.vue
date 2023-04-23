<template>
  <div class="modalAddTask">
    <input class="textTask" type="text">
    <div class="modal-addtask-buttons">
      <button class="addTask" @click="addTask">Добавть задачу</button>
      <button class="closeAddNewTask" @click="close">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalAddTask",
  methods: {
    close() {
      this.$emit("closeModal")
      document.querySelector(".textTask").value = ''
    },
    addTask() {
      this.$emit("addTask", document.querySelector(".textTask").value)
      this.close()
    }
  },
}
</script>

<style scoped>
.modalAddTask {
  width: 80%;
  margin: 1rem;
}

.textTask {
  border: 1px solid #EFEFEF;
  border-radius: 4px;
  width: 90%;
  height: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0;
}
.modal-addtask-buttons {
  display: flex;
  width: 60%;
  justify-content: space-around;
}
.addTask {
  background: #4DD599;
  border: 0;
  border-radius: 4px;
  color: white;
  width: 40%;
  padding: 0.7rem;
  margin: 0.5rem 0 0.5rem 0;
}
.closeAddNewTask {
  background: #F4F6F8;
  border: 0;
  color: #9C9C9C;
  border-radius: 4px;
  width: 40%;
  padding: 0.7rem;
  margin: 0.5rem 0 0.5rem 0;
}

</style>