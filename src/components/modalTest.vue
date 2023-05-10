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
        <div
          v-if="activeIndexColor == index"
        >
          <div 
            @click="choosingColorFolder(index)"
            class="color Active" 
            :style="{backgroundColor: color}"
          ></div>
        </div>
        <div
          v-else
        >
          <div 
            @click="choosingColorFolder(index)"
            class="color" 
            :style="{backgroundColor: color}"
          ></div>
        </div>

      </div>
    </div>


    <button 
      class="AddFolderTasks"
      @click="AddFolderTasks"
    >
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
      document.querySelector(".NameNewFolderInput").value = ``
    },
    choosingColorFolder(index){
      this.choosingColor = this.ArrayColor[index]
      console.log(this.choosingColor);
      this.activeIndexColor = index
    },
    AddFolderTasks() {
      const NameNewFolderInput = document.querySelector(".NameNewFolderInput").value
      this.$emit("AddNewFolderTasks", NameNewFolderInput, this.choosingColor)  
      this.closeModal()
    }
  },
  props: {
    ArrayColor: {
      type: Array,
      default() {
        return [
          "#C9D1D3",
          "#42B883",
          "#64C4ED",
          "#FFBBCC",
          "#B6E6BD",
          "#C355F5",
          "#09011A",
          "#FF6464"
        ]
      },
      require: true
    },
  },
  data() {
    return {
      choosingColor: "#C9D1D3",
      activeIndexColor: 0,
    } 
    
  } 
};
</script>

<style>
.modal-test {
  width: 15rem;
  padding: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
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
.Active {
  border: 2px solid #525252;
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
  color: #ffffff;
}
.AddFolderTasks{
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: #4DD599;
  border-radius: 0.4rem;
  padding: 1rem 1rem 1rem 1.2rem;
  width: 85%;
  border: 0px;
  font-size: 1rem;
}
</style>