<template>
  <Layout>
    <transition name="fade">
      <div v-show="showCounter" class="counter">
        {{ scrolled }}
      </div>
    </transition>

    <div class="main" ref="main">
      <div class="row">
        <h1>
          From Jan. 1, 2015 to June 2, 2020 police killed
          <span class="warning">{{ totalDead }}</span> people in the united
          states.
        </h1>
      </div>
      <div class="row boxes">
        <div class="box">
          <h2>4757</h2>
          <h3>No Body Cam Footage</h3>
        </div>
        <div class="box">
          <h2>1203</h2>
          <h3>Displayed Signs of Mental Illness</h3>
        </div>
        <div class="box">
          <h2>178</h2>
          <h3>Killed while carrying a toy weapon</h3>
        </div>
        <div class="box">
          <h2>965</h2>
          <h3>Unarmed or not reported with a weapon</h3>
        </div>
      </div>
      <div class="row">
        <div v-for="people in $page.murders" :key="people.id">
          <div
            class="person"
            v-for="person in people[0].node.records"
            :key="person.id"
          >
            {{ person.name }}
            <div class="details">
              <span
                >{{ person.age }} / {{ person.race | race }} /
                {{ person.gender }}</span
              >
              <span>Armed: {{ person.armed | armed }}</span>
              <span>Body Cam: {{ person.body_camera | camera }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer row">
        <h1>
          this is a problem. please consider donating to the
          <a href="https://minnesotafreedomfund.org/donate"
            >MINNESOTA FREEDOM FUND</a
          >
        </h1>
        <p>
          All data is from
          <a href="https://github.com/washingtonpost/data-police-shootings"
            >Washington Posts Police Shootings Dataset</a
          >.
        </p>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Everything is terrible."
  },
  data() {
    return {
      scrolled: false,
      minScroll: 1,
      totalDead: 5360
    };
  },
  methods: {
    handleScroll() {
      let curY = window.scrollY / (document.body.scrollHeight - 600);
      this.scrolled = Number((curY * this.totalDead).toFixed(0));
      this.scrolled =
        this.scrolled > this.totalDead - 20 ? this.totalDead : this.scrolled;
    }
  },
  created() {
    if (process.isClient) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  filters: {
    race: function(value) {
      switch (value) {
        case "W":
          return "White";
        case "A":
          return "Asian";
        case "N":
          return "Native American";
        case "H":
          return "Hispanic";
        case "O":
          return "Other";
        default:
          return "Unknown";
      }
    },
    armed: function(value) {
      switch (value) {
        case "undetermined":
        case "unarmed":
        case "toy weapon":
        case "":
          return "No";
        default:
          return "Yes";
      }
    },
    camera: function(value) {
      return value == "True" ? "Yes" : "No";
    }
  },
  computed: {
    showCounter() {
      return this.scrolled > this.minScroll ? true : false;
    }
  }
};
</script>

<page-query>
query{
  murders: allPolice{
    edges{
      node{
        records{
          id
          name
          date
          age
          armed
          gender
          race
          body_camera
          state
          city
        }
      }
    }
  }
}
</page-query>
