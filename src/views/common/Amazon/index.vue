<template>
  <div>
    <center>
      <table class="amz">
        <tr>
          <th></th>
          <th class="name">
            Name
          </th>
          <th class="cost">
            AMZ Price
          </th>
          <th class="cheap">
            Discount
          </th>
          <th class="oos">
            In stock
          </th>
          <th class="rank">
            Rank
          </th>
          <th class="track">
            FT
          </th>
          <th class="buybox">
            BB
          </th>
          <th class="reviews">
            Neg. reviews
          </th>
        </tr>
        <tr v-for="item in items">
          <td class="thumb"><img :src="item.UrlImmagine" /></td>
          <td class="item">
            <span>{{ item.NomeItem }} </span>
          </td>
          <td class="price">
            <span>{{ item.Prezzo }} €</span>
          </td>
          <td class="discount">
            <span v-if="item.Sconto != '0'">{{ item.Sconto }} %</span>
            <span v-else>/</span>
          </td>
          <td class="stock">
            <span v-if="item.InStock == 'No'"
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
    <div class="pagination">
      <el-button
        small
        secondary
        @click="prevPage()"
        :disabled="this.amz.NumeroPagina == 1"
        ><i class="fas fa-backward"></i
      ></el-button>
      <ul class="list-page" v-for="(index, item) in items" :key="item.name">
        <li>{{ index }}</li>
      </ul>
      <el-button
        small
        secondary
        @click="nextPage()"
        :disabled="this.amz.NumeroPagina == amzdata.QtaPagine"
        ><i class="fas fa-forward"></i
      ></el-button>
    </div>
    <div class="items-page">
      <el-button @click="amz_request()">Apply filter</el-button>
      <el-input
        placeholder="Items/Page"
        v-model="amz.ItemsPerPagina"
      ></el-input>
    </div>
  </div>
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
        NumeroPagina: 1,
        ItemsPerPagina: "20",
        Categoria: null,
        FiltroAlert: "",
        FiltroInStock: "",
        FiltroFastTrack: "",
        FiltroBuyBox: "",
        FiltroNegativeReviews: ""
      },
      items: [],
      amzdata: {},
      currentSort: "",
      currentSortDir: "",
      currentPage: 1
    };
  },
  methods: {
    amz_request() {
      this.items = [];
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
        const amzdata = JSON.parse(res.data.JsonRisposta);
        const lista = amzdata.ListaItems;
        for (const item of lista) {
          this.items.push(item);
        }
        this.amzdata = amzdata;
        console.log(lista);
        // this.items.splice(-2);
      });
    },
    // // sort: function(s) {
    // //   //if s == current sort, reverse
    // //   if (s === this.currentSort) {
    // //     this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
    //   // },
    //   this.currentSort = s;
    // },
    nextPage: function() {
      if (this.amz.NumeroPagina != this.amzdata.QtaPagine) {
        this.amz.NumeroPagina = this.amz.NumeroPagina + 1;
        console.log(this.amz.NumeroPagina);
      }
      this.amz_request();
    },
    prevPage: function() {
      if (this.amz.NumeroPagina != 1) this.amz.NumeroPagina--;
      console.log(this.amz.NumeroPagina);
      this.amz_request();
    }
  },
  computed: {
    // pageSize() {
    //   return parseInt(this.amz.ItemsPerPagina);
    // }
    //   sortedItems: function() {
    //     return this.items
    //       .sort((a, b) => {
    //         let modifier = 1;
    //         if (this.currentSortDir === "desc") modifier = -1;
    //         if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    //         if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
    //         return 0;
    //       })
    //       .filter((row, index) => {
    //         let start = (this.currentPage - 1) * this.amz.ItemsPerPagina;
    //         let end = this.currentPage * this.amz.ItemsPerPagina;
    //         if (index >= start && index < end) return true;
    //       });
    //   }
  }
};
</script>
<style lang="scss">
.pagination {
  display: inline-block;
  margin-top: 20px;
  & .el-input-number {
    margin-left: 10px;
  }
  & .el-button {
    margin-left: 10px;
  }
  & .el-button:first-child {
    margin-left: 0;
  }
}

.items-page {
  float: right;
  margin-top: 20px;
}

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

.pagination {
  display: inline-block;
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
