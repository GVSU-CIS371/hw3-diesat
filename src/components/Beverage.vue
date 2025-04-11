<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <template v-slot:top>
        <Creamer v-if="showCreamer" :creamerColor="creamerColor" />
      </template>
      <template v-slot:mid>
        <Syrup v-if="showSyrup" :syrupColor="syrupColor" />
      </template>
      <template v-slot:bottom>
        <Base :baseColor="baseColor" />
      </template>
    </Contents>
  </Mug>
</template>

<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";
import { computed } from "vue";

interface Props {
  isIced: boolean;
  baseColor: string;
  syrupColor: string;
  creamerColor: string;
}

const props = defineProps<Props>();

const showCreamer = computed(() => {
  return props.creamerColor !== "transparent";
});

const showSyrup = computed(() => {
  return props.syrupColor !== "transparent";
});
</script>