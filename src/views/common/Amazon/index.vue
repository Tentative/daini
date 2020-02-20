<template>
  <center>
    <table class="amz">
      <tr>
        <th></th>
        <th class="name">
          Name<a @click="sort('NomeItem')"> <i class="fas fa-sort"></i></a>
        </th>
        <th class="cost">
          AMZ Price<a @click="sort('PrezzoAMZ')">
            <i class="fas fa-sort"></i
          ></a>
        </th>
        <th class="cheap">
          Discount<a @click="sort('Sconto')"> <i class="fas fa-sort"></i></a>
        </th>
        <th class="oos">
          In stock<a @click="sort('InStockAMZ')"><i class="fas fa-sort"></i></a>
        </th>
        <th class="rank">
          Rank <a @click="sort('SalesRank')"><i class="fas fa-sort"></i></a>
        </th>
        <th class="track">
          FT<a @click="sort('FastTrack')"><i class="fas fa-sort"></i></a>
        </th>
        <th class="buybox">
          BB <a @click="sort('IsBuyBox')"> <i class="fas fa-sort"></i></a>
        </th>
        <th class="reviews">
          Neg. reviews<a @click="sort('NegativeReviewsPercentuale')"
            ><i class="fas fa-sort"></i
          ></a>
        </th>
      </tr>
      <tr v-for="item in sortedItems">
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
          <span v-if="item.FastTrack == 'Si'"
            ><i class="fas fa-check"></i
          ></span>
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
  </center>
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
      items: [],
      currentSort: "NomeItem",
      currentSortDir: "asc"
    };
  },
  methods: {
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
    },
    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    }
  },
  computed: {
    sortedItems: function() {
      return this.items.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
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
  color: #000;
}

tr:hover {
  transition: all 0.5s;
  // opacity: 0.3;
  background-color: rgba(50, 115, 220, 0.3);
  & td:first-child {
    transition: none;
    background-color: white;
  }
}

td.item {
  text-align: left;
}

.amz {
  border-radius: 5px;
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
  & tr:first-child {
    background-color: #2e86ab;
    border-radius: 5px;
    & th {
      margin-bottom: 20px;
    }
  }
}

.name svg,
.cost svg,
.cheap svg,
.oos svg,
.rank svg,
.track svg,
.buybox svg,
.reviews svg {
  padding-left: 10px;
}

.thumb img {
  height: 54px;
  vertical-align: middle;
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
