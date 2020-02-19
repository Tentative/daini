<template>
  <table class="amz">
    <tr>
      <th>#</th>
    </tr>
    <tr v-for="url in urls">
      <td class="thumb"><img :src="url" /></td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
export default {
  name: "amazon",
  created() {
    this.amz_request();
  },

  data() {
    return {
      amz: {
        NumeroPagina: "1",
        ItemsPerPagina: "20",
        Categoria: null,
        FiltroAlert: "",
        FiltroInStock: "",
        FiltroFastTrack: "",
        FiltroBuyBox: "",
        FiltroNegativeReviews: ""
      },
      urls: []
    };
  },
  methods: {
    Tableamz(UrlImmagine) {
      this.url = UrlImmagine;
    },
    amz_request() {
      let Richiesta = {
        CodiceRichiesta: "AMZ",
        CodiceClient: "reevolacerba2020",
        JsonRichiesta: JSON.stringify(this.amz)
      };
      axios({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        params: JSON.stringify(Richiesta)
      }).then(res => {
        const ListaItems = JSON.parse(res.data.JsonRisposta);
        const image = ListaItems.ListaItems;
        for (const ListaItem in image) {
          console.log(image[ListaItem].UrlImmagine);
          this.urls.push(image[ListaItem].UrlImmagine);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.amz {
  border: 1px solid red;
}

.thumb img {
  width: 80px;
  height: 80px;
}
</style>
