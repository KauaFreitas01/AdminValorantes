<template>
  <div class="container">
    <div class="form">
      <form>
        <h1>Login</h1>
        <label for="username">Usuário</label>
        <input type="text" id="username" v-model="username" />

        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" />

        <button type="submit" @click.prevent="login">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Verifique as credenciais do usuário
      if (this.username === "admin" && this.password === "password") {
        // Armazene as credenciais no localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ username: this.username })
        );
        // Redirecione para a página home
        this.$router.push("/");
      } else {
        alert("Credenciais inválidas");
      }
    },
  },
};
</script>

<style>
.container {
  display: contents;
  height: 100vh;
}
.form {
  background-image: url(../assets/valwide_2560x1440-99f1632f76e12ddc17d4245a74f29fc5.jpg);
  color: white;
  padding: 22rem;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 25vw;
}

label {
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  background-color: white;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(252, 2, 2, 0.521);
}

button {
  padding: 0.5rem;
  background-color: red;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.397);
  cursor: pointer;
}

button:hover {
  background-color: rgba(252, 2, 2, 0.521);
}
</style>
