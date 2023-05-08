<template>
  <v-app id="app">
    <div id="CorpoApp">
      <div id="menuLateral">
        <v-img src="../public/download.png" id="logoValorant"></v-img>
        <nav>
          <v-list dense id="list">
            <v-list-item-group id="ListGroup">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="white darken-2">
                    mdi-home-analytics
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <router-link to="/" style="color: white">Inicio</router-link>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="white darken-2">
                    mdi-account-group-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <router-link to="/times" style="color: white"
                    >Equipes</router-link
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="white darken-2"> mdi-play </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <router-link to="/matchs" style="color: white"
                    >Partidas</router-link
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </nav>
        <v-btn @click="logout" id="deslogar">deslogar</v-btn>
      </div>
      <div id="pageView">
        <router-view id="Views" />
      </div>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "App",
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss">
#app {
  width: auto;
  height: auto;
  background-color: black;
}
#pageView {
  width: 80%;
  height: 100%;
  float: right;
  text-align: center;
  background-color: #2a2f74;
}
#Views {
  margin-top: 35vh;
  margin-bottom: 25%;
}
#menuLateral {
  width: 20%;
  height: 100%;
  float: left;
  position: fixed;
}
nav {
  a {
    text-decoration: none;
    &.router-link-exact-active {
      background-color: red;
      color: white;
      padding-left: 17px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 10px;
    }
  }
}
#list {
  background-color: black;
  margin-left: 10px;
}
#logoValorant {
  padding: 0;
  height: 10%;
  width: 30%;
  margin-left: 35%;
  margin-top: 15%;
  margin-bottom: 15%;
}
#ListGroup {
  width: 190px;
}
.v-list-item {
  margin-bottom: 30px;
}
#deslogar {
  position: fixed;
  bottom: 5px;
  left: 5px;
  background-color: red;
  color: white;
}
</style>
