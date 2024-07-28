<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets"/>
          <q-breadcrumbs-el label="Pengaduan" icon="info"/>
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
                      <div class="q-table__title">Master Data Pengaduan</div>
                      <p class="text-caption">Data Pengaduan yang di lakukan di dalam Sistem</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filter" dense />
                      </div>
                    </q-slide-transition>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td class="text-center"><span class="rowNumber"></span></q-td>
                    <q-td key="nik" :props="props">
                      {{ props.row.nik }}
                    </q-td>
                    <q-td key="judul_pengaduan" :props="props">
                      {{ props.row.judul_pengaduan }}
                    </q-td>
                    <q-td key="deskripsi" :props="props" class="wrap-text">
                      {{ props.row.deskripsi }}
                    </q-td>
                    <q-td key="alamat" :props="props">
                      {{ props.row.alamat }}
                    </q-td>
                    <q-td key="no_hp" :props="props">
                      {{ props.row.no_hp }}
                    </q-td>
                    <q-td key="nama" :props="props">
                      {{ props.row.nama }}
                    </q-td>
                    <q-td key="tgl" :props="props">
                      {{ props.row.tgl }}
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
                      <div v-if="props.row.status == 'Selesai'" style="color: green;">
                        {{ props.row.status }}
                      </div>
                      <div v-if="props.row.status == 'Dalam Proses'" style="color: red;">
                        {{ props.row.status }}
                      </div>
                      <div v-if="props.row.status == 'Sedang DiTangani'" style="color: orange;">
                        {{ props.row.status }}
                      </div>
                    </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn label="Aksi" color="green" size="sm" :to="{ name:'edit_pengaduan', params:{ id: props.row._id } }"  class="q-ml-sm" no-caps />
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
          { name: 'nik', required: true, label: 'NIK', align: 'left', field: 'nik', sortable: true },
          { name: 'judul_pengaduan', required: true, label: 'Judul Pengaduan', align: 'left', field: 'judul_pengaduan', sortable: true },
          { name: 'deskripsi', required: true, label: 'deskripsi', align: 'left', field: 'deskripsi', sortable: true },
          { name: 'alamat', required: true, label: 'alamat', align: 'left', field: 'alamat', sortable: true },
          { name: 'no_hp', required: true, label: 'no_hp', align: 'left', field: 'no_hp', sortable: true },
          { name: 'nama', required: true, label: 'nama', align: 'left', field: 'nama', sortable: true },
          { name: 'tgl', required: true, label: 'Tanggal Pengaduan', align: 'left', field: 'tgl', sortable: true },
          { name: 'gambar', required: true, label: 'Foto Pengaduan', align: 'left', field: 'gambar', sortable: true },
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
        this.$api.get('pengaduan/get-all-barang')
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
          this.$api.delete('/barang/delete/' + id).then(res => {
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
