<template>
  <table class="amz">
    <tr>
      <th></th>
      <th>Name</th>
      <th>AMZ Price</th>
      <th>Discount</th>
      <th>In stock</th>
      <th>Rank</th>
      <th>FT</th>
      <th>BB</th>
      <th>Neg. reviews</th>
    </tr>
    <tr v-for="item in items">
      <td class="thumb"><img :src="item.UrlImmagine" /></td>
      <td class="item">
        <span>{{ item.NomeItem }} </span>
      </td>
      <td class="price">
        <span>{{ item.PrezzoAMZ }} €</span>
      </td>
      <td class="discount">
        <span v-if="item.Sconto != '0'">{{ item.Sconto }} %</span>
        <span v-else>/</span>
      </td>
      <td class="stock">
        <span v-if="item.InStockAMZ == 'No'"
          ><i class="fas fa-times-circle"></i
        ></span>
      </td>
      <td class="rank">
        <span>{{ item.SalesRank }}</span>
      </td>
      <td class="track">
        <span v-if="item.FastTrack == 'Oggi'">Oggi</span>
        <span v-if="item.FastTrack == 'Giorno_1'">1 Giorno</span>
        <span v-if="item.FastTrack == 'Si'"><i class="fas fa-check"></i></span>
        <span v-if="item.FastTrack == 'No'"
          ><i class="fas fa-times-circle"></i
        ></span>
      </td>
      <td class="buybox">
        <span v-if="item.IsBuyBox"><i class="fas fa-check"></i></span>
        <span v-else><i class="fas fa-times-circle"></i></span>
      </td>
      <td class="reviews">
        <span>{{ item.NegativeReviewsPercentuale }} %</span>
      </td>
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
          console.log(image[ListaItem].InStock);
        }
        this.items.splice(-2);
        console.log(image);
      });
    }
  }
};
</script>
<style lang="scss">
th,
td {
  text-align: center;
  padding: 0 20px 0 0;
}

td.item {
  text-align: left;
}

.amz {
  border: 1px solid red;
}

.thumb img {
  width: 60px;
  height: 60px;
}
.item {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.fas,
.fa-times-circle {
  color: red;
}

.fas,
.fa-check {
  color: green;
}
</style>
