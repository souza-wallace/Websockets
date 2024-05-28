<template>
  <main>
    <h1>LOGIN</h1>
    <input type="text" name="" placeholder="email" v-model="email">
    <input type="password" name="" placeholder="senha" v-model="password">
    <button @click="logar()">logar</button>
    <!-- <div>
      <h1>Chat</h1>
      <ul>
        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
      </ul>
    </div> -->
  </main>
</template>

<script>

import axios from 'axios';
import { useStore } from 'vuex';

export default {
  data() {
      return {
          email: '',
          password: '',
          messages: [],
          me: {}
      }
  },
  
  mounted() {
    console.log('home')
  },

  methods: {
    logar(){
      axios
      .post("http://127.0.0.1:8001/api/auth/login", { email: this.email, password: this.password })
      .then((response) => {
        if(response.status != 200){
          console.log(response.error)
        }
        const token = response.data.token;
        const user = response.data.user;

        this.$store.dispatch('saveUser',   user );
        this.$store.dispatch('saveToken',   token );

        console.log('logado com sucuesso')
        this.$router.push('/about');
      });
    }
  },
  computed: {
  },

}
</script>
