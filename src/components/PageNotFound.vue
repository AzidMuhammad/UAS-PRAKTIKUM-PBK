<template>
    <q-page class="page-not-found">
      <div class="container">
        <h1 class="title">404</h1>
        <p class="subtitle">Oops! Page Not Found</p>
        <p class="description">Halaman Ini Tidak Dapat Di Akses Di Karenakan Saya Bebas Tugas.</p>
        <q-btn label="Go Home" class="go-home-btn" @click="goHome" />
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'PageNotFound',
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .page-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    color: #333;
  }
  
  .container {
    padding: 20px;
    height: 400px;
    width: 600px;
    border: 2px dotted whitesmoke;
    border-radius: 10px;
  }
  
  .title {
    font-size: 72px;
    font-weight: bold;
    margin-bottom: -50px;
    color: whitesmoke;
  }
  
  .subtitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: -50px;
    color: #333;
  }
  
  .description {
    font-size: 18px;
    margin-bottom: -20px;
    color: #666;
  }
  
  .go-home-btn {
    font-size: 16px;
    padding: 10px 10px;
    background-color: transparent;
    border: 2px dotted whitesmoke !important;
    border-radius: 10px;
  }
  </style>
  