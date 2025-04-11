import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    selectedBeverage: null as BeverageType | null,
    beverageName: "",
  }),

  actions: {
    async init() {
      try {
        // Load bases from Firestore
        const basesSnapshot = await getDocs(collection(db, "bases"));
        this.bases = basesSnapshot.docs.map(
          (doc) => doc.data() as BaseBeverageType
        );

        // Load creamers from Firestore
        const creamersSnapshot = await getDocs(collection(db, "creamers"));
        this.creamers = creamersSnapshot.docs.map(
          (doc) => doc.data() as CreamerType
        );

        // Load syrups from Firestore
        const syrupsSnapshot = await getDocs(collection(db, "syrups"));
        this.syrups = syrupsSnapshot.docs.map(
          (doc) => doc.data() as SyrupType
        );

        // Set default values
        if (this.bases.length > 0) this.currentBase = this.bases[0];
        if (this.creamers.length > 0) this.currentCreamer = this.creamers[0];
        if (this.syrups.length > 0) this.currentSyrup = this.syrups[0];

        // Set up listener for beverages collection
        const beveragesRef = collection(db, "beverages");
        onSnapshot(beveragesRef, (snapshot) => {
          this.beverages = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              temp: data.temp,
              base: data.base,
              syrup: data.syrup,
              creamer: data.creamer,
            } as BeverageType;
          });
        });
      } catch (error) {
        console.error("Error initializing store:", error);
      }
    },

    async makeBeverage() {
      if (!this.currentBase || !this.currentCreamer || !this.currentSyrup) {
        console.error("Missing beverage components");
        return;
      }

      try {
        // Create new beverage document in Firestore
        const beverageData = {
          name: this.beverageName || "Unnamed Beverage",
          temp: this.currentTemp,
          base: this.currentBase,
          syrup: this.currentSyrup,
          creamer: this.currentCreamer,
          createdAt: new Date(),
        };

        await addDoc(collection(db, "beverages"), beverageData);

        // Reset beverage name
        this.beverageName = "";
      } catch (error) {
        console.error("Error saving beverage:", error);
      }
    },

    showBeverage(beverage: BeverageType) {
      // Set selected beverage
      this.selectedBeverage = beverage;

      // Update current selections to match selected beverage
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base;
      this.currentSyrup = beverage.syrup;
      this.currentCreamer = beverage.creamer;
    },
  },
});