<template>
  <table class="amz">
    <tr>
      <th>#</th>
    </tr>
    <tr v-for="item in items">
      <td class="thumb"><img :src="item.UrlImmagine" /></td>
      <td class="item">{{ item.NomeItem }}</td>
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
      urls: [],
      items: []
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

          this.items.push(image[ListaItem]);
          this.urls.push(image[ListaItem].UrlImmagine);
        }
        this.items.splice(-2);
        console.log(image);
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
  width: 60px;
  height: 60px;
}
</style>
