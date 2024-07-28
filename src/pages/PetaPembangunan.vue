<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets"/>
          <q-breadcrumbs-el label="Pembangunan" icon="extension"/>
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    :table-style="'counter-reset: cssRowCounter ' + ((pagination.page - 1) * pagination.rowsPerPage) + ';'"
                    title="Master Data Customers"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                    :pagination="pagination"
                  >

                  <template v-slot:top>
                    <div class="col-md-4 col-lg-4 col-xs-12">
                      <div class="q-table__title">Master Data Pembangunan</div>
                      <p class="text-caption">Data Pembangunan yang di lakukan di dalam Sistem</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filter" dense />
                      </div>
                    </q-slide-transition>
                    <q-btn
                      dense
                      icon="add"
                      class="q-ml-md q-pr-md"
                      color="blue-13"
                      label="Tambah Pembangunan"
                      :to="{ name: 'add_produk' }"
                      size="md"
                      outline
                    />
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td class="text-center"><span class="rowNumber"></span></q-td>
                    <q-td key="namaPembangunan" :props="props">
                      {{ props.row.namaPembangunan }}
                    </q-td>
                    <q-td key="luas" :props="props">
                      {{ props.row.luas }}
                    </q-td>
                    <q-td key="alamat" :props="props">
                      {{ props.row.alamat }}
                    </q-td>
                    <q-td key="deskripsi" :props="props">
                      {{ props.row.deskripsi }}
                    </q-td>
                    <q-td key="gambar" :props="props">
                      <q-item clickable v-ripple>
                        <q-item-section>
                          <q-avatar rounded size="100px">
                            <q-img :src="`${$imgUrl}/gambar-barang/${props.row.gambar}`" />
                          </q-avatar>
                        </q-item-section>
                      </q-item>
                    </q-td>
                    <q-td key="status" :props="props">
                      {{ props.row.status }}
                    </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn round outline color="red" size="sm" icon="delete" @click="this.delete(props.row._id)" no-caps class="q-ml-sm" />
                        <q-btn round outline color="green" size="sm" icon="edit" :to="{ name:'edit_produk', params:{ id: props.row._id } }"  class="q-ml-sm" no-caps />
                      </q-td>
                    </q-tr>
                  </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PageIndex',
  data () {
    return {
      card: ref(false),
      pagination: {
        rowsPerPage: 10,
      },
      options: [],
      namaCustomer: [],
      fotoDiri: null,
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
          { name: 'no', label: 'No', field: 'no' },
          { name: 'namaPembangunan', required: true, label: 'Nama Pembangunan', align: 'left', field: 'namaPembangunan', sortable: true },
          { name: 'luas', required: true, label: 'luas', align: 'left', field: 'luas', sortable: true },
          { name: 'alamat', required: true, label: 'alamat', align: 'left', field: 'alamat', sortable: true },
          { name: 'deskripsi', required: true, label: 'deskripsi', align: 'left', field: 'deskripsi', sortable: true },
          { name: 'gambar', required: true, label: 'Foto Pembangunan', align: 'left', field: 'gambar', sortable: true },
          { name: 'status', required: true, label: 'Status', align: 'left', field: 'status', sortable: true },
          { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
      ],
      rows: []
    }
  },
  created () {
    this.getCustomer()
  },
  methods: {
    getCustomer () {
      try {
        this.$api.get('pembangunan/get-all-barang')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              // this.$showNotif(res.data.message, 'positive')
              const data = res.data.data
              this.rows = data
              data.reverse()
              console.log(this.rows)
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    tampil (id) {
      this.$refs.dialog.show(
        this.fotoDiri = id
      )
    },
    delete (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.delete('/pembangunan/delete/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.getCustomer()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    }
  }
}
</script>

<style scoped>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter) ". ";
}
.my-card {
  width: 100%;
}
</style>
