<template>
    <div>
      <p>usuario logado: {{user?.name}}</p> <br>
      <p>Id: {{user?.id}}</p>
      <p>
        {{ user?.capacidades }}
      </p>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      user: JSON.parse(this.$store.state.user),
      token: this.$store.state.token
    }
  },

  mounted(){
    if(!this.user.capacidades.includes('upload_solis')){
      // this.$router.push('/');
      // console.log(1)
    }
  },

  methods: {
   
  },
  computed: {
    // ...mapState(['user', 'token']),
  },

}
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
