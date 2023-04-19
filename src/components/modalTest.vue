<template>
  <div class="modal-test">

    <button
      class="btn-close"
      @click="closeModal()"
    >
      x
    </button>


    <input class="NameNewFolderInput" type="text">


    <div class="array-color">
      <div 
        v-for="(color, index) in this.ArrayColor"
        :key="index"
      >
        <div class="color" :style="{backgroundColor: color}"></div>
      </div>
    </div>


    <button class="AddFolderTasks">
      Добавить
    </button>


  </div>
</template>

<script>
export default {
  name: "modalTest",
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
  props: {
    ArrayColor: {
      type: Array,
      default() {
        return [
          "rgb(201 209 211)",
          "rgb(66 184 131)",
          "rgb(100 196 237)",
          "rgb(255 187 204)",
          "rgb(182 230 189)",
          "rgb(195 85 245)",
          "rgb(9 1 25)",
          "rgb(255 100 100)"
        ]
      },
      require: true
    },
  } 
};
</script>

<style>
.modal-test {
  width: 15rem;
  padding: 0.5rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.8rem;
}
.NameNewFolderInput{
  border: 1px solid #bdbdbd;
  width: 80%;
  height: 2rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem;
  font-size: 1rem;
}
.array-color{
  width: 85%;
  justify-content: space-between;
  display: flex;
}
.color{
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
}
.btn-close{
  display: flex;
  text-align: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  position: relative;
  right: -8rem;
  top: -0.5rem;
  border: 0px;
  background-color: #5C5C5C;
}
.AddFolderTasks{
  margin-top: 1rem;
  background: #4DD599;
  border-radius: 0.4rem;
  padding: 1rem 1rem 1rem 1.2rem;
  width: 85%;
  border: 0px;
  font-size: 1rem;
}
</style>