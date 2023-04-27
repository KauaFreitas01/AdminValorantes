<template>
  <v-app>
    <div id="CorpoApp">
      <div id="menuLateral">
        <v-img src="../public/download.png" id="logoValorant"></v-img>
        <nav>
          <v-list dense id="list">
            <v-subheader id="valorante">VALORANTES</v-subheader>
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
      </div>
      <div id="pageView">
        <router-view id="Views" />
      </div>
    </div>
  </v-app>
</template>
<style lang="scss">
#pageView {
  width: 80%;
  float: right;
  text-align: center;
  background-color: #2a2f74;
}
#Views {
  margin-top: 5%;
  margin-bottom: 5%;
}
#menuLateral {
  width: 20%;
  float: left;
  position: fixed;
}
nav {
  a {
    text-decoration: none;
    &.router-link-exact-active {
      background-color: red;
      color: white;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 10px;
    }
  }
}
#list {
  background-color: rgba($color: #000000, $alpha: 0.9);
  height: 1000px;
}
#logoValorant {
  padding: 0;
  height: 60px;
  width: 60px;
  float: left;
  margin-left: 30px;
  margin-top: 30px;
}
#valorante {
  color: white;
  margin-bottom: 100px;
  margin-top: 30px;
  font-size: 30px;
  font-family: "Sigmar", cursive;
}

#ListGroup {
  width: 200px;
  margin: 15px;
}
.v-list-item {
  margin-bottom: 30px;
}
</style>
