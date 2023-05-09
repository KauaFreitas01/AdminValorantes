<template>
  <div>
    <div class="text-left" id="header">
      <div id="titulo">
        <h1>EQUIPES</h1>
      </div>
      <div id="AddTimes">
        <v-row>
          <v-dialog v-model="dialog" width="27%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn id="BtnAddTime" dark v-bind="attrs" v-on="on">
                Adicionar Equipe
              </v-btn>
            </template>
            <v-card id="AddTimesCard" class="mx-auto">
              <v-form ref="form">
                <v-text-field
                  type="text"
                  v-model="name"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="Nome da sua equipe"
                  required
                  solo
                  outlined
                ></v-text-field>
                <v-text-field
                  type="text"
                  v-model="local"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="País de origem da equipe"
                  required
                  solo
                  outlined
                ></v-text-field>
                <v-text-field
                  type="url"
                  v-model="logo"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="Url da logo da sua equipe"
                  required
                  solo
                  outlined
                ></v-text-field>
                <div class="d-flex flex-column">
                  <v-btn class="mt-4 white--text" @click="add_time" id="btn">
                    Adicionar Equipe
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
    <div id="TimesView">
      <v-container>
        <v-row>
          <v-col v-for="times in Equipes" :key="times.id">
            <v-card height="200px" width="200px">
              <v-img
                :src="times.logo"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="200px"
                height="180px"
              >
                <v-card-title v-text="times.name"></v-card-title>
              </v-img>
              <v-spacer></v-spacer>
              {{ times.local }}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import Equipe from "../ConfigApi/Equipes";
import axios from "axios";
export default {
  name: "TimesView",
  data: () => ({
    name: "",
    local: "",
    logo: "",
    Equipes: [],
    dialog: false,
    valid: true,
  }),
  methods: {
    async add_time() {
      let form = {
        nome: this.name,
        logo: this.logo,
        local: this.local,
      };
      const valid = await this.$refs.form.validate();
      console.log(valid);
      if (valid == false) {
        return [alert("Campo obrigatório não preenchido")];
      }
      try {
        let AddTime = await axios.post(
          "https://api.valorantes.com.br/teams/add",
          form
        );
        window.alert(AddTime?.data?.msg);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    Equipe.listar().then((resposta) => {
      this.Equipes = resposta?.data?.data;
    });
  },
};
</script>
<style>
#header {
  top: 0;
  position: fixed;
  height: 9vh;
  z-index: 1;
  background-color: #03073a;
  width: 100vw;
}
#titulo {
  color: white;
  font-size: 70%;
  position: fixed;
  left: 23%;
  top: 3%;
}
#AddTimesCard {
  padding: 1rem;
  background-color: NONE;
}
#BtnAddTime {
  background-color: red;
  color: white;
  position: fixed;
  right: 30px;
  top: 25px;
  font-size: large;
}
#btn {
  background-color: red;
  color: white;
}
</style>
