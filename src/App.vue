<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      show-if-above
      v-model="drawer"
      side="left"
      bordered
      elevated
      class="custom-drawer"
    >
      <q-list link>
        <q-item v-for="(url, index) in tugasLinks" :key="'tugas' + (index + 1)">
          <q-icon name="splitscreen" class="q-lg" />
          <router-link
            to="/"
            exact-active-class="active"
            class="q-item-label"
            @click.native="navigateTo(url)"
          >
            Tugas {{ index + 1 }}
          </router-link>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-header elevated class="bg-black text-white">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="drawer = !drawer"
            icon="menu"
          />
        </q-toolbar>
      </q-header>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      tugasLinks: [
        'https://zidd-project-cv.netlify.app/',
        'https://tugas2-muhammadzackyamaazid.netlify.app/',
        'https://tugas3-muhammadzackyamaazid.netlify.app/',
        'https://tugas4-zidd.netlify.app/',
        'https://filzdudiable.netlify.app/',
        'https://tugas6-zidd.netlify.app/',
        '../components/PageNotFound.vue'
      ]
    };
  },
  methods: {
    handleDrawerItemClick() {
      this.drawer = false;
    },
    navigateTo(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.bg-black {
  background-color: #000000;
}

.text-white {
  color: #ffffff;
}

.custom-drawer {
  width: 250px;
  background-color: #263238;
  color: black;
}

.custom-drawer .q-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: black;
}

.custom-drawer .q-item .q-icon {
  font-size: 16px;
}

.custom-drawer .q-item:hover {
  font-weight: bold;
}

.custom-drawer .q-item.active {
  font-weight: bold;
}

.custom-drawer .q-item-label {
  margin-left: 12px;
  color: black;
  text-decoration: none;
  font-size: 14px;
}

.custom-drawer .q-item-label.active {
  font-weight: bold;
}

.custom-drawer .q-item-label:hover {
  font-weight: bold;
}

.q-header {
  background-color: #000000;
  color: #ffffff;
}
</style>
