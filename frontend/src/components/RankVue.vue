<template>
  <v-app id="inspire">
    <v-system-bar app>
    </v-system-bar>
    <v-navigation-drawer
      v-model="drawer"
      app>
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
         <v-avatar
          class="mb-4"
          color="primary"
          size="64"
        ></v-avatar>

        <div>{{infor}}</div>

        <div>My Score: {{myScore}}</div>

      </v-sheet>
      <v-divider></v-divider>

      <v-list>
         <v-list-item
          v-for="[icon, text] in home"
          :key="icon"
          @click="homeVue">
            <v-icon>{{ icon }}</v-icon>
            <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="[icon, text] in bets"
          :key="icon"
          @click="bets_user"
          >
            <v-icon>{{ icon }}</v-icon>
            <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="[icon, text] in rank"
          :key="icon"
          @click="rank_user">
            <v-icon>{{ icon }}</v-icon>
            <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
        <v-list-item
            v-for="[icon, text] in historyBets"
            :key="icon"
            @click="rank_user">
          <v-icon>{{ icon }}</v-icon>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
       <v-container
        class="py-8 px-6"
        fluid>
         <v-card-title> Bảng xếp hạng
      <v-spacer></v-spacer>
    </v-card-title>
      </v-container>
      <v-simple-table
      class="elevation-20">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            STT
          </th>
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in desserts"
          :key="item.username"
          class="text-center"
          v-bind:class="{first: index < 1, second: index>0, third: index>1 }"
        >
          <td>{{ index+1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.score }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-main>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid>
        <v-row>
        <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>FootBall Bets</v-toolbar-title>
    </v-app-bar>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// export default defineComponent({
//   setup(){
//     const headers = async () => {
//     const response= await axios.get('http://localhost:1600/matches')
//           console.log(response.data)
//     }
//     return [response]
//
//
//   }
// })
import axios from "axios";
export default {
    data: () => ({
      drawer: null,
      bets: [['mdi-controller','Bets']],
      rank: [['mdi-send','Ranking']],
      historyBets: [['mdi-card-text',"History Bets"]],
      pagination: {},
      infor: localStorage.email,
      myScore: localStorage.score,
      desserts:[],
      home: [['mdi-home','Home']],
      class:''
    }),



      methods: {
      getUsers(){
          axios.get('http://localhost:1600/products/get/users').then(response => {
            console.log(response.data)
            this.desserts = response.data
            this.desserts.sort(this.compareScore)
            this.desserts.reverse()
            console.log(this.compareScore)
          }).catch(error => console.log(error))
        },
      compareScore(a,b){
        const scoreA = a.score;
        const scoreB = b.score;
        let comparison = 0;
        if (scoreA > scoreB) {
          comparison = 1;
        } else if (scoreA < scoreB) {
          comparison = -1;
        }
        return comparison
      },
        rank_user(){
        this.$router.push('/ranking')
      },
        homeVue(){
          this.$router.push('/dashboard')
        },
        bets_user(){
          this.$router.push('/bets')
        },
    },
  beforeMount(){
      this.getUsers()
  }
  }

</script>
<style scoped>
    .first{
      background-color: #f7ff00
    }
    .second {
       background-color: #11ff00
    }
    .third {
       background-color: #e9ece9
    }
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td{
  font-weight:bold;
  font-size:20px;
}

</style>
