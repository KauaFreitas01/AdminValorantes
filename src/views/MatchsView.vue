<template>
  <div>
    <div class="text-left" id="header">
      <div id="titulo">
        <h1>PARTIDAS</h1>
      </div>
      <div id="AddTimes">
        <v-row>
          <v-dialog v-model="dialog" width="27%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn id="BtnAddTime" dark v-bind="attrs" v-on="on">
                Adicionar Partida
              </v-btn>
            </template>
            <v-card class="mx-auto" id="cardForm">
              <v-form ref="form">
                <v-combobox
                  v-model="team1"
                  :items="items"
                  item-text="name"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  :item-value="(items) => items"
                  label="Equipe 1"
                  required
                  clearable
                  dense
                  outlined
                  small-chips
                  solo
                ></v-combobox>
                <v-combobox
                  v-model="team2"
                  :items="items"
                  item-text="name"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  :item-value="(items) => items"
                  label="Equipe 2"
                  required
                  clearable
                  dense
                  outlined
                  small-chips
                  solo
                ></v-combobox>
                <v-text-field
                  type="number"
                  v-model="result1"
                  :counter="2"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="Resultado equipe 1"
                  required
                  solo
                  outlined
                ></v-text-field>
                <v-text-field
                  type="number"
                  v-model="result2"
                  :counter="2"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="Resultado equipe 2"
                  required
                  solo
                  outlined
                ></v-text-field>
                <v-combobox
                  v-model="local"
                  :items="['Lockin', 'VCTAmericas', 'Online']"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="Local da partida"
                  required
                  clearable
                  dense
                  outlined
                  small-chips
                  solo
                ></v-combobox>
                <v-select
                  v-model="status"
                  :items="[
                    { id: 1, text: 'EM ANDAMENTO' },
                    { id: 2, text: 'ENCERRADA' },
                  ]"
                  item-value="id"
                  item-text="text"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  label="Status"
                  required
                  clearable
                  dense
                  outlined
                  small-chips
                  solo
                ></v-select>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="data"
                  persistent
                  width="290px"
                  id="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data"
                      label="Picker in dialog"
                      v-bind="attrs"
                      v-on="on"
                      solo
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="data">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn color="primary" @click="$refs.dialog.save(data)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                <div class="d-flex flex-column">
                  <v-btn id="btn" class="mt-4 white--text" @click="add_matchs">
                    Adicionar Partida
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
    <div id="MatchsView">
      <v-container>
        <v-row>
          <v-col v-for="matchs in Partidas" :key="matchs.id">
            <v-card id="card" class="mx-auto">
              <v-row>
                <v-col class="MatchsViewCol">
                  <v-img :src="matchs?.team1?.logo" class="MatchsViewImg" />
                  <v-card-text>{{ matchs?.team1?.name }}</v-card-text>
                </v-col>
                <v-col class="MatchsViewCol">
                  {{ matchs?.local }}
                  <v-spacer></v-spacer>
                  {{ matchs?.result1 }} : {{ matchs?.result2 }}
                </v-col>
                <v-col class="MatchsViewCol">
                  <v-img :src="matchs?.team2?.logo" class="MatchsViewImg" />
                  <v-card-text>{{ matchs?.team2?.name }}</v-card-text>
                </v-col>
              </v-row>
              {{ matchs?.data }}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import Partida from "../ConfigApi/Partidas";
import Equipe from "../ConfigApi/Equipes";
import axios from "axios";
export default {
  name: "MatchsView",
  data: () => ({
    team1: null,
    team2: null,
    result1: "",
    result2: "",
    local: "",
    data: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
    status: "",
    valid: true,
    items: [],
    Partidas: [],
    dialog: false,
  }),
  methods: {
    async add_matchs() {
      let form = {
        team1: this.team1?.id,
        team2: this.team2?.id,
        result1: this.result1,
        result2: this.result2,
        local: this.local,
        data: this.data,
        status: this.status,
      };
      const valid = await this.$refs.form.validate();
      console.log(valid);
      if (valid == false) {
        return [alert("Campo obrigatório não preenchido")];
      }
      try {
        let AddMatchs = await axios.post(
          "https://api.valorantes.com.br/matchs/add",
          form
        );
        window.alert(AddMatchs?.data?.msg);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    Equipe.listar().then((resposta) => {
      this.items = resposta?.data?.data;
    });
    Partida.listar().then((resposta) => {
      let response = resposta?.data?.data;
      for (let i = 0; i < response.length; i++) {
        response[i].team1 = this.items.find(
          (item) => item.id == response[i].team1
        );
        response[i].team2 = this.items.find(
          (item) => item.id == response[i].team2
        );
        response[i].data = response[i].data
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/");
      }
      this.Partidas = response;
    });
  },
};
</script>
<style>
#card {
  margin-bottom: 30px;
  width: 470px;
  height: 240px;
  text-align: center;
  align-items: center;
}
.MatchsViewCol {
  margin: 30px;
  padding: 0;
  align-items: center;
  text-align: center;
}
.MatchsViewImg {
  width: 100px;
  height: 80px;
  margin: 0;
  padding: 0;
}
#AddMatchs {
  display: flex;
  align-items: center;
  justify-content: center;
}
#cardForm {
  padding: 1rem;
}
</style>
