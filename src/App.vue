<template>
  <div>
    <Beverage 
      :isIced="beverageStore.currentTemp === 'Cold'" 
      :baseColor="beverageStore.currentBase?.color || ''" 
      :syrupColor="beverageStore.currentSyrup?.color || ''" 
      :creamerColor="beverageStore.currentCreamer?.color || ''"
    />
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in beverageStore.bases" :key="base.id">
          <label>
            <input
              type="radio"
              name="base"
              :id="base.id"
              :value="base"
              v-model="beverageStore.currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in beverageStore.syrups" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="syrup.id"
              :value="syrup"
              v-model="beverageStore.currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in beverageStore.creamers" :key="creamer.id">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="creamer.id"
              :value="creamer"
              v-model="beverageStore.currentCreamer"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>
    </ul>
    <input 
      type="text" 
      placeholder="Beverage Name" 
      v-model="beverageStore.beverageName"
      id="beverage-name"
    />
    <button @click="beverageStore.makeBeverage()">🍺 Make Beverage</button>
  </div>
  <div id="beverage-container" style="margin-top: 20px">
    <!-- Display saved beverages -->
    <div v-if="beverageStore.beverages.length > 0">
      <h3>Saved Beverages</h3>
      <div>
        <label v-for="beverage in beverageStore.beverages" :key="beverage.id" style="display: block; margin: 5px 0;">
          <input 
            type="radio" 
            name="savedBeverage" 
            :value="beverage.id" 
            :checked="beverageStore.selectedBeverage?.id === beverage.id"
            @change="beverageStore.showBeverage(beverage)"
          />
          {{ beverage.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import { onMounted } from "vue";

const beverageStore = useBeverageStore();

onMounted(() => {
  // Initialize the store when the component mounts
  beverageStore.init();
});
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}

#beverage-container {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
}

input[type="text"] {
  padding: 6px 10px;
  margin-right: 5px;
}

button {
  cursor: pointer;
}
</style>