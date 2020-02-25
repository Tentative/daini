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
          <th class="filter">
            <el-button type="text" @click="dialogVisible = true"
              ><i class="fas fa-cog"></i
            ></el-button>
            <el-dialog
              title="Select filters"
              :visible.sync="dialogVisible"
              width="30%"
            >
              <span>Filter by price alert</span>
              <el-checkbox v-model="amz.FiltroAlert"></el-checkbox>
              <span>Filter by stock alert</span>
              <el-checkbox v-model="amz.FiltroInStock"></el-checkbox>
              <span>Filter by fast track</span>
              <el-checkbox v-model="amz.FiltroFastTrack"></el-checkbox>
              <span>Filter by buy box</span>
              <el-checkbox v-model="amz.FiltroBuyBox"></el-checkbox>
              <span>Filter by negative reviews</span>
              <el-checkbox v-model="amz.FiltroNegativeReviews"></el-checkbox>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button
                  type="primary"
                  @click="
                    dialogVisible = false;
                    amz_request();
                  "
                  >Apply Filters</el-button
                >
              </span>
            </el-dialog>
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
          <td class="select_filter"></td>
        </tr>
      </table>
    </center>
    
    

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :pager-count="5"
          :page-count="parseInt(amzdata.QtaPagine)"
          :current-page.sync="amz.NumeroPagina"
          :total="totalPages"
          @prev-click="prevPage()"
          @next-click="nextPage()"
          @current-change="amz_request()"

        >
        </el-pagination>
      </div>
      <div class="jumper">
        <label for="items">Items per page</label>

        <select id="items" v-model="amz.ItemsPerPagina" @change="amz_request()">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
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
        FiltroAlert: null,
        FiltroInStock: null,
        FiltroFastTrack: null,
        FiltroBuyBox: null,
        FiltroNegativeReviews: null
      },
      items: [],
      amzdata: {},
      currentSort: "",
      currentSortDir: "",
      currentPage: 1,
      dialogVisible: false
    };
  },
  methods: {
    option_change() {
      this.amz.ItemsPerPagina = value;
    },
    amz_request() {
      this.items = [];
      this.amzdata = {};

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
       
    },
    prevPage: function() {
      if (this.amz.NumeroPagina != 1) this.amz.NumeroPagina--;
      console.log(this.amz.NumeroPagina);


    },
    truncateMe() {
      const lunghezza = this.items.length;
    }
  },
  computed: {
    totalPages() {
      return this.amz.QtaPagine;
    },
    pageSize() {
      return parseInt(this.amz.ItemsPerPagina);
    }
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
.fa-filter {
  color: red;
}
.jumper {
  margin: 0 10px;
  display: inline-block;
  & select {
    margin: 0 5px;
  }
  vertical-align: sub;
  text-align: center;
}

.pagination {
  display: inline-block;
  margin-top: 20px;
  text-align: center;
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

li.active {
  background-color: #ffcf40 !important;
  // padding: 5px 10px;
  color: #303133 !important;
  border-radius: 3px;
}

.items-page {
  float: right;
  margin-top: 20px;
}
.list-page a {
  cursor: pointer;
}
th,
td {
  text-align: center;
  padding: 0 20px 0 0;
  color: #102a43;
  border: 1px groove #102a43;
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

.list-page {
  text-overflow: ellipsis;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  // overflow: hidden;
  display: inline-block;
  margin: 0 5px;
  padding: 0 5px;
}

.list-page li {
  list-style-type: none;
  color: #bee9e8;
}

.truncate {
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

td.item {
  text-align: left;
  padding-left: 5px;
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
.reviews svg,
.filter svg {
  padding-left: 10px;
}

.thumb img {
  height: 54px;
  width: 54px;
  vertical-align: middle;
  float: right;
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

.fas,
.fa-cog {
  color: #ffcf40;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  // background-color: transparent;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li:not(:active) {
  background-color: #f4f4f5;
}

.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.disabled {
  background-color: #f4f4f5;
}

// .el-pagination .btn-next .el-icon,
// .el-pagination .btn-prev .el-icon {
//   color: #ffcf40;
// }
</style>
